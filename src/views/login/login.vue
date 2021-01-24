<template>
  <div class="login">
    <van-nav-bar>
      <template #left>
        <i class="iconfont f44">&#xe637;</i>
      </template>
    </van-nav-bar>
    <h4 class="h4">您好，请登录</h4>
    <van-form ref="form">
      <van-field
        v-model="mobile"
        :rules="mobileRules"
        name="mobile"
        center
        placeholder="请输入手机号"
        class="txt"
      >
        <template #left-icon>
          <i class="iconfont icon">&#xe60b;</i>
        </template>
      </van-field>
      <van-field v-model="code" center placeholder="请输入验证码" class="txt">
        <template #left-icon>
          <i class="iconfont icon">&#xe60c;</i>
        </template>
        <template #button>
          <van-button class="button" @click="getCode">获取验证码</van-button>
        </template>
      </van-field>
    </van-form>
    <p>
      登录即同意 <a href="http://www.baidu.com">《用户使用协议》</a> 和
      <a href="http://www.baidu.com">《隐私协议》</a>
    </p>
    <van-button class="confrim" type="danger" block>确定</van-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      mobile: '', // 手机号
      code: '', // 验证码
      mobileRules: [
        {
          required: true,
          message: '手机号码不能为空',
          trigger: 'onBlur'
        }
      ]
    }
  },
  methods: {
    async getCode(){
      let count = 0
      this.$refs.form.validateField(['mobild'],errorMessage=>{
        if(!errorMessage){
          count++
        }
      })
      if(count == 2){

        const res = await this.$axios.post('/au/code',{mobile:this.form.mobile})
        console.log(res);
      }
    }
  },
}
</script>

<style lang="less" scoped>
.login {
  // background: #999;
  .f44 {
    font-size: 44px;
  }
  ::v-deep .van-nav-bar__left,
  ::v-deep .van-nav-bar__right {
    padding: 0;
  }
  .h4 {
    margin: 50px 0 63px 15px;
    font-size: 18px;
    font-weight: 600;
    color: #222;
  }
  .txt {
    margin-left: 34.5px;
    // margin-bottom: 20px;
    height: 40px;
    line-height: 20px;
    width: 88%;
  }
  .icon {
    margin-right: 18px;
  }
  .button {
    margin-right: 15px;
    margin-bottom: 0;
    font-size: 16px;
    color: #00b8d4;
  }
  p {
    margin-top: 20px;
    margin-left: 15px;
    font-size: 12px;
    span {
      color: #00b8d4;
    }
  }
  .confrim {
    margin: 0 auto;
    margin-top: 44px;
    width: 90%;
    border-radius: 20px;
  }
}
</style>
