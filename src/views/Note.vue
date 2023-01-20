<script>
import { store } from '../store'
import { marked } from 'marked'
import imgone from './img/love_red.webp'
import imgtwo from './img/love_white.webp'

export default {
  data() {
    return {
      title: '新笔记',
      // 笔记标题数组
      notes: [{
        content: '新笔记',
        id: 1
      }],
      // 单元格初始样式 数组
      cells: [{
        text: '这是一篇新笔记',
        time: Date.now()
      }],
      //单元格填充内容
      cell: '阳阳小法师',
      // 选中的单元格序号
      seleteCell: 0,
      // 选中的笔记标题序号
      seleteTitle: 0,
      i: 0,
      // 单元格预览，编辑模式 切换
      cellMode: true,
      // 笔记标题预览，编辑模式 切换
      titleMode: true,
      // 显示隐藏
      showMode: true,
      // 主题变换
      dawnDarkMode: true,
      id: 1,
      showConceal: '隐藏',
      // store.nickname 传递的用户昵称参数
      store,
      // 统计点赞数量
      count: 0,
      // 设置点赞状态
      loveMode: true,
      img:imgtwo
    }
  },

  methods: {
    // 创建
    add: function (index = 0, e) {
      this.cells.splice(this.seleteCell + index, 0, {
        text: this.cell + this.i++,
        time: Date.now()//获取当前时间戳
      })
    },
    // 单击选中事件
    cellselele: function (index) {
      this.seleteCell = index

    },
    // 双击选中事件 更改模式
    celldb: function () {
      this.cellMode = !this.cellMode
      if (this.cellMode) {
        this.$refs.cell[0].focus();
      }
    },
    // 移动事件
    move: function (index) {
      if (this.seleteCell + index == -1 || this.seleteCell + index == this.cells.length) {
        console.log('错误')
        return
      }
      let cellother = this.cells[this.seleteCell]
      this.cells[this.seleteCell] = this.cells[this.seleteCell + index]
      this.cells[this.seleteCell + index] = cellother
      this.seleteCell += index
    },
    // 删除事件
    remove: function () {
      if (this.cells.length == 1) {
        console.log("不能删除")
        return
      }

      this.cells.splice(this.seleteCell, 1)
      if (this.cells.length == this.seleteCell) {
        this.seleteCell--
      }
    },
    // 对获取到的时间戳进行转换
    timenow: function (timestamp) {
      let date = new Date(timestamp)
      let Y = date.getFullYear() + '-';
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      let D = date.getDate() + ' ';
      let h = date.getHours() + ':';
      let m = date.getMinutes() + ':';
      let s = date.getSeconds();
      return Y + M + D + h + m + s
    },
    // markdown 对单元格中的内容进行编译
    parseMarkdown(md) {
      return marked.parse(md)
    },
    //使用localStorage存储单元格，笔记标题，用品昵称信息到浏览器 
    contentcell() {
      localStorage.setItem('celldata-' + this.notes[this.seleteTitle].id, JSON.stringify(this.cells))
      localStorage.setItem('note-list', JSON.stringify(this.notes))
      localStorage.setItem('id-title', this.id)

    },
    // 新建笔记
    idup() {
      //新笔记模板
      let noteTemplate = [{
        text: '这是一篇新笔记',
        time: Date.now()
      }]
      this.notes.push({
        content: this.title + this.id++,
        id: this.id
      })
      localStorage.setItem('celldata-' + this.id, JSON.stringify(noteTemplate))
    },
    // 删除笔记
    idmove() {
      if (this.notes.length == 1) {
        console.log("不能删除")
        return
      }
      localStorage.removeItem('celldata-' + this.notes[this.seleteTitle].id)
      this.notes.splice(this.seleteTitle, 1)
      if (this.notes.length == this.seleteTitle) {
        this.seleteTitle--
      }
    },
    // 保存事件
    save(index) {
      if (index == 1) {
        this.contentcell()
      }
      else {
        this.cellMode = true
        this.titleMode = true
      }

    },
    // 单击笔记选中事件
    noteselete: function (index) {
      this.seleteTitle = index
      this.i = 0
      this.cells = JSON.parse(localStorage.getItem('celldata-' + this.notes[this.seleteTitle].id))
    },
    // 双击笔记选中事件
    titledb: function () {
      this.titleMode = !this.titleMode
    },
    // 笔记列表隐藏显示
    show: function () {
      if (this.showMode) {
        this.showConceal = '展示'
      }
      else {
        this.showConceal = '隐藏'
      }
      this.showMode = !this.showMode
    },
    // 主题切换
    change: function () {
      this.dawnDarkMode = !this.dawnDarkMode
    },
    // 点赞
    love: function () {
      if (this.loveMode) {
        this.count++
        this.img=imgone
      }
      else {
        this.count--
        this.img=imgtwo
      }
      console.log(this.loveMode)
      this.loveMode = !this.loveMode
      console.log(this.loveMode)
      localStorage.setItem('love-count', this.count)
      localStorage.setItem('love-mode',this.loveMode)
    }
  },
  // 读取浏览器存储信息 if 语句判断 有信息读取
  mounted() {
    if (localStorage.getItem('celldata-' + 1)) {
      this.cells = JSON.parse(localStorage.getItem('celldata-' + 1))
    }
    if (localStorage.getItem('note-list')) {
      this.notes = JSON.parse(localStorage.getItem('note-list'))
    }
    this.id = Number(localStorage.getItem('id-title')) || 1
    this.count = Number(localStorage.getItem('love-count')) || 0
    this.loveMode=localStorage.getItem('love-mode')
    this.store.nickname = localStorage.getItem('nickname')

  },
}
</script>

<template>
  <div :class="(dawnDarkMode) ? '' : 'dark'">
    <div style="display:flex;">
      <div id="menu" v-show="showMode">
        <button @click="idup" style="padding:0 10px;">新建</button>
        <button @click="idmove" style="padding:0 10px;">删除</button>
        <button @click="save(1)" style="padding:0 10px;">保存</button>
        <div class="title" v-for="title, index in notes" :class="(seleteTitle == index) ? 'notese' : ''"
          @click="noteselete(index)" @dblclick="titledb">
          <!-- 预览文本 -->
          <p v-show="!((seleteTitle == index) && !titleMode)">{{ title.content }}</p>
          <!-- 编辑文本 -->
          <textarea v-model="title.content" v-show="((seleteTitle == index) && !titleMode)"
            @focusout="save()"></textarea>
        </div>

      </div>
      <button @click="show" :id="(showMode) ? 'showModeone' : 'showModetwo'">{{ showConceal }}</button>
      <div style="margin-top: 80px; padding: 20px;">
        <div class="cell" v-for="cell, index in cells" :class="(seleteCell == index) ? 'cellse' : ''"
          @click="cellselele(index)" @dblclick="celldb">
          <!-- 预览文本 -->
          <span v-show="!((seleteCell == index) && !cellMode)" v-html="parseMarkdown(cell.text)"></span>
          <!-- 编辑文本 -->
          <textarea v-model="cell.text" v-show="((seleteCell == index) && !cellMode)" @focusout="save()"></textarea>
        </div>

      </div>
    </div>
    <div style="display:flex;">
      <p style="text-align: center;position: absolute;top: 5px;left: 50%;">{{ store.nickname }},欢迎登陆！</p>
      <div id="edit" style="display: flex; justify-items: center;align-items: center; min-height: 15vh;">
        <p :style="{ fontSize: 20 + 'px', padding: 5 + 'px' }">{{ notes[seleteTitle].content }}</p>
        <button @click="add()">上方新建</button>
        <button @click="add(1)">下方新建</button>
        <button @click="move(-1)">上移</button>
        <button @click="move(1)">下移</button>
        <button @click="remove">删除</button>
        <button @click="exit">退出</button>
        <button @click="change">更换主题</button>
      </div>
    </div>

    <div id="detail">
      <p>序号：{{ seleteCell }}</p>
      <!-- <p>时间：{{ timenow(cells[seleteCell].time) }}</p> -->
      <img @click="love" :src="img" alt="" width="20" height="20">
    </div>
    
  </div>
</template>

<style scoped>
#menu {
  width: 200px;
  box-sizing: border-box;
  height: 100vh;
  border-radius: 8px;
  border: 1px solid rgb(0, 0, 0);
}

.dark #menu {
  border-color: white;
}

#edit p {
  width: 100px;
}

#edit {
  display: flex;
  height: 50px;
  position: absolute;
  left: 250px;
  top: 20px;
}

.cell {
  width: 1000px;
  height: auto;
  margin-top: 20px;
  padding: 20px;
  border: 1px solid rgb(0, 0, 0);
  border-radius: 8px;
}

.dark .cell {
  border-color: white;
}

.cellse {
  border: 2px solid #646cff;
}

.dark .cellse {
  border: 2px solid #646cff;
}

.title {
  width: 90%;
  margin: 10px auto;
  padding: 5px;
  border: 1px solid rgb(0, 0, 0);
  border-radius: 8px;
  text-align: center;
}

.dark .title {
  border-color: white;
}

.notese {
  border: 2px solid #646cff;
}

.dark .notese {
  border: 2px solid #646cff;
}

#showModeone {
  position: absolute;
  left: 170px;
  top: 10px;
  height: 25px;
  font-size: 12px;
  text-align: center;
  padding: 2px;
}

#showModetwo {
  position: absolute;
  text-align: center;
  height: 25px;
  font-size: 12px;
  padding: 2px;
}

#detail {
  position: absolute;
  right: 60px;
  top: 10px;
  padding: 10px;
  font-size: 16px;
  width: auto;
  border-radius: 8px;
  border: 1px solid rgb(0, 0, 0);
  text-align: center;
}

.dark #detail {
  border-color: white;
}

#love {
  background-color: rgb(255, 225, 205);
}
</style>
