<template>
  <div>
    <!-- 二级路由区 -->
    <router-view>首页</router-view>
    <!-- 导航区 -->
    <van-tabbar class="tabbar" route>
      <van-tabbar-item to="/ ">
        <template #icon>
          <span class="iconfont icon-shouye"></span>
        </template>
        <span>首页</span>
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <template #icon>
          <span class="iconfont icon-shipin"></span>
        </template>
        <span>视频</span>
      </van-tabbar-item>
      <van-tabbar-item to="/qa">
        <template #icon>
          <span class="iconfont icon-wenda1"></span>
        </template>
        <span>问答</span>
      </van-tabbar-item>
      <van-tabbar-item to="/profile">
        <template #icon>
          <span class="iconfont icon-wode"></span>
        </template>
        <span>{{ isLogin ? "我的" : "未登录" }}</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      //active: "",
    };
  },
  computed: {
    ...mapGetters(["isLogin"]),
  },
};
</script>

<style>
.text {
  font-size: 30px;
}
.toutiao {
  font-size: 40px;
}
</style>
