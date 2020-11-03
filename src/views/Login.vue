<template>
  <section class="login">
    <van-form
      :show-error-message="false"
      class="login-form" @submit="toLogin">
      <h1>生产管理系统</h1>
      <van-field
        v-model="username"
        name="username"
        left-icon="user-o"
        clearable
        placeholder="请输入用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        name="password"
        :type="showPwd ? 'text' : 'password'"
        clearable
        left-icon="smile-o"
        :right-icon="showPwd ? 'eye-o' : 'closed-eye'"
        @click-right-icon="showPwdClick"
        placeholder="请输入密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-checkbox
        v-model="rememberPwd"
        class="rem-check"
        icon-size="15px"
        checked-color="#07c160">
        记住密码
      </van-checkbox>
      <van-button round block type="default" native-type="submit">登录</van-button>
    </van-form>
    <div class="water w1" :style="{height: heightRate}"></div>
    <div class="water w2" :style="{height: heightRate}"></div>
    <div class="water" :style="{height: heightRate}"></div>
  </section>
</template>
<script>
import Vue from 'vue'
import { Button, Field, Form, Checkbox, Icon, Toast } from 'vant';
Vue.use(Toast)
export default {
  name: "login",
  components: {
    VanButton: Button,
    VanField: Field,
    VanForm: Form,
    VanCheckbox: Checkbox,
    VanIcon: Icon
  },
  props: {},
  data() {
    return {
      username: '',
      password: '',
      pwdType: 'password',
      redirect: undefined,
      heightRate: '20%',
      rememberPwd: false,
      showPwd: false,
    };
  },
  created() {},
  mounted() {},
  methods: {
    showPwdClick() {
      this.showPwd = !this.showPwd
    },
    toLogin() {
      Toast.loading('验证中...');
      this.$store.dispatch('Login', {username: this.username, password: this.password}).then(() => {
        Toast.clear();
        if (this.redirect) {
          window.location.href = this.redirect;
        } else {
          this.$router.push("/");
        }
      }).catch(() => {
        // Toast.clear();
      })
    },
  },
  computed: {},
  watch: {
    $route: {
      handler(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
};
</script>

<style lang="stylus">

/* reset element-ui css */
.login {
}
</style>

<style lang="stylus" scoped>
.login {
  position relative
  height 100%
  background-size cover

  .login-form {
    position absolute
    top 50%
    transform translateY(-50%)
    width 100%
    padding 0 50px
    box-sizing border-box
    h1 {
      margin -80px 0 80px
      font-size 24px
      font-family:Microsoft YaHei;
      font-weight:400;
      color #ffffff
      text-align center
    }
    .van-cell {
      background none
      margin 8px 0
      color #fff
      &:not(:last-child)::after {
        right 0
        left 0
      }
      .van-field__control {
        color #fff
      }
    }
    .rem-check {
      float right
      margin 5px 0 10px
      .van-checkbox__label {
        font-size 12px
        color #fff
        line-height unset
      }
    }
  }

 
}
</style>
