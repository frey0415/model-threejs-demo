<script setup lang="ts">
import {ref} from "vue";
import { Plus } from "@element-plus/icons-vue";
import ThreeView from "./components/three/threeView.vue";

const modelUrl = ref('');
const modelFile = ref('');
const modelFileType = ref('');
const handle3DFileChange = ({ raw }) => {
  console.log(raw, "raw");
  modelFile.value = raw;
  modelUrl.value = `${URL.createObjectURL(raw)}.${raw.name.substring(raw.name.lastIndexOf(".") + 1)}`;
  modelFileType.value = raw.name.substring(raw.name.lastIndexOf(".") + 1);
};
</script>

<template>
  <el-card
      key="model"
      class="model"
      shadow="hover">
    <div class="threeCon" v-if="modelUrl">
      <div class="delda">
        <el-upload accept=".max,.rar,.zip,.fbx,.skp,.glb,.3dm,.gltf"
                   action="#"
                   :show-file-list="false"
                   :on-change="handle3DFileChange">
          <span @click="">替换</span>
        </el-upload>
        <!--                                <span @click="deleteChartlet(item,index)">del</span>-->
      </div>
      <ThreeView
          v-if="modelFileType=='gltf' || modelFileType=='obj' || modelFileType=='fbx'"
          :modelUrl="modelUrl" :autoRotate="false" />
      <img v-else src=";" alt="不支持预览的模型格式，如要预览，请尝试将其转换为gltf/obj/fbx格式。">
    </div>
    <el-upload
        class="avatar-uploader"
        action="#"
        :show-file-list="false"
        :on-change="handle3DFileChange"
        v-else
    >
      <el-icon class="avatar-uploader-icon">
        <Plus />
      </el-icon>
      <template #tip>
        <div class="el-upload__tip">
          请上传 3Dmax/SU 文件
        </div>
      </template>
    </el-upload>

  </el-card>
</template>

<style lang="scss" scoped>



.avatar-uploader {
  width: 100%;

  :deep(.el-upload) {
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
    display: inline;
  }
}


.el-icon {
  &.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100%;
    height: 600px;
    text-align: center;
    border: 1px dashed #266FE8;
  }
}

.model {
  position: relative;
  min-height: 85vh;
  width: 800px;
  margin: 50px auto;

  .threeCon {
    width: 100%;
    height: 600px;
    border: 1px dashed #266FE8;
    position: relative;

    .delda {
      position: absolute;
      bottom: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.6);
      transition: all 0.5s;
      display: block;
      width: 100%;
      color: white;
      text-align: center;
      z-index: 100;

      .el-upload {
        width: 100%; // 暂不清楚为何失效
        span {
          display: inline-block;
          width: 100%;
          text-align: center;
          cursor: pointer;
          font-size: 12px;
          line-height: 30px;
        }
      }
    }
  }
}
</style>
