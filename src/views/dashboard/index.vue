<template>
  <div class="dashboard-container">
    <div class="dashboard-text"><span class="title">用户名：</span>{{ userInfo.name }}</div>
    <div class="dashboard-text"><span class="title">角色：</span><span class="item" v-for="(role, index) in roles" :key="index">{{ role.name }} </span></div>
    <div class="dashboard-text"><span class="title">权限：</span><span class="item" v-for="(auth, index) in accesses" :key="index">{{ auth.name }}</span></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'dashboard',
  computed: {
    ...mapGetters([
      'userInfo',
      'roles',
      'authorities',
      'accesses'
    ])
  },
  created() {
    console.log('用户权限：', this.authorities)
  }
}
</script>

<style lang="stylus" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
    .title {
      font-size 20px;
      color #ccc
    }
    .item {
      margin-right 10px;
    }
  }
}
</style>
