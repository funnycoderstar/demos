<template>
  <div class="xr-editor">
    <!--按钮区-->
    <div class="nav">
      <button @click="execCommand('bold')">加粗</button>
      <button @click="execCommand('insertUnorderedList')">无序列表</button>
      <button @click="execCommand('insertHorizontalRule')">水平线</button>
      <button @click="execCommand('undo')">后退</button>
      <button @click="execCommand('insertHorizontalRule')">前进</button>
      <button @click="execCommand('formatBlock', '<p>')">段落</button>
      <button @click="createlink">链接</button>
      <button @click="insertImgLink">插入图片链接</button>
      <button class="nav_img">
        插入图片
        <input
          type="file"
          accept="image/gif, image/jpeg, image/png, image/jpg"
          @change="insertImg"
        >
      </button>
    </div>
    <!--编辑区-->
    <div class="row">
      <div class="editor" contenteditable="true" @input="print"></div>
      <div class="content">{{html}}</div>
    </div>
  </div>
</template>
<script>
// https://github.com/jaredreich/pell/blob/master/src/pell.js
// 正则表达式： https://rubular.com/
export default {
    name: 'XrEdit0r',
    data() {
      return {
        html: '',
        nowImg: '',
      }
    },
    mounted() {
        this.editor = document.querySelector('.editor');
        this.editor.addEventListener('click', this.handleClick);
    },
    methods: {
        execCommand(name, args = null) {
            document.execCommand(name, false, args);
        },
        print() {
            this.html = document.querySelector('.editor').innerHTML;
        },
        createlink() {
            let url = window.prompt('请输入链接地址');
            if(url) {
                this.execCommand('createLink', url);
            }
        },
        insertImgLink() {
            
            let url = window.prompt('请输入图片地址');
            if(url) {
                this.execCommand('insertImage', url);
            }
        },
        insertImg(e) {
          let reader = new FileReader();
          let file = e.target.files[0];
          reader.onload = () => {
              let base64Img = reader.result;
              this.execCommand('insertImage', base64Img);
              document.querySelector('.nav_img input').value = '';
          }
          reader.readAsDataURL(file);
        },
        handleClick(e) {
            if (
                e.target &&
                e.target.tagName &&
                e.target.tagName.toUpperCase() === 'IMG'
            ) {
                this.handleClickImg(e.target);
            }
        },

        handleClickImg(img) {
            this.nowImg = img;
            this.showOverlay();
        },
        showOverlay() {
            // 添加蒙层
            this.overlay = document.createElement('div');
            this.editor.appendChild(this.overlay);
            // 定位蒙层和大小
            this.repositionOverlay();
        },
        repositionOverlay() {
            let imgRect = this.nowImg.getBoundingClientRect();
            let editorRect = this.editor.getBoundingClientRect();
            // 设置蒙层宽高和位置
            Object.assign(this.overlay.style, {
                position: 'absolute',
                top: `${imgRect.top - editorRect.top + this.editor.scrollTop}px`,
                left: `${imgRect.left -
                editorRect.left -
                1 +
                this.editor.scrollLeft}px`,
                width: `${imgRect.width}px`,
                height: `${imgRect.height}px`,
                boxSizing: 'border-box',
                border: '1px dashed red'
            });
            // 添加四个顶点拖拽框
            this.createBox();
        },
        createBox() {
            this.boxes = [];
            this.addBox('nwse-resize'); // top left
            this.addBox('nesw-resize'); // top right
            this.addBox('nwse-resize'); // bottom right
            this.addBox('nesw-resize'); // bottom left
            this.positionBoxes(); // 设置四个拖拽框位置
        },
        addBox(cursor) {
            const box = document.createElement('div');
            Object.assign(box.style, {
                position: 'absolute',
                height: '12px',
                width: '12px',
                backgroundColor: 'white',
                border: '1px solid #777',
                boxSizing: 'border-box',
                opacity: '0.80'
            });
            box.style.cursor = cursor;
            box.addEventListener('mousedown', this.handleMousedown);  // 顺便添加事件
            this.overlay.appendChild(box);
            this.boxes.push(box);
        },
        positionBoxes() {
            let handleXOffset = `-6px`;
            let handleYOffset = `-6px`;
            [{ left: handleXOffset, top: handleYOffset },
            { right: handleXOffset, top: handleYOffset },
            { right: handleXOffset, bottom: handleYOffset },
            { left: handleXOffset, bottom: handleYOffset }].forEach((pos, idx) => {
                Object.assign(this.boxes[idx].style, pos);
            });
        },

        handleMousedown(e) {
            this.dragBox = e.target;
            this.dragStartX = e.clientX;
            this.preDragWidth = this.nowImg.width;
            this.setCursor(this.dragBox.style.cursor);
            document.addEventListener('mousemove', this.handleDrag);
            document.addEventListener('mouseup', this.handleMouseup);
        },
        handleDrag(e) {
            // 计算水平拖动距离
            const deltaX = e.clientX - this.dragStartX;
            // 修改图片大小
            if (this.dragBox === this.boxes[0] || this.dragBox ===     this.boxes[3]) { // 左边的两个框
                this.nowImg.width = Math.round(this.preDragWidth - deltaX);
            } else { // 右边的两个框
                this.nowImg.width = Math.round(this.preDragWidth + deltaX);
            }
            // 同时修改蒙层大小
            this.repositionOverlay();
        },
        handleMouseup() {
            this.setCursor('');
            // 拖拽结束移除事件监听
            document.removeEventListener('mousemove', this.handleDrag);
            document.removeEventListener('mouseup', this.handleMouseup);
        },
        setCursor(value) {
            // 设置鼠标样式
            [document.body, this.nowImg].forEach(el => {
                el.style.cursor = value;
            });
        }


    }
}
</script>
<!--全部样式就这些，这里就都先给出来了-->
<style lang="less">
.xr-editor {
  margin: 50px auto;
  width: 1000px;
  .nav {
    display: flex;
    button {
      cursor: pointer;
    }
    &_img {
      position: relative;
      input {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0;
      }
    }
  }
  .row {
    display: flex;
    width: 100%;
    height: 300px;
  }
  .editor {
    flex: 1;
    position: relative;
    margin-right: 20px;
    padding: 10px;
    outline: none;
    border: 1px solid #000;
    overflow-y: scroll;
    img {
      max-width: 300px;
      max-height: 300px;
      vertical-align: middle;
    }
  }
  .content {
    flex: 1;
    border: 1px solid #000;
    word-break: break-all;
    word-wrap: break-word;
    overflow: scroll;
  }
}
</style>