<template>
  <div class="app-wrapper">
    <el-container>
      <el-aside :width="isCollapse ? 'auto' : '200px'">
        <div class="system-name">
          <i class="el-icon-box" :title="systemName"></i>
          <span v-if="!isCollapse">&nbsp;{{ systemName }}</span>
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
            <sidebar-item
              v-for="route in routes"
              :key="route.path"
              :item="route"
              :base-path="route.path"
            />
          </el-menu>
        </transition>
      </el-aside>
      <el-container>
        <el-header height="50px">
          <hamburger
            :toggle-click="toggleSideBar"
            :is-active="isCollapse"
            class="hamburger-container"
          />
          <breadcrumb />
          <el-dropdown class="avatar-container" trigger="click">
            <div class="avatar-wrapper">
              <img v-if="avatar" :src="avatar" class="user-avatar" />
              <svg-icon v-else icon-class="avatar"></svg-icon>
              <i class="el-icon-caret-bottom" />
            </div>
            <el-dropdown-menu slot="dropdown" class="user-dropdown">
              <router-link class="inline-block" to="/">
                <el-dropdown-item>
                  首页
                </el-dropdown-item>
              </router-link>
              <el-dropdown-item divided>
                <span style="display:block;" @click="toLogout">登出</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
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
import menuStyle from "@assets/css/variable.styl";
import Hamburger from "@comp/Hamburger";
import Breadcrumb from "@comp/Breadcrumb";
import SidebarItem from "./SidebarItem";
export default {
  name: "Layout",
  components: {
    Hamburger,
    Breadcrumb,
    SidebarItem,
  },
  props: {},
  data() {
    return {
      isCollapse: false,
      menuStyle,
      systemName: "生产管理系统",
      avatar: null,
    };
  },
  created() {},
  mounted() {},
  methods: {
    toggleSideBar() {
      this.isCollapse = !this.isCollapse;
    },
    toLogout() {
      this.$store.dispatch("FedLogOut").then(() => {
        location.reload(); // 为了重新实例化vue-router对象 避免bug
      });
    },
  },
  computed: {
    routes() {
      return this.$router.options.routes;
    },
  },
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
      border: none;
      &.el-menu--collapse {
        .el-submenu__title{
          >span, >.el-submenu__icon-arrow {
            display none
          }
        }
      }
    }
    scrollBar()
    overflow-x hidden
    background menuBg
    color menuText
    .nest-menu {
      height 50px
    }
    .nest-menu .el-submenu>.el-submenu__title,
    .nest-menu,
    .el-submenu .el-menu-item {
      background-color: subMenuBg !important;

      &:hover {
        background-color: subMenuHover !important;
      }
    }
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
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      line-height: initial;
      .svg-icon {
        width: 40px;
        height: 40px;
      }
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
.user-dropdown {
  .inline-block {
    text-decoration none
  }
}
</style>
