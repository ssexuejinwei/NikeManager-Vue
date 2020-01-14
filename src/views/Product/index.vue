<template>
  <div>
    <header>
      <h1>商品管理</h1>
    </header>
    <div>
      <el-radio-group v-model="type">
        <el-radio-button v-for="(value, key) in C_TYPES_TO_STR" :key="key" :label="key">{{value}}</el-radio-button>
      </el-radio-group>
    </div>
    <el-table :data="products" @selection-change="handleSelect">
      <el-table-column type="selection" width="55" />
      <el-table-column label="商品名称" width="300">
        <template slot-scope="scope">
          <div class="product">
            <img class="cover" :src="IMAGE_PREFIX + scope.row.coverimage">
            <div class="info">
              <div>ID: {{scope.row.id}}</div>
              <div>所需积分: {{scope.row.current_price}}</div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="库存/销量">
        <template slot-scope="scope">
          <span>{{ scope.row.store }} / {{ scope.row.sales }}</span>
        </template></el-table-column>
      <el-table-column label="创建时间" prop="create_time" width="160"></el-table-column>
      <el-table-column v-if="type === '2' || type === '3' || type === '4'" label="发布时间" prop="putaway_time" width="160"></el-table-column>
      <el-table-column v-if="type === '0'" label="商品状态">
        <template slot-scope="scope">
          <ProductStateTag :product="scope.row" />
        </template>
      </el-table-column>
      <el-table-column v-else label="操作"></el-table-column>
    </el-table>
    <div class="table-bottom">
      <div class="action">
        <el-button v-if="type === '0'" type="primary">新增商品</el-button>
        <el-button v-if="type === '1' || type === '2' || type === '4'" type="primary">批量下架</el-button>
        <el-button v-if="type === '3'" type="primary">批量上架</el-button>
        <el-button>批量删除</el-button>
      </div>
      <el-pagination
        :page-count="total_page"
        :current-page.sync="page"
        layout="prev, pager, next"
      />
    </div>
  </div>
</template>

<script>
import Axios from 'axios'

import ProductStateTag from './components/product-state-tag'

const C_TYPES_TO_STR = {
  '0': '全部商品',
  '1': '出售中商品',
  '2': '预售商品',
  '3': '未上架商品',
  '4': '已售罄商品'
}

const C_STATE_TO_STR = {
  '0': '出售中',
  '1': '预售中',
  '2': '未上架',
  '3': '已售罄'
}

export default {
  components: { ProductStateTag },
  data() {
    return {
      total_page: 1,
      products: [],
      selectedProducts: [],
      type: '0',
      page: 1,

      IMAGE_PREFIX: process.env.VUE_APP_UPLOAD_PUBLIC_URL,
      C_TYPES_TO_STR,
      C_STATE_TO_STR,
    }
  },

  created() {
    this.fetchProduct()
  },

  watch: {
    type() {
      this.fetchProduct()
    },

    page() {
      this.fetchProduct()
    }
  },

  methods: {
    fetchProduct() {
      Axios.get('/sellerctr/getGoods', {
        params: {
          cur_page: this.page,
          type: this.type
        }
      }).then(response => {
        console.debug(response.data)
        this.products = response.data.data.data
        this.total_page = response.data.data.total_pages
      })
    },

    handleSelect(val) {
      this.selectedProducts = val
    }
  }
}
</script>

<style lang="scss" scoped>
@import './common';

.table-bottom {
  margin-top: 24px;
  display: flex;
  justify-content: space-between;
}

.product {
  display: flex;
  align-items: flex-start;
  align-content: flex-start;

  .cover {
    width: 100px;
    height: 100px;
    object-fit: cover;

    margin-right: 16px;
  }

  .info {
    width: 150px;
  }
}


</style>