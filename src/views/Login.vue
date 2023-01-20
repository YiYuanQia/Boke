<script >
import { store } from '../store'
export default {
  data() {
    return {
      username: '',
      name: '',
      password: '',
      store
    }
  },
  methods: {
    login: function () {
      if (this.username.trim() == '' || this.password.trim() == '') {
        alert('用户名或密码不能为空，请输入账号密码')
        return
      }
      fetch('https://db-api.amarea.cn/users/' + this.username)
        .then(res => res.json())
        .then(data => {
          console.log(data)
          if (data.id === this.username && data.password === this.password) {
            console.log(data.name)
            console.log(data)
            this.store.nickname = data.name
            this.store.phone=data.phone
            this.store.sex=data.sex
            this.store.emailaddress=data.email
            this.store.password=data.password
            localStorage.setItem('nickname', this.store.nickname)
            localStorage.setItem('phone', this.store.phone)
            localStorage.setItem('sex', this.store.sex)
            localStorage.setItem('email', this.store.emailaddress)
            localStorage.setItem('password', this.store.password)
            
            this.$router.push('./web')
          }
          else {
            throw new Error("账号或密码错误")
          }
        })
        .catch(err => alert(err))
    },
    sign: function () {
      this.$router.push('/sign')
    },
    change: function () {
      this.$router.push('/change')
    }
  }
}
</script>
<template>
  <div class="wrap">
    <form style="border:2px solid #000;padding: 40px;border-radius: 8px;">
      <div class="form-group">
        <p style="font-size:22px;margin: 0 auto;">用户登录</p>
      </div>
      <div class="form-group">
        <p>
          账户:
          <input :style="{ height: 25 + 'px' }" v-model="username" type="text" placeholder="请输入账户名">
        </p>
      </div>
      <div class="form-group">
        <p>
          密码:
          <input :style="{ height: 25 + 'px' }" v-model="password" type="password" placeholder="请输入密码">
        </p>
      </div>
      <div class="buttonLogin">
        <button class="btn" @click="login">登录</button>
        <button class="btn" @click="change">修改密码</button>
        <button class="btn" @click="sign">注册</button>
      </div>
    </form>
  </div>
</template>
<style>
.wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;

}

.form-group {
  display: flex;
  height: 60px;

}

.buttonLogin {
  display: flex;
  /* 两端对齐 */
  justify-content: space-between;
  /* 不换行 */
  flex-wrap: nowrap;
}

.btn {
  padding: 0 15px;
}
</style>