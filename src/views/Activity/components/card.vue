<template>
  <div>
    <div class="cover">
      <img :src="img">
    </div>
    <div class="info">
      <div>{{ format(start) }} - {{ format(end) }}</div>
      <div>报名人数: {{ count }} / {{ capacity }}</div>
      <div>
        <button
          :class="btnStyle"
          :disabled="this.status === '已结束'"
        >
          {{ status }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { format } from 'date-fns'

export default {
  props: {
    start: {
      type: Date
    },
    end: {
      type: Date
    },
    count: {
      type: Number
    },
    capacity: {
      type: Number
    },
    status: {
      type: String
    },
    img: {
      type: String
    }
  },
  computed: {
    btnStyle () {
      return {
        btn: true,
        'btn-ing': this.status === '进行中',
        'btn-end': this.status === '已结束'
      }
    }
  },
  methods: {
    format (date) {
      return format(date, 'yyyy.MM.dd')
    }
  }
}
</script>

<style lang="scss" scoped>
.cover {
  img {
    object-fit: cover;
    width: 100%;
  }

  width: 200px;
  height: 300px;
  background: #eee;
}

.info {
  text-align: center;
}

.btn {
  border-radius: 1rem;
  padding: 0.25rem 1.25rem;

  &-ing {
    color: #fff;
    background: linear-gradient(to right, #1111ec, #e45ce4)
  }

  &-end {
    color: #fff;
    background: #888;
  }
}
</style>
