<template>
  <section class="login">
    <button @click="toLogin">登录</button>
  </section>
</template>
<script>
import { setToken } from "@assets/js/auth";
export default {
  name: "login",
  components: {},
  props: {},
  data() {
    return {
      redirect: undefined,
    };
  },
  created() {},
  mounted() {},
  methods: {
    toLogin() {
      // 登录请求成功后存储登录信息
      let token = "test-token";
      setToken(token);
      console.log("login:", this.redirect);
      if (this.redirect) {
        window.location.href = this.redirect;
      } else {
        this.$router.push("/");
      }
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
.login {
   text-align center
   margin 50px
}
</style>
