<template>
  <!-- 滑块验证容器 -->
  <div class="silder-range" :class="rangeStatus?'success':''">
    <!-- 滑块 -->
    <i @mousedown="rangeMove" :class="rangeStatus?successIcon:startIcon" v-show="!rangeStatus"></i>
    <!-- 显示文字 -->
    {{rangeStatus?successText:startText}}
  </div>
</template>

<script>
export default {
  props: {
    // 成功图标
    successIcon: {
      type: String,
      default: "el-icon-success"
    },
    // 成功文字
    successText: {
      type: String,
      default: "验证成功"
    },
    // 开始的图标
    startIcon: {
      type: String,
      default: "el-icon-d-arrow-right"
    },
    // 开始的文字
    startText: {
      type: String,
      default: "拖动滑块到最右侧"
    }
  },
  name: "SilderVerify",
  data() {
    return {
      rangeStatus:'',

    };
  },
  methods: {
    rangeMove(e) {
      if (e.button !== 0) {
        return; // 如果不是鼠标左键按下，则不执行后续操作
      }

      let ele = e.target;
      let startX = e.clientX;
      let eleWidth = ele.offsetWidth;
      let parentWidth = ele.parentElement.offsetWidth;
      let MaxX = parentWidth - eleWidth;

      if (this.rangeStatus) {
        return false;
      }

      let isDragging = true;

      const handleMouseMove = (e) => {
        if (!isDragging) {
          return;
        }

        let endX = e.clientX;
        this.disX = endX - startX;
        if (this.disX <= 0) {
          this.disX = 0;
        }
        if (this.disX >= MaxX) {
          this.disX = MaxX;
          isDragging = false; // 停止拖动
          this.rangeStatus = true;
          this.$emit("success", this.rangeStatus);
        }
        ele.style.transition = '.1s all';
        ele.style.transform = 'translateX(' + this.disX + 'px)';
        e.preventDefault();
      }

      const handleMouseUp = () => {
        isDragging = false; // 停止拖动
        if (!this.rangeStatus) {
          ele.style.transition = '.5s all';
          ele.style.transform = 'translateX(0)';
          this.$emit("failed", this.rangeStatus);
        }

        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      }

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
  }
};
</script>

<style scoped>
.silder-range {
  background-color: #e3e4e6;
  position: relative;
  transition: 1s all;
  user-select: none;
  color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px; /* 滑块验证容器的高度 */
  width: 270px; /* 滑块验证容器的宽度 */
  border-radius: 5px; /* 边框圆角半径 */
}
.silder-range i {
  position: absolute;
  left: 0;
  width: 40px; /* 滑块的宽度 */
  height: 100%; /* 滑块的高度 */
  color: #919191;
  background-color: #fff;
  border: 1px solid #bbb;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}
.silder-range.success {
  background-color: #7AC23C;
  color: #fff;
}
.silder-range.success i {
  color: #7AC23C;
}
</style>
