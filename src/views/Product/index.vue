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
    <el-table v-loading="loading" :data="products" @selection-change="handleSelect">
      <el-table-column type="selection" width="55" />
      <el-table-column type="expand">
        <template slot-scope="scope">
          <div>
            <el-table :data="scope.row.sku">
              <el-table-column label="尺码" prop="size" width="80"></el-table-column>
              <el-table-column label="库存" prop="num" width="80"></el-table-column>
            </el-table>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="商品名称" min-width="300">
        <template slot-scope="scope">
          <div class="product">
            <img class="cover" :src="IMAGE_PREFIX + scope.row.coverimage" decoding="async" importance="low">
            <div class="info">
              <div>ID: {{scope.row.id}}</div>
              <div>{{scope.row.category}} - {{scope.row.name}}</div>
              <div>所需积分: {{scope.row.current_price}}</div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="库存/销量" width="120">
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
      <el-table-column v-else label="操作" width="100">
        <template slot-scope="scope">
          <span class="table-actions">
            <el-button v-if="type === '4'" size="small" disabled>增加库存</el-button>
            <el-button v-if="type === '1' || type === '2' || type === '4'" size="small" @click="downGood(scope.row)">下架商品</el-button>
            <el-button v-if="type === '3'" size="small" disabled>编辑商品</el-button>
            <el-button v-if="type === '3'" size="small" @click="upGood(scope.row)">上架商品</el-button>
            <el-button size="small" @click="delGood(scope.row)">删除商品</el-button>
          </span>
        </template>
      </el-table-column>
    </el-table>
    <div class="table-bottom">
      <div class="action">
        <el-button v-if="type === '0'" type="primary"><router-link to="/product/add">新增商品</router-link></el-button>
        <el-button v-if="type === '1' || type === '2' || type === '4'" type="primary" :disabled="!selectedProducts.length" @click="downGoods">批量下架</el-button>
        <el-button v-if="type === '3'" type="primary" :disabled="!selectedProducts.length" @click="upGoods">批量上架</el-button>
        <el-button :disabled="!selectedProducts.length" @click="delGoods">批量删除</el-button>
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
import qs from 'querystring'
import _ from 'lodash'

import ProductStateTag from './components/product-state-tag'

const C_TYPES_TO_STR = {
  '0': '全部商品',
  '1': '出售中商品',
  '2': '预售商品',
  '3': '未上架商品',
  '4': '已售罄商品'
}

export default {
  components: { ProductStateTag },
  data() {
    return {
      total_page: 1,
      products: [],
      selectedProducts: [],
      type: this.$route.query.type || '0',
      page: this.$route.query.page || 1,
      loading: false,

      IMAGE_PREFIX: process.env.VUE_APP_UPLOAD_PUBLIC_URL,
      C_TYPES_TO_STR,
    }
  },

  created() {
    this.debouncedFetchProduct = _.debounce(this.fetchProduct, 100)
    this.debouncedFetchProduct()
  },

  watch: {
    type(v) {
      this.$router.replace({
        query: {
          ...this.$route.query,
          type: v
        }
      })
      this.page = 1
      this.debouncedFetchProduct()
    },

    page(v) {
      this.$router.replace({
        query: {
          ...this.$route.query,
          page: v
        }
      })
      this.debouncedFetchProduct()
    }
  },

  methods: {
    fetchProduct() {
      this.loading = true
      Axios.get('/sellerctr/getGoods', {
        params: {
          cur_page: this.page,
          type: this.type
        }
      }).then(response => {
        console.debug(response.data)
        this.products = response.data.data.data
        this.total_page = response.data.data.total_pages
        this.selectedProducts = []
      }).finally(() => this.loading = false)
    },

    // 下架商品
    takeOffProduct(good) {
      return Axios.post('/sellerctr/updateGoods', qs.stringify({
        id: good.id,
        name: good.name,
        original_price: good.original_price,
        current_price: good.current_price,
        desc: good.desc,
        state: '1',
        type: good.type,
      }))
    },

    // 上架商品
    takeOnProduct(good) {
      return Axios.post('/sellerctr/updateGoods', qs.stringify({
        id: good.id,
        name: good.name,
        original_price: good.original_price,
        current_price: good.current_price,
        desc: good.desc,
        state: '0',
        type: good.type,
      }))
    },

    // 删除商品
    deleteProduct(good) {
      return Axios.post('/sellerctr/deleteGoods', qs.stringify({ id: good.id }))
    },

    handleSelect(val) {
      this.selectedProducts = val
    },

    downGood(good) {
      this.$confirm('是否确定下架该商品', '提示', { type: 'warning' }).then(() => {
        this.takeOffProduct(good)
          .then(() => this.$alert('下架成功', '成功', { type: 'success' }), (e) => {
            console.error(e)
            this.$alert('下架失败', '错误', { type: 'error' })
          })
          .then(this.debouncedFetchProduct)
      })
    },

    downGoods() {
      this.$confirm('是否确定下架选中的商品', '提示', { type: 'warning' }).then(() => {
        Promise.all(this.selectedProducts.map(this.takeOffProduct))
          .then(() => this.$alert('下架成功', '成功', { type: 'success' }), (e) => {
            console.error(e)
            this.$alert('下架失败', '错误', { type: 'error' })
          })
          .then(this.debouncedFetchProduct)
      })
    },

    upGood(good) {
      this.$confirm('是否确定上架该商品', '提示', { type: 'warning' }).then(() => {
        this.takeOnProduct(good)
          .then(() => this.$alert('上架成功', '成功', { type: 'success' }), (e) => {
            console.error(e)
            this.$alert('上架失败', '错误', { type: 'error' })
          })
          .then(this.debouncedFetchProduct)
      })
    },

    upGoods() {
      this.$confirm('是否确定上架选中的商品', '提示', { type: 'warning' }).then(() => {
        Promise.all(this.selectedProducts.map(this.takeOnProduct))
          .then(() => this.$alert('上架成功', '成功', { type: 'success' }), (e) => {
            console.error(e)
            this.$alert('上架失败', '错误', { type: 'error' })
          })
          .then(this.debouncedFetchProduct)
      })
    },

    delGood(good) {
      this.$confirm('是否删除该商品', '提示', { type: 'warning' }).then(() => {
        this.deleteProduct(good)
          .then(() => this.$alert('删除成功', '成功', { type: 'success' }), (e) => {
            console.error(e)
            this.$alert('删除失败', '错误', { type: 'error' })
          })
          .then(this.debouncedFetchProduct)
      })
    },

    delGoods() {
      this.$confirm('是否删除选中的商品', '提示', { type: 'warning' }).then(() => {
        Promise.all(this.selectedProducts.map(this.deleteProduct))
          .then(() => this.$alert('删除成功', '成功', { type: 'success' }), (e) => {
            console.error(e)
            this.$alert('删除失败', '错误', { type: 'error' })
          })
          .then(this.debouncedFetchProduct)
      })
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

.table-actions {
  .el-button + .el-button {
    margin-left: 0;
    margin-top: 4px;
  }
}
</style>