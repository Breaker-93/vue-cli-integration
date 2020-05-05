<template>
  <div id="app">
    <transition name="page">
      <router-view />
    </transition>
  </div>
</template>

<style lang="stylus">
  html, body, #app {
    height 100%
  }
</style>
