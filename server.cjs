const express = require('express')
const { execFile } = require('node:child_process')
const { promisify } = require('node:util')
const { mkdtemp, readFile, rm, writeFile } = require('node:fs/promises')
const { tmpdir } = require('node:os')
const path = require('node:path')

const app = express()
const runCompiler = promisify(execFile)
const port = Number(process.env.PORT) || 3001

app.use(express.json({ limit: '64kb' }))

app.post('/compile', async (req, res) => {
  const code = req.body?.code
  if (typeof code !== 'string' || !code.trim()) {
    return res.status(400).json({ error: '请输入 C++ 代码。' })
  }

  let workDir
  try {
    workDir = await mkdtemp(path.join(tmpdir(), 'computer-principles-'))
    await writeFile(path.join(workDir, 'main.cpp'), code, 'utf8')
    await runCompiler('g++', ['-S', '-o', 'main.s', 'main.cpp'], {
      cwd: workDir,
      timeout: 10000,
      maxBuffer: 1024 * 1024,
      windowsHide: true
    })
    const assembly = await readFile(path.join(workDir, 'main.s'), 'utf8')
    res.type('text/plain').send(assembly)
  } catch (error) {
    const message = error.code === 'ENOENT'
      ? '未找到 g++，请先安装 GCC 并将其加入 PATH。'
      : (error.stderr || error.message || '编译失败。').slice(0, 4000)
    res.status(422).json({ error: message })
  } finally {
    if (workDir) {
      await rm(workDir, { recursive: true, force: true })
    }
  }
})

app.use(express.static(path.join(__dirname, 'dist')))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.listen(port, '127.0.0.1', () => {
  console.log(`Local server: http://127.0.0.1:${port}`)
})
