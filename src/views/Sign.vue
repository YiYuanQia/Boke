<script >
export default {
    data() {
        return {
            id: '',
            name: '',
            password: '',
            twicepassword: '',
            email: '',
            phone: '',
            sex: '',
        }
    },
    methods: {
        sign: function () {
            if (this.password !== this.twicepassword) {
                alert('两次密码输入不一')
                return

            }
            if (this.id.trim() == '' || this.name.trim() == '' || this.password.trim() == '' || this.twicepassword.trim() == '' || this.email.trim() == '' || this.phone.trim() == '' || this.sex.trim() == '') {
                alert('请输入完整信息')
                return
            }
            const myHeaders = new Headers()
            myHeaders.append("Content-Type", "application/json")
            fetch('https://db-api.amarea.cn/users/',
                {
                    method: "POST",
                    headers: myHeaders,
                    body: JSON.stringify({
                        id: this.id,
                        name: this.name,
                        password: this.password,
                        email: this.email,
                        phone: this.phone,
                        sex: this.sex
                    })
                })
                .then(response => {
                    if (response.status == 500) {
                        console.log("用户已注册")
                        throw new Error("用户已注册")
                    }
                    
                    return response.json()
                })
                .then(data => {
                    if(this.password==this.twicepassword){
                        console.log('注册成功')
                        alert('注册成功')
                        this.$router.push('/login')
                    }
                    console.log(data)
                })
                .catch(err => alert(err))
        }
    }
}
</script>
<template>
    <div class="wrap">
        <form style="border:2px solid #000;padding: 30px;border-radius: 8px;">
            <div class="form-group">
                <p style="font-size:22px;margin: 0 auto;">用户注册</p>
            </div>
            <div class="form-group">
                用户名：
                <input :style="{ height: 25 + 'px' }" type="text" v-model="id" placeholder="请输入账户名">
            </div>
            <div class="form-group">
                昵称：
                <input :style="{ height: 25 + 'px' }" type="text" v-model="name" placeholder="请输入昵称">
            </div>
            <div class="form-group">
                密码：
                <input :style="{ height: 25 + 'px' }" type="text" v-model="password" placeholder="请输入密码">
            </div>
            <div class="form-group">
                密码：
                <input :style="{ height: 25 + 'px' }" type="text" v-model="twicepassword" placeholder="请再次输入密码">
            </div>
            <div class="form-group">
                邮箱：
                <input :style="{ height: 25 + 'px' }" type="text" v-model="email" placeholder="请输入邮箱地址">
            </div>
            <div class="form-group">
                电话：
                <input :style="{ height: 25 + 'px' }" type="text" v-model="phone" placeholder="请输入电话号码">
            </div>
            <div>
                性别：
                <input type="radio" v-model="sex" value="男" id="male">
                <label for="male">男</label>
                <input type="radio" v-model="sex" value="女" id="famale">
                <label for="famale">女</label>
            </div>
            <div class="buttonsign">
                <button class="btnsign" @click="sign">注册</button>
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
}

.buttonsign {
    display: flex;
    align-items: center;
    justify-content: center;
}

.btnsign {
    margin-top: 20px;
    padding: 0 25px;

}
</style>