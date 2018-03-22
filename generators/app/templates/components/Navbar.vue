<template>
  <nav class="navbar"
    v-if="visible"
    :class="{ fixed: fixed }"
    :style="{
      backgroundColor: backgroundColor,
      color: textColor,
      fontSize: fontSize
    }"
  >
    <div class="navbar__left" :class="{ hide: leftBtnVisible === false}" @click.prevent="leftBtnAction">
      <span class="btn btn--image" v-if="leftBtnType === 'image'"><img src="" alt=""></span>
      <span class="btn btn--text" v-if="leftBtnType === 'text'">返回</span>
      <span class="btn btn--back" v-if="leftBtnType === 'icon'"></span>
    </div>

    <div class="navbar__content">
      <span v-if="titleType === 'text'">{{ title || defaultTitle }}</span>
      <img v-if="titleType === 'image'" :src="titleImage" alt="">
    </div>

    <div class="navbar__right" :class="{ hide: rightBtnVisible === false}" @click="rightBtnAction">
      <span class="btn btn--image" v-if="rightBtnType === 'image'"><img src="" alt=""></span>
      <span class="btn btn--text" v-if="rightBtnType === 'text'">{{ rightBtnText }}</span>
      <span class="btn btn--back" v-if="rightBtnType === 'icon'"></span>
    </div>
    <div class="onepx" :class="{ hide: borderBottom === false}"></div>
  </nav>
</template>

<script>
/* eslint-disable */
  export default {
    name: 'NavbarView',
    data() {
      return {
        defaultTitle: document.title,
      }
    },

    props: {
      visible: {
        type: Boolean,
        required: false,
        default: true
      },
      leftBtnVisible: {
        type: Boolean,
        required: false,
        default: true,
      },
      leftBtnCallback: {
        type: Function,
        required: false,
      },
      rightBtnVisible: {
        type: Boolean,
        required: false,
        default: true,
      },
      rightBtnCallback: {
        type: Function,
        required: false,
      },
      rightBtnText: {
        type: String,
        required: false,
        default: '关闭',
      },
      fixed: {
        type: Boolean,
        required: false,
        default: true
      },
      title: {
        type: String,
        required: false,
        default: document.title,
      },
      titleType: {
        type: String,
        required: false,
        default: 'text',
      },
      leftBtnType: {
        type: String,
        required: false,
        default: 'icon',
      },
      rightBtnType: {
        type: String,
        required: false,
        default: 'text',
      },
      titleImage: {
        type: String,
        required: false,
        default: 'https://b-stg.pingan.com.cn/bbc/static/images/pabank-logo2.png',
      },
      backgroundColor: {
        type: String,
        required: false,
        default: '#ffffff',
      },
      textColor: {
        type: String,
        required: false,
        default: '#f37938',
      },
      fontSize: {
        type: String,
        required: false,
        default: '18px',
      },
      borderBottom: {
        type: Boolean,
        required: false,
        default: true,
      }
    },

    methods: {
      isKDAPP() {
        return (window.aladdin && !!window.navigator.userAgent.toLowerCase().match('paebank'))
      },

      isFun(val) {
        return typeof val === 'function' ? true : false
      },

      leftBtnAction() {
        if (this.isFun(this.leftBtnCallback)) {
          this.leftBtnCallback()
          return
        }

        if (this.isKDAPP()) {
          window.aladdin.navigator.back()
          return
        }

        window.history.back()
      },

      rightBtnAction() {
        if (!this.isFun(this.rightBtnCallback)) {
          return
        }

        this.rightBtnCallback()
      }
    },
    created() {
      if (this.isKDAPP()) {
        const settings = {
          // 'title': this.title || document.title,
          // 'color': this.textColor,
          // 'leftButtonVisible': this.leftBtnVisible,
          // 'leftButtonCallback': this.leftButtonCallback,

          // 'rightButtonVisible': this.rightBtnVisible,
          // 'rightButtonText': this.rightButtonText || '关闭',
          // 'rightButtonCallback': this.rightButtonCallback,

          // 'backgroundColor': this.backgroundColor,
          // 'fontSize': this.fontSize,

          // 'leftButtonVisible': true,
          // 'leftButtonText': this.leftButtonText || '',
          // 'rightButtonVisible': true,

          'title': this.title !== '' ? this.title : document.title,
          'color': this.textColor,

          'leftButtonVisible': this.leftBtnVisible || true,
          'leftButtonText': this.leftBtnText || '',

          // 在口袋，始终打开导航右边 '关闭' 按钮
          'rightButtonVisible': true,
          'rightButtonText': this.rightBtnText || '关闭',
        }

        // if (this.isFun(this.leftBtnCallback)) {
        //   settings.leftButtonCallback = () => {
        //     this.leftBtnCallback()
        //   }
        // }

        if (this.isFun(this.rightBtnCallback)) {
          settings.rightButtonCallback = () => {
            this.rightBtnCallback()
          }
        } else {
          settings.rightButtonCallback = () => {
            window.aladdin.navigator.backTop()
          }
        }

        // KDAPP 在页面加载完成时候才会去取 document.title 当做 title
        // 如果你在页面未加载完成去设置头部，有可能会被口袋的 navigator.forward 行为覆盖
        // 所以这里加了，页面加载完成的监听！
        window.addEventListener('load', () => {
          window.aladdin.header.config(settings)
        }, false)
      }
    },
    mounted() {
      if (this.visible) {
        document.body.style.paddingTop = '46px'
      }
    }
  }
</script>

<style scoped lang="sass">
  .fixed
    position: fixed !important
    top: 0
    left: 0
    z-index: 99999

  .show
    display: block

  .hide
    display: none

  .onepx
    content: " "
    position: absolute
    left: 0
    bottom: 0
    right: 0
    height: 1px
    border-bottom: 1px solid #c7c7c7
    color: #c7c7c7
    transform-origin: 0 100%
    transform: scaleY(0.5)

  .navbar
    position: relative
    height: 46px
    width: 100%
    background: #fff
    overflow: hidden
    line-height: 46px
    font-size: 17px
    display: flex
    color: #f37938
    font-weight: 400

    > div
      height: 100%
      text-align: center
      color: inherit

    &__left,
    &__right
      position: absolute
      top: 0
      padding: 0 15px
      min-width: 46px

    &__left
      left: 0

      > .btn
        text-align: left

    &__right
      right: 0

      > .btn
        text-align: right

    &__content
      flex-grow: 2
      font-size: 17px
      font-size: inherit

      > img
        display: block
        border: 0
        height: 60%
        margin: auto
        position: absolute
        top: 50%
        left: 50%
        transform: translate(-50%, -50%)

  .btn
    min-height: 24px
    min-width: 24px
    background: transparent
    display: block
    color: inherit

    &--text
      font-size: 14px

    &--back
      width: 42px
      position: absolute
      left: 50%
      top: 50%
      height: 100%
      transform: translate3d(-50%, -50%, 0)
      margin-left: -15px

    &--back:after
      display: block
      content: ""
      position: absolute
      top: 50%
      left: 50%
      width: 11px
      height: 11px
      border-top: 2px solid
      border-left: 2px solid
      border-color: inherit
      transform: translate(-50%, -50%) rotate(-45deg)

</style>