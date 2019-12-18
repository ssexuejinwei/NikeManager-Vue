<template>
  <div>
<button type="text" @click="popupclick" class="elspanbutton">查看相似</button>

<el-dialog title="相似媒体" :visible.sync="dialogTableVisible">

<el-table :data="tabData"

      height="360"

      border

      style="width: 100%;">

      <el-table-column

        prop="name"

        label="媒体名称"

        width="100">

      </el-table-column>

      <el-table-column

        prop="costPrice"

        label="服务费"

        width="80"

        >

      </el-table-column>

      <el-table-column

        prop="costPrice"

        label="上传人"

        width="80"

        >

      </el-table-column>



      <el-table-column

        prop="costPrice"

        label="上传时间"

        width="120"

        >

      </el-table-column>



      <el-table-column

        prop="costPrice"

        label="QQ"

        width="80"

        >

      </el-table-column>



      <el-table-column

        prop="recordLink"

        label="案例链接"

        width="80"

        >



      </el-table-column>

      <el-table-column

        prop="remarks"

        label="备注"

        width="260"

        >

      </el-table-column>

      <el-table-column

        prop="id"

        label="操作"

        width="80"

        >

      

      </el-table-column>

    </el-table>

    </el-table>

    <br><br>

    <span ><button class="fanhui" @click="fanhuiclick">返回</button></span>

  </el-dialog>
</div>
</template>
