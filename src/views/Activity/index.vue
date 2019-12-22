<template>
  <div class="activity">
    <header>
      <h1>全店活动</h1>
    </header>
    <div class="list">
      <a-card
        class="list-item"
        v-for="(activity, id) in activities"
        :key="id"
        :start="activity.start"
        :end="activity.end"
        :count="activity.count"
        :capacity="activity.capacity"
        :status="activity.status"
        :img="activity.img"
      />
      <router-link class="list-item" to="/activity/add">
        <a-card-add />
      </router-link>
      <!--占位-->
      <i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i />
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import ACard from './components/card';
import ACardAdd from './components/card-add';

const mockActivity = () => ({
  id: 0,
  start: new Date(),
  end: new Date(),
  count: 10,
  capacity: 20,
  status: _.sample(['进行中', '已结束']),
  img: ''
})

export default {
  components: { ACard, ACardAdd },
  data() {
    return {
      activities: Array.from({length: 8}).map(() => mockActivity())
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
    width: 200px;
    margin: 0 $gap $gap;

    text-decoration: none;
    color: initial;
  }

  > i {
    width: 200px;
    margin: 0 $gap $gap;
  }
}

</style>