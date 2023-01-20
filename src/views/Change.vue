<script >
export default {
    data() {
        return {
            id: '',
            oldpassword: '',
            newpassword: '',
        }
    },
    methods: {
        confirm: function () {
            if (this.id.trim() == '' || this.oldpassword.trim() == '') {
                console.log('用户名或密码不能为空，请输入账号密码')
                return
            }
            fetch('https://db-api.amarea.cn/users/' + this.id)
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.id === this.id && data.password === this.oldpassword) {
                        this.confirmnext()
                    }
                    else {
                        throw new Error("账号或密码错误")
                    }
                })
                .catch(err => alert(err))
        },
        confirmnext: function () {
            const myHeaders = new Headers()
            myHeaders.append("Content-Type", "application/json")
            fetch('https://db-api.amarea.cn/users/' + this.id,
                {
                    method: "PATCH",
                    headers: myHeaders,
                    body: JSON.stringify({
                        password: this.newpassword,
                    })
                })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    alert('密码修改成功')
                    
                })
                .catch(err => console.log(err))
        }
    }
}
</script>
<template>
    <div class="wrap">
        <form style="border:2px solid #000;padding: 40px;border-radius: 8px;">
            <div class="form-group">
                <p style="font-size:22px;margin: 0 auto;">修改密码</p>
            </div>
            <div class="form-group">
                <p>
                    用户名:
                    <input :style="{ height: 25 + 'px' }" v-model="id" type="text" placeholder="请输入用户名">
                </p>
            </div>
            <div class="form-group">
                <p>
                    旧密码:
                    <input :style="{ height: 25 + 'px' }" v-model="oldpassword" type="text" placeholder="请输入旧密码">
                </p>
            </div>
            <div class="form-group">
                <p>
                    新密码:
                    <input :style="{ height: 25 + 'px' }" v-model="newpassword" type="password" placeholder="请输入新密码">
                </p>
            </div>
            <div class="buttonLogin">
                <button class="btn" @click="confirm">确认</button>
                <button class="btn" @click="cancel">取消</button>
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