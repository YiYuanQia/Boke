<script>
import imgone from './img/love_red.webp'
import imgtwo from './img/love_white.webp'
import { store } from '../store'


export default {
    data() {
        return {
            bloggers: [{
                content: '这是一篇说明文',
                id: 1,
                count: 0
            }],
            // 设置点赞状态
            loveMode: true,
            // 初始图片
            img: imgtwo,
            seleteWeb: 0,
            // 用户信息
            store,
            count: 0
        }

    },
    methods: {
        // 单击选中事件
        webselete: function (index) {
            this.seleteWeb = index

        },
        // 点赞
        love: function () {
            if (this.loveMode) {
                this.bloggers[this.seleteWeb].count++

                this.img = imgone
            }
            else {
                this.bloggers[this.seleteWeb].count--
                this.img = imgtwo
            }

            this.loveMode = !this.loveMode
            console.log(this.bloggers[this.seleteWeb].count)
            localStorage.setItem('love-count', this.bloggers[this.seleteWeb].count)
            localStorage.setItem('love-mode', this.loveMode)
        },
        note: function () {
            this.$router.push('./login')
        },
        notebook: function () {
            this.$router.push('./note')
        }
    },
    mounted() {
        this.bloggers[this.seleteWeb].count = Number(localStorage.getItem('love-count')) || 0
    }
}
</script>
<template>
    <div style="display:flex">
        <div class="web" v-for="blogger, index in bloggers" @click="webselete(index)">
            {{ blogger.content }}<br>
            <div>
                <img id="love" @click="love" :src="img" width="20" height="20"> {{ blogger.count }}
            </div>
        </div>
        <div class="myself">
            <div @click="note" id="message">
                昵称：{{ store.nickname }}<br>
                手机号：{{ store.phone }}<br>
                性别:{{ store.sex }}<br>
                邮箱地址：{{ store.emailaddress }}<br>
                密码：{{ store.password }}
            </div>

            <p @click="notebook" id="notebook">我的笔记</p>
        </div>
    </div>

</template>
<style>
.web {
    width: 1000px;
    height: auto;
    margin-top: 20px;
    margin-left: 150px;
    padding: 20px;
    border: 1px solid rgb(0, 0, 0);
    border-radius: 8px;
}

.myself {
    width: 200px;
    height: auto;
    margin-top: 20px;
    margin-left: 30px;
    padding: 20px;
    border: 1px solid rgb(0, 0, 0);
    border-radius: 8px;
}

#love {
    margin-left: 50px;
    margin-top: 20px;
    background-color: rgb(255, 225, 205);
}

#message {
    background-color: rgb(236, 236, 236);
}

#notebook {
    background-color: rgb(236, 236, 236);
    margin-top: 20px;
}
</style>