<template>
  <div class="threejs-container" v-loading="loading" element-loading-text="拼命加载中..." ref="tvCon"
       element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "3-three-view"
});
</script>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import ThreeBase from './three-base.js'

const threeView = ref(null);
const loading = ref(true);
const props = defineProps({
  // 场景纹理url
  // sceneUrl: {
  //   type: String,
  //   required: true
  // },
  // 模型url
  modelUrl: {
    type: String
  },
  // 是否自动旋转
  autoRotate: {
    type: Boolean,
    default: false
  },
  // 生成的canvas是否铺满浏览器
  isFullBrowser: {
    type: Boolean,
    default: true
  }
});

watch(
  () => props.modelUrl,
  val => {
    threeView.value.loadModel(val);
    loading.value = false;
  },{deep: true}
);

watch(
  () => props.autoRotate,
  val => {
    threeView.value.controlsRotate(val);
    loading.value = false;
  },{deep: true}
);


const tvCon = ref(null); // ?
onMounted(() => {
  // vue3中的$el属性已经被废弃，使用ref获取dom元素
  threeView.value = new ThreeBase(tvCon.value, {
    modelUrl: props.modelUrl,
    autoRotate: props.autoRotate,
    isFullBrowser: props.isFullBrowser,
  });
  loading.value = false;
  });

</script>
<style lang="scss">
.threejs-container {
  width: 100%;
  height: 100%;
  cursor: grab;
}
</style>
