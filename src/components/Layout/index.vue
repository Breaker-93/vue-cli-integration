<template>
  <div class="app-wrapper">
    
    <el-container>
      <el-aside :width="isCollapse ? 'auto' : '200px'">
        <div class="system-name">
          <i class="el-icon-box" :title="systemName"></i>
          <span v-if="!isCollapse">&nbsp;{{systemName}}</span>
        </div>
        <transition name="fade">
          <el-menu
            :default-active="$route.path"
            class="el-menu-vertical"
            :collapse="isCollapse"
            :background-color="menuStyle.menuBg"
            :text-color="menuStyle.menuText"
            :active-text-color="menuStyle.menuActiveText"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">导航一</span>
              </template>
              <el-menu-item-group>
                <span slot="title">分组一</span>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="分组2">
                <el-menu-item index="1-3">选项3</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="1-4">
                <span slot="title">选项4</span>
                <el-menu-item index="1-4-1">选项1</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <span slot="title">导航二</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <span slot="title">导航四</span>
            </el-menu-item>
          </el-menu>
        </transition>
      </el-aside>
      <el-container>
        <el-header height="50px">
          <hamburger :toggle-click="toggleSideBar" :is-active="isCollapse" class="hamburger-container"/>
          <breadcrumb/>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
        <el-footer>Copyright © 2020 Breaker-93</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import menuStyle from '@assets/css/variable.styl'
import Hamburger from '@comp/Hamburger'
import Breadcrumb from '@/components/Breadcrumb'
export default {
  name: "Layout",
  components: {
    Hamburger,
    Breadcrumb
  },
  props: {},
  data() {
    return {
      isCollapse: false,
      menuStyle,
      systemName: '生产管理系统'
    }
  },
  created() {},
  mounted() {},
  methods: {
    toggleSideBar() {
      this.isCollapse = !this.isCollapse
    }
  },
  computed: {},
  watch: {},
};
</script>
<style lang="stylus">
.app-wrapper {
  height 100%
  .el-container {
    height 100%
    ul.el-menu-vertical {
      li {
        width 100%
      }
    }
  }
  .el-header {
    padding-left 0
    background #fff
    box-shadow: 0 1px 4px rgba(0,21,41,.08);
  }
  .el-aside {
    .system-name {
      padding-left 20px
      font-size 22px
      line-height 50px
      color rgb(236, 240, 241)
    }
    .el-menu {
      border-right none
    }
    scrollBar()
    overflow-x hidden
    background menuBg
    color menuText
  }
  .el-main {
    height 1200px
    background bodyBg
  }
  .el-footer {
    color #909399
    line-height 60px
    text-align center
    background #F2F6FC
  }
}
</style>