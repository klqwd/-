<template>
  <div>
    <van-nav-bar title="登录" />
    <van-form>
      <!-- 账号输入框 -->
      <van-field
        v-model="mobile"
        name="mobile"
        label="请输入手机号"
        placeholder="请输入手机号"
        :rules="[
          { required: true, message: '请填写手机号' },
          {
            pattern:
              /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
            message: '手机格式错误',
          },
        ]"
      >
        <template #label>
          <span class="toutiao toutiao-shouji"></span>
        </template>
      </van-field>

      <!-- 密码输入框 -->
      <van-field
        v-model="code"
        name="code"
        placeholder="请输入验证码"
        :rules="[
          { required: true, message: '请输入验证码' },
          {
            pattern: /[0-9]{6}/,
            message: '验证码格式错误',
          },
        ]"
      >
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mobile: "",
      code: "",
    };
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
    flex: 1;
  }
  .toutiao {
    font-size: 10px;
  }
}
</style>
