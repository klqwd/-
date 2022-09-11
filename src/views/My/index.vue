<template>
  <div class="profile">
    <!-- 头部 -->
    <header>
      <!-- 登录状态的结构 -->
      <div class="login banner" v-if="isLogin">
        <van-row></van-row>
        <van-row>
          <van-col span="12">
            <van-row type="flex" justify="space-around" align="center">
              <van-image
                round
                width="1.5rem"
                height="1.5rem"
                :src="userInfo.photo"
              ></van-image>
              <span class="mobile"> {{ userInfo.name }}</span>
            </van-row>
          </van-col>
          <van-col span="7"></van-col>
          <van-col span="5">
            <van-row
              type="flex"
              justify="center"
              align="center"
              style="height: 100%"
            >
              <van-button size="mini" round class="edit-btn"
                >编辑按钮</van-button
              >
            </van-row>
          </van-col>
        </van-row>
        <van-row>
          <van-grid :border="false">
            <van-grid-item text="头条">
              <template #icon> 0 </template>
            </van-grid-item>
            <van-grid-item text="粉丝">
              <template #icon> 0 </template>
            </van-grid-item>
            <van-grid-item text="关注">
              <template #icon> 0 </template>
            </van-grid-item>
            <van-grid-item text="获赞">
              <template #icon> 0 </template>
            </van-grid-item>
          </van-grid>
        </van-row>
      </div>
      <!-- 未登录状态的结构 -->
      <div class="logout banner" v-else @click="$router.push('/login')">
        <van-image
          width="1.76rem"
          height="1.76rem"
          :src="mobileSrc"
        ></van-image>
        <span class="text">登录/注册</span>
      </div>
    </header>
    <!-- 主体 -->
    <main>
      <van-grid column-num="2">
        <van-grid-item text="收藏">
          <template #icon>
            <span class="iconfont icon-shoucang"></span>
          </template>
        </van-grid-item>
        <van-grid-item text="历史">
          <template #icon>
            <span class="iconfont icon-lishi"></span>
          </template>
        </van-grid-item>
      </van-grid>
      <div class="link">
        <van-cell title="消息通知" is-link></van-cell>
        <van-cell title="小智同学" is-link></van-cell>
      </div>
    </main>

    <!-- 底部 -->
    <footer>
      <van-button v-if="isLogin" @click="logout" class="button"
        >退出</van-button
      >
    </footer>
  </div>
</template>

<script>
import { getUserInfoAPI } from "@/api";
import mobileSrc from "@/assets/images/mobile.png";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      mobileSrc,
      userInfo: {},
    };
  },
  computed: {
    ...mapGetters(["isLogin"]),
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    //退出登录
    async logout() {
      await this.$dialog.confirm({
        title: "黑马头条",
        message: "是否确认退出该账号",
      });
      this.$store.commit("SET_TOKEN", {});
    },
    //获取用户信息
    async getUserInfo() {
      try {
        if (!this.isLogin) return;
        const { data } = await getUserInfoAPI();
        this.userInfo = data.data;
        console.log(data);
      } catch (error) {
        if (error.response && error.response.status == 401) {
          this.$toast.fail("用户认证失败，请重新登录");
        } else {
          throw error;
        }
      }
    },
  },
};
</script>

<style scoped lang="less">
// 必须background-position
.banner {
  width: 100%;
  height: 5.3375rem;
  background: url("../../assets/images/banner.png") no-repeat 0 0 / cover;
}
// 未登录状态
.logout {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
//登录状态
.login {
  display: flex;
  flex-direction: column;
  > .van-row {
    flex: 1;
  }
  .mobile {
    font-size: 30px;
    color: #fff;
  }
  .van-col {
    height: 100%;
  }
}
.text {
  font-size: 30px;
  color: #fff;
  margin-top: 10px;
}

.edit-btn {
  width: 4.2rem;
  height: 0.8667rem;
  color: #666;
}
.profile {
  height: 100vh;
  background-color: #f5f7f9;
}
.link {
  margin: 10px 0;
}
.toutiao {
  font-size: 40px;
}
.toutiao-shoucang {
  color: red;
}
.toutiao-lishi {
  color: orange;
}
.button {
  width: 100%;
}
</style>
