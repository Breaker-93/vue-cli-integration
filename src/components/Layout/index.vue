<template>
  <div class="app-wrapper">
    <router-view class="tab-content" />
    <van-tabbar route>
      <van-tabbar-item replace to="/home" icon="home-o">
        首页
      </van-tabbar-item>
      <van-tabbar-item replace to="/my" icon="user-o">
        我
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant'
export default {
  name: "Layout",
  components: {
    VanTabbar: Tabbar,
    VanTabbarItem: TabbarItem,
  },
  props: {},
  data() {
    return {
    }
  },
  created() {},
  mounted() {},
  methods: {
  },
  computed: {
  },
  watch: {},
};
</script>
<style lang="stylus">
.app-wrapper {
  height 100%
  .tab-content {
    height: calc(100% - 50px);
    overflow: auto;
  }
}
</style>