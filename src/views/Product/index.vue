<template>
  <div>
    <header>
      <h1>商品管理</h1>
    </header>
    <div class="list">
      <p-card
        class="list-item"
        v-for="(product, id) in products"
        :key="id"
        :name="product.name"
        :sell="product.sell"
        :capacity="product.capacity"
        :status="product.status"
        :img="product.img"
      />
      <router-link class="list-item" to="/product/add">
        <p-card-add />
      </router-link>
      <!--占位-->
      <i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i />
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import PCard from './components/card';
import PCardAdd from './components/card-add';

const mockActivity = () => ({
  id: 0,
  name: 'Nike Air',
  sell: 10,
  capacity: 20,
  status: _.sample(['出售中', '已售罄']),
  img: ''
})
export default {
  components: { PCard, PCardAdd },
  data() {
    return {
      products: Array.from({length: 8}).map(() => mockActivity())
    }
  }
}
</script>

<style lang="scss" scoped>
@import './common';

.list {
  $gap: 1rem;

  display: flex;
  flex-wrap: wrap;

  justify-content: space-around;

  margin-left: -$gap;
  margin-right: -$gap;

  &-item {
    width: 150px;
    margin: 0 $gap $gap;

    text-decoration: none;
    color: initial;
  }

  > i {
    width: 150px;
    margin: 0 $gap $gap;
  }
}
</style>