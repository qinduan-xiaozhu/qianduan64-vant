<template>
  <div class="login">
    <!-- <van-nav-bar>
      <template #left>
        <i class="iconfont f44">&#xe637;</i>
      </template>
    </van-nav-bar> -->
    <hmNavBar path="/layout/find"></hmNavBar>
    <div class="content">
      <h3 class="title">您好，请登录</h3>
      <van-form ref="form">
        <van-field
          placeholder="请输入手机号"
          v-model="form.mobile"
          :rules="rules.mobile"
          name="mobile"
          class="val"
        >
          <template #left-icon>
            <i class="iconfont pr20">&#xe60b;</i>
          </template>
        </van-field>
        <van-field
          placeholder="请输入验证码"
          v-model="form.code"
          :rules="rules.code"
          name="code"
          class="val"
        >
          <template #left-icon>
            <i class="iconfont pr20">&#xe60c;</i>
          </template>
          <template #button>
            <span class="button" v-if="totalTime === 5" @click="getCode"
              >获取验证码</span
            >
            <span class="button" v-else>{{ totalTime }}秒</span>
          </template>
        </van-field>
      </van-form>
      <div class="tip">
        登录即同意 <span>《用户使用协议》</span> 和 <span>《隐私协议》</span>
      </div>
      <van-button type="danger" class="submit" @click="submit" block round
        >确定</van-button
      >
    </div>
  </div>
</template>

<script>
/*
环境变量
  开发环境
    1：在根目录创建一个.env.development
    2：设置变量
        VUE_APP_开头
    生产环境
    1：在根目录创建一个.env.production
    2：设置变量
        VUE_APP_开头
*/
import { auCode, auLogin } from '@/api/login'
import { setToken, getToken } from '@/utils/token'
// import _fetch from '@/api/request.js'
export default {
  data () {
    return {
      // 设置定时器，给个默认值
      totalTime: 5,
      form: {
        mobile: '', // 手机号
        code: '' // 验证码
      },
      rules: {
        // 校验手机号
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'onChange' },
          {
            validator: value => {
              return /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(
                value
              )
            },
            message: '请输入正确的手机号',
            trigger: 'onChange'
          }
        ],
        // 校验验证码
        code: [{ required: true, message: '请输入验证码', trigger: 'onChange' }]
      }
    }
  },
  created () {
    // 登录成功后，禁止再返回到登录页面
    // console.log(process.env.VUE_APP_URL)
    // if (this.$store.state.isLogin) {
    //   this.$router.push('/layout')
    // }
    if (getToken()) {
      this.$router.push('/layout')
    }
  },
  methods: {
    // 获取验证码
    getCode () {
      this.$refs.form
        .validate('mobile')
        .then(() => {
          // this.$toast.success('验证成功')
          // _fetch({
          //   url: '/au/code',
          //   method: 'post',
          //   data: {
          //     mobile: this.form.mobile
          //   }
          // }).then(res => {
          //   console.log(res)
          // })
          // 点击获取时就开始--
          this.totalTime--
          // 创建一个倒计时
          const interval = setInterval(() => {
            // 成功获取就开始倒计时
            this.totalTime--
            if (this.totalTime <= 0) {
              // 清除定时器
              clearInterval(interval)
              // 还原定时器
              this.totalTime = 5
            }
          }, 1000)
          // 加载动画
          this.$toast.loading({
            message: '加载中...'
          })
          // 发请求
          auCode({ mobile: this.form.mobile }).then(res => {
            window.console.log(res)
            this.$toast.success(res.data.data)
          })
        })
        .catch(() => {
          this.$toast.fail('验证失败')
        })
    },
    // 登录
    submit () {
      // 设置一个加载动画
      this.$toast.loading('登录中...')
      this.$refs.form
        .validate()
        .then(() => {
          auLogin(this.form)
            .then(res => {
              // 提示用户登录成功
              this.$toast.success(res.data.message)
              this.$route.meta.noodLogin = true
              // 保存token
              setToken('token', res.data.data.jwt)
              // 保存用户信息
              this.$store.commit('setUserInfo', res.data.data.user)
              // 设置登录状态为true
              this.$store.commit('setLogin', true)
              // 清除加载动画
              this.$toast.clear()
              // 登录成功跳转到主页面
              // console.log(this.$route.query)
              // this.$router.push('/layout')
              const _redirect = this.$route.query.redirect
              if (_redirect) {
                // console.log(_redirect)
                this.$router.push(_redirect)
              } else {
                this.$router.push('/layout')
              }
            })
            .catch(() => {})
        })
        .catch(() => {
          this.$toast.fail('验证失败')
        })
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  .content {
    padding: 0 @p15;
    .title {
      font-size: 18px;
      font-family: PingFangSC, PingFangSC-Semibold;
      font-weight: 600;
      text-align: left;
      color: #222222;
      line-height: 25px;
      letter-spacing: 0px;
      padding: 50px 0 63px;
    }
    .val {
      height: 45px;
    }
    .pr20 {
      padding-right: 20px;
    }
    .button {
      font-size: 16px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: #00b8d4;
      line-height: 23px;
      letter-spacing: 0px;
    }
    .tip {
      font-size: 12px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: #181a39;
      line-height: 16px;
      letter-spacing: 0px;
      padding: 23px 0 44px;
      span {
        color: #00b8d4;
      }
    }
  }
}
</style>
