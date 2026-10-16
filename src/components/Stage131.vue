<template>
  <h1 style="text-align: center;">跳转（JMP）指令</h1>
  
  <div style="display: block; margin: auto; width: 80%;" class="stage">
    <br>
    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;正常执行的情况下，指令按照它们出现的顺序一条一条地执行。跳转(jmp)指令会导致执行切换到程序中一个全新的位置。</p>
    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在汇编代码中，这些跳转的目的地通常用一个标号(label)指明。</p>
    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;考虑下面的汇编代码序列：</p>
    <pre>
      <code>
        movq $0, %rax
        jmp .L1
        movq (%rax), %rdx
        .L1:
          popq %rdx
      </code>
    </pre>
    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;指令<code>jmp .L1</code>会导致程序跳过<code>movq</code>指令，而从popq指令开始继续执行。在产生目标代码文件时，汇编器会确定所有带标号指令的地址，并将跳转目标(目的指令的地址)编码为跳转指令的一部分。</p>
    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<code>jmp</code>指令是无条件跳转。它可以是直接跳转，即跳转目标是作为指令的一部分编码的；也可以是间接跳转，即跳转目标是从寄存器或内存位置中读出的。汇编语言中，直接跳转是给出一个标号作为跳转目标的，例如上面的例子中标号<code>.L1</code>。</p>
    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;间接跳转的写法是<code>*</code>后面跟一个操作数指示符。举个例子：</p>
    <ul>
      <li>指令<code>jmp *%rax</code>用寄存器<code>%rax</code>中的值作为跳转目标。</li>
      <li>指令<code>jmp *(%rax)</code>以<code>%rax</code>中的值作为读地址，从内存中读出跳转目标。</li>
    </ul>
    <br>  
  </div>
  <br>
  <el-table :data="tableData" style="width: 80%; display:block; margin: auto;" height="500" >
    <el-table-column prop="instruct" label="指令" width="150" />
    <el-table-column prop="alias" label="同义名" width="150" />
    <el-table-column prop="condition" label="跳转条件" width="150" />
    <el-table-column prop="discribe" label="描述" width="600" />
  </el-table>
  <h1>C++ to Assembly Compiler</h1>
  <textarea v-model="cppCode" placeholder="Enter your C++ code here..."></textarea>
  <button @click="compile">Compile</button>
  <textarea v-model="asmCode" placeholder="The assembly code will appear here..." readonly></textarea>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      content: '',
      tableData: [
        {instruct: 'jmp Label', alias: '', condition: '1', discribe: '直接跳转'},
        {instruct: 'jmp *Operand', alias: '', condition: '1', discribe: '间接跳转'},
        {instruct: 'je Label', alias: 'jz', condition: 'ZF', discribe: '相等/零'},
        {instruct: 'jne Label', alias: 'jnz', condition: '~ZF', discribe: '不相等/非零'},
        {instruct: 'js Label', alias: '', condition: 'SF', discribe: '负数'},
        {instruct: 'jns Label', alias: '', condition: '~SF', discribe: '非负数'},
        {instruct: 'jg Label', alias: 'jnle', condition: '~(SF ^ OF) & ~ZF', discribe: '大于(有符号>)'},
        {instruct: 'jge Label', alias: 'jnl', condition: '~(SF ^ OF)', discribe: '大于或等于(有符号>=)'},
        {instruct: 'jl Label', alias: 'jnge', condition: 'SF ^ OF', discribe: '小于(有符号<)'},
        {instruct: 'jle Label', alias: 'jng', condition: '(SF ^ OF) | ZF', discribe: '小于或等于(有符号<=)'},
        {instruct: 'ja Label', alias: 'jnbe', condition: '~CF & ~ZF', discribe: '超过(无符号>)'},
        {instruct: 'jae Label', alias: 'jnb', condition: '~CF', discribe: '超过或相等(无符号>=)'},
        {instruct: 'jb Label', alias: 'jnae', condition: 'CF', discribe: '低于(无符号<)'},
        {instruct: 'jbe Label', alias: 'jna', condition: 'CF | ZF', discribe: '低于或相等(无符号<=)'}
      ],
      cppCode: '',
      asmCode: ''
    };
  },
  methods: {
    async compile() {
      try {
        const response = await axios.post('/compile', { code: this.cppCode });
        this.asmCode = response.data;
      } catch (error) {
        this.asmCode = error.response?.data?.error || '编译服务不可用，请确认本地服务已启动。';
      }
    }
  }
};
</script>

<style>
textarea {
  width: 100%;
  height: 200px;
}
.stage {
  box-shadow: var(--el-box-shadow-dark);
  display: block;
  justify-content: center;
  align-items: center;
  margin: auto;
  width: 80%;
  height: auto;
  background-color: #ffffff;
  margin-top: 20px;
}
</style>
