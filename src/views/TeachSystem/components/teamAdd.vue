<template>
  <div class="courseAdd">
    <header style="background-color: #FFFFFF;">
      <h1>添加队伍</h1>
    </header>
    <el-container>
      <el-aside />
      <el-container>
        <!-- 基本信息 -->
        <el-main class="basicInfo">
          <el-form :model="teamForm">
            <el-row>
              <el-col :span="14">
                <el-form-item prop="age">
                  <el-radio-group v-model="teamForm.age">
                    <el-radio-button label="3-4岁" />
                    <el-radio-button label="4-5岁" />
                    <el-radio-button label="5-6岁" />
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col
                :span="8"
                :offset="2"
              >
                <el-form-item prop="type">
                  <el-radio-group v-model="teamForm.type">
                    <el-radio-button label="篮球" />
                    <el-radio-button label="足球" />
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item
                  label="课程名称"
                  prop="name"
                >
                  <el-col :span="10">
                    <el-input v-model="teamForm.name" />
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="学员人数设置(人):"
                  prop="person"
                >
                  <el-col :span="10">
                    <el-input v-model="teamForm.person" />
                  </el-col>
                </el-form-item>
              </el-col>
              <br><br><br><br>
              <el-form-item
                size="large"
                style="text-align: center;"
              >
                <el-button @click="handleRest(0)">
                  重置
                </el-button>
              </el-form-item>
            </el-row>
          </el-form>
        </el-main>
      </el-container>
      <el-footer>
        <el-col style="text-align: center;margin-top: 1.25rem;">
          <el-button
            type="danger"
            @click="save"
          >
            提交
          </el-button>
          <el-button @click="cancel">
            取消
          </el-button>
        </el-col>
      </el-footer>
    </el-container>
  </div>
</template>
<script>
// import qs from 'qs'
export default {
  data () {
    return {
      teamForm: {
        age: '3-4岁',
        type: '篮球',
        person: '',
        name: ''
      }
    }
  },
  methods: {
    handleRest () {
      this.teamForm = {
        age: '3-4岁',
        type: '篮球',
        person: '',
        name: ''
      }
    },
    save () {
    },
    cancel () {
      this.$router.go(-1)// 返回上一层
    }
  }
}
</script>
<style lang="scss">
</style>
