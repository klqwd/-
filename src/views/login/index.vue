<template>
  <div>
    <van-nav-bar title="登录" />
    <van-form class="form" ref="form">
      <!-- 账号输入框 -->
      <van-field
        v-model="mobile"
        name="mobile"
        label="请输入手机号"
        placeholder="请输入手机号"
        :rules="mobileRules"
      >
        <!-- 字体图标 -->
        <template #label>
          <span class="toutiao toutiao-shouji"></span>
        </template>
        <!-- 验证码 -->
      </van-field>

      <!-- 密码输入框 -->
      <van-field
        v-model="code"
        name="code"
        placeholder="请输入验证码"
        :rules="codeRules"
      >
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <template #button>
          <van-button
            class="btn"
            block
            type="default"
            size="small"
            round
            native-type="button"
            v-if="isShowCodeBtn"
            @click="sendCode"
          >
            获取验证码
          </van-button>
          <van-count-down
            v-else
            :time="60 * 1000"
            format="ss秒"
            @finish="isShowCodeBtn = true"
          />
        </template>
      </van-field>
      <div style="margin: 16px" @click="onSubmit">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
//引入API
import { mapMutations } from "vuex";
import { login, sendCodeAPI } from "@/api";
import { mobileRules, codeRules } from "./rule";
export default {
  data() {
    return {
      mobile: "",
      code: "",
      mobileRules,
      codeRules,
      isShowCodeBtn: true,
    };
  },
  methods: {
    async onSubmit() {
      //登录
      //loading
      //message:提示文案
      //firbidClick禁止点击
      //duration 展示的时长为0一直显示
      this.loading();
      try {
        const { data } = await login(this.mobile, this.code);
        this.SET_TOKEN(data.data);
        //跳转路由
        this.$router.push("/profile");
        this.$toast.success("登录成功");
      } catch (error) {
        //细分一下失败：提示用户手机号和验证码
        //error:1.js抛的错 2.axios封装的error对象
        //axios封装的error对象
        // error.response.data 后端返回的数据
        // error.response.staus 后端返回的状态码
        if (error.response && error.response.status === 400) {
          this.$toast.fail(error.response.data.message);
        } else {
          console.dir(error);
          this.$toast.clear();
        }
      }
    },
    loading() {
      this.$toast.loading({
        message: "加载中",
        forbidClick: "true",
        duration: 0,
      });
    },
    ...mapMutations(["SET_TOKEN"]),
    async sendCode() {
      await this.$refs.form.validate("mobile");
      this.loading();
      //1.发送请求
      try {
        await sendCodeAPI(this.mobile);
        this.isShowCodeBtn = false;
        this.$toast.success("发送验证码成功");
      } catch (error) {
        if (
          error.response &&
          (error.response.status === 429 || error.response.status === 404)
        ) {
          this.$toast.fail(error.response.data.message);
        } else {
          this.$toast.clear();
          throw error;
        }
      }
      //2.显示倒计时
    },
  },
};
</script>

<style scoped lang="less">
.van-nav-bar {
  background: #3196fa;
  color: #fff;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
}

:deep(.form) {
  .van-cell__title {
    flex: 1;
  }
  .van-cell__value {
    flex: 20;
  }
  .toutiao {
    font-size: 40px;
  }
}
</style>
