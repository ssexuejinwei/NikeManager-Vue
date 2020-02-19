<template>
  <div>
    <page-header title="编辑商品" back />
    <div v-loading="isLoading">
      <el-form
        v-if="product"
        ref="form"
        class="form"
        label-width="120px"
      >
        <el-form-item label="商品封面">
          <img class="cover" :src="product.coverimage" alt="商品封面">
        </el-form-item>
        <el-form-item label="商品图片">
          <div class="images">
            <img v-for="image in product.images" :key="image" :src="image">
          </div>
        </el-form-item>
        <el-form-item label="商品名称">
          {{ product.name }}
        </el-form-item>
        <el-form-item label="商品分类" prop="type">
          {{ type }}
        </el-form-item>
        <el-form-item label="小分类" prop="category">
          {{ product.category }}
        </el-form-item>
        <el-form-item label="原价" prop="original_price">
          {{ product.original_price }}
          <el-button type="text" @click="updateProperty('original_price', '原价', { inputValidator(v) { return Number(v) > 0 && Number(v) >= product.current_price } } )">
            修改
          </el-button>
        </el-form-item>
        <el-form-item label="现价" prop="current_price">
          {{ product.current_price }}
          <el-button type="text" @click="updateProperty('current_price', '现价', { inputValidator(v) { return Number(v) > 0 && Number(v) <= product.original_price } } )">
            修改
          </el-button>
        </el-form-item>
        <el-form-item label="简介" prop="laber">
          {{ product.laber }}
        </el-form-item>
        <el-form-item label="详细介绍" prop="desc">
          {{ product.desc }}
        </el-form-item>
        <el-form-item label="sku">
          <el-table :data="product.sku">
            <el-table-column label="尺码" prop="size" width="90" />
            <el-table-column label="库存" prop="num" width="150" />
            <el-table-column label="操作" width="230">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  @click="editSku(scope.row)"
                >
                  修改
                </el-button>
                <!-- <el-button
                  size="mini"
                  type="danger"
                  @click="delSku(scope.row)"
                >
                  删除
                </el-button> -->
              </template>
            </el-table-column>
          </el-table>
          <el-button size="mini" type="primary" @click="addSku">
            添加
          </el-button>
        </el-form-item>
        <el-form-item label="是否预售">
          <span v-if="product.reserve === '1'">{{ product.reserve_time }}</span>
          <span v-else>否</span>
        </el-form-item>
        <el-form-item label="上架时间">
          {{ product.putaway_time }}
        </el-form-item>
      </el-form>
    </div>

    <skuAddModal :visible.sync="skuAddModalVisible" :submit="handleAddSku" />
  </div>
</template>

<script>
import Axios from 'axios'
import _ from 'lodash'
import qs from 'querystring'

import skuAddModal from './skuAddModal'

export default {
  components: { skuAddModal },
  data () {
    return {
      id: this.$route.params.id,
      product: null,
      isLoading: false,
      types: [],

      skuAddModalVisible: false
    }
  },

  computed: {
    type () {
      const typeId = this.product?.type ?? -1
      const type = _.find(this.types, 'id', typeId)

      return type?.name ?? 'unknown'
    }
  },

  async created () {
    this.isLoading = true
    await this.fetchTypes()
    await this.fetchGood()
    this.isLoading = false
  },

  methods: {
    async fetchTypes () {
      try {
        const { data } = await Axios.get('/sellerctr/getGoodsType')
        this.types = data.data
      } catch (e) {
        console.error(e)
        this.$message.error(`获取商品分类失败: ${e.message || '未知错误'}`)
      }
    },
    async fetchGood () {
      try {
        const { data } = await Axios.get('/sellerctr/getGoodsById', {
          params: { id: this.id }
        })
        this.product = data.data
      } catch (e) {
        console.error(e)
        this.$message.error(`获取商品信息失败: ${e.message || '未知错误'}`)
      }
    },

    delSku (sku) {},

    editSku (sku) {
      this.$prompt(`请输入尺码${sku.size}的库存`, '修改库存', {
        inputValidator (v) {
          const num = Number(v)
          if (isNaN(num)) return false
          if (!Number.isInteger(num)) return false
          return true
        },
        inputErrorMessage: '请输入整数',
        inputValue: sku.num
      })
        .then(({ value }) => {
          Axios.post(
            '/sellerctr/updateSku',
            qs.stringify({
              id: sku.id,
              goods_id: sku.goods_id,
              num: value
            })
          ).then(() => {
            this.$message.success('修改成功')
            this.fetchGood()
          })
            .catch(e => {
              console.error(e)
              this.$message.error('修改失败: ' + e.message)
            })
        }).catch(() => {})
    },

    addSku () {
      this.skuAddModalVisible = true
    },

    async handleAddSku (form) {
      try {
        await Axios.post('/sellerctr/addSku', qs.stringify({
          ...form,
          goods_id: this.product.id
        }))
        this.$message.success('添加sku成功')
        this.fetchGood()
      } catch (e) {
        console.error(e)
        this.$message.error('添加sku失败')
      }
    },

    updateProperty (prop, name, options) {
      this.$prompt(`修改商品${name}`, '修改', {
        ...options,
        inputValue: this.product[prop]
      }).then(({ value }) => {
        Axios.post('/sellerctr/updateGoods', {
          id: this.id,
          [prop]: value
        }).then(() => {
          this.$message.success('修改成功')
          this.fetchGood()
        }).catch(e => {
          console.error(e)
          this.$message.error('修改失败: ' + e.message)
        })
      }).catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
.form {
  width: 600px;
  min-height: 200px;
}

.cover {
  width: 80px;
  height: 80px;
  object-fit: contain;
  display: block;
}

.images {
  display: flex;
  height: 100px;
  flex-wrap: nowrap;
  overflow-x: auto;

  > img {
    height: 100%;
    margin-right: 8px;
  }
}
</style>
