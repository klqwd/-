<template>
  <div>
    <transition name="van-slide-left" mode="out-in">
      <router-view></router-view>
    </transition>
    <!-- 1 -->
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.box {
  width: 2rem;
  height: 1rem;
  background-color: black;
}
.a {
  width: 35px;
  height: 35px;
  background-color: black;
}
</style>
