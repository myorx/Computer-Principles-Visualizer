<template>
  <el-container class="layout-container-demo" style="height: 796px">
    <el-aside width="350px">
      <el-scrollbar>
        <el-menu>
          <el-sub-menu index="1">
            <template #title>
              <el-icon><IconMenu /></el-icon>逻辑的计算机模型
            </template>
            <el-sub-menu index="1-1"> 
              <template #title>二进制原理展示</template>
              <el-menu-item index="1-1-1">
                <router-link to="/1-1-1" style="text-decoration: none;">
                  整数（补码）、浮点数的原理
                </router-link>
              </el-menu-item>
              <el-menu-item index="1-1-2">
                <router-link to="/1-1-2" style="text-decoration: none;">
                  指令集设计原理
                </router-link>
              </el-menu-item>  
            </el-sub-menu>
            <el-sub-menu index="1-2"> 
              <template #title>计算机模型展示</template>
              <el-menu-item index="1-2-2">
                <router-link to="/1-2-2" style="text-decoration: none;">
                  x86计算机开机过程模型
                </router-link>
              </el-menu-item>  
              <el-menu-item index="1-2-3">
                <router-link to="/1-2-3" style="text-decoration: none;">
                  计算机内存编址和分段与分页
                </router-link>
              </el-menu-item>
              <el-menu-item index="1-2-4">
                <router-link to="/1-2-4" style="text-decoration: none;">
                  处理器计算和I/O过程
                </router-link>
              </el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="1-3"> 
              <template #title>代码执行流程展示</template>
              <el-menu-item index="1-3-1">
                <router-link to="/1-3-1" style="text-decoration: none;">
                  基于“JMP”的代码执行流程
                </router-link>
              </el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="1-4">
              <template #title>从高级语言到二进制代码的编译过程展示</template>
              <el-menu-item index="1-4-1">
                <router-link to="/1-4-1" style="text-decoration: none;">
                  高级语言->RISC-V指令集
                </router-link>
              </el-menu-item>
              <el-menu-item index="1-4-2">
                <router-link to="/1-4-2" style="text-decoration: none;">
                  RISC-V指令集->二进制
                </router-link>
              </el-menu-item>
              <el-menu-item index="1-4-3">
                <router-link to="/1-4-3" style="text-decoration: none;">
                  运行时环境（JRE）
                </router-link>
              </el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="1-5"> 
              <template #title>Java ByteCode</template>
              <el-menu-item index="1-5-1">
                <router-link to="/1-5-1" style="text-decoration: none;">
                  Java ByteCode
                </router-link>
              </el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
          
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container>
      <el-header>
        <router-link to="/" style="text-decoration: none;">
          <div class="title"> 
            <img  src="./assets/logo.png" style= "height : 50px; width : 50px;"/>
            <h1 style="font-size: 20px;">计算机原理可视化</h1>
          </div>  
        </router-link>
      </el-header>

      <el-main>
        <router-view> </router-view>
      </el-main>
      <el-footer>
        <p style="text-align: center;">交互式计算机原理学习</p>
      </el-footer>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
  import { Menu as IconMenu} from '@element-plus/icons-vue'
  
</script>

<style scoped>
.layout-container-demo .el-header {
  position: relative;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
}
.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
}
.layout-container-demo .el-menu {
  border-right: none;
}
.layout-container-demo .el-main {
  padding: 0;
}
.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
.title {
    color : red;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
