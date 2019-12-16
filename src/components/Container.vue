<template>
  <el-container>
    <el-header>Team学员信息</el-header>
    <el-container>
      <!-- 左上边部分 -->
      <el-aside width="200spx">
          <el-row class="tac">

              <el-menu>
                <el-submenu index="1">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>3-4岁</span>
                  </template>
                </el-submenu>
                <el-menu-item index="2">
                  <i class="el-icon-menu"></i>
                  <span slot="title">4-5岁</span>
                </el-menu-item>
                <el-menu-item index="3">
                  <i class="el-icon-document"></i>
                  <span slot="title">5-6岁</span>
                </el-menu-item>
              </el-menu>

          </el-row>
      </el-aside>
      <!-- 左下边部分 -->
      <!-- <el-aside width="200spx" style="top: 200%;">
          <el-row class="tac">
            <el-col :span="19">
              <el-menu>
                <el-submenu index="1">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>3-4岁</span>
                  </template>
                </el-submenu>
                <el-menu-item index="2">
                  <i class="el-icon-menu"></i>
                  <span slot="title">4-5岁</span>
                </el-menu-item>
                <el-menu-item index="3">
                  <i class="el-icon-document"></i>
                  <span slot="title">5-6岁</span>
                </el-menu-item>
              </el-menu>
            </el-col>
          </el-row>
      </el-aside> -->

      <el-main>
          右边
      </el-main>
    </el-container>
  </el-container>

</el-row>
</template>
<script>
  export default {
    name:'Container',
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
