<template>
  <div class="home">
    <div>
      <button @click="toLogout">登出</button>
    </div>
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import { removeToken } from "@assets/js/auth";
export default {
  name: "home",
  components: {
    HelloWorld,
  },
  methods: {
    toLogout() {
      removeToken();
      location.reload();
    },
  },
};
</script>

<style lang="stylus" scoped>
.home {
  text-align center
}
</style>
