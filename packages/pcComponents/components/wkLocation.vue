<template>
  <div class="w_100">
    <div class="w_100 flex">
      <p
        class="ellipsis flex1 cs_p"
        @click="onModalVisible"
      >
        {{ isLoading ? "定位中..." : modelValue.address || "暂无定位信息" }}
      </p>
      <div class="location-btn h_100 flex">
        <span
          v-if="isEdit"
          class="h_100 cs_p"
          @click="onModalVisible"
        >点击获取定位</span
        >
        <compass-outlined />
      </div>
    </div>
    <wk-modal
      v-model:visible="isModalVisible"
      :title="isEdit ? '请选择定位' : '定位信息'"
      :footer="null"
    >
      <div
        ref="locationModalMapRef"
        class="location-modal-map relative"
      ></div>
      <div
        v-if="isEdit"
        class="flex flex-right mg-t_1"
      >
        <wk-button
          type="primary"
          @click="onConfirmLocation"
        >
          确认
        </wk-button>
      </div>
    </wk-modal>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, nextTick, onBeforeUnmount } from "vue";
import { CompassOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import { useAPI, useMap } from "@lc/useHooks";
import { LocationValue } from "lc/types";

const props = defineProps<{
  value: LocationValue | null;
  isEdit: boolean;
}>();
const emit = defineEmits<{
  (e: "update:value", value: LocationValue): void;
}>();

const modelValue = ref<LocationValue>({
  longitude: props.value?.longitude || 0,
  latitude: props.value?.latitude || 0,
  address: props.value?.address || "",
});
watch(
  () => props.value,
  () => {
    if (props.value) {
      modelValue.value.longitude = props.value?.longitude;
      modelValue.value.latitude = props.value?.latitude;
      modelValue.value.address = props.value?.address;
    }
  }
);
const isLoading = ref(false);

const { getLocationApi, getAddress } = useAPI();
const { createMap } = useMap();
const mapInstance: any = ref(null);
const locationModalMapRef = ref<HTMLElement | null>(null);
const mapMovingFn = () => {
  mapInstance.value.getCenter();
  if (centerMarker.value) {
    centerMarker.value.setPosition(mapInstance.value.getCenter());
  }
};
const modalLocationInfo = ref<LocationValue>(); // 暂存
const mapEndFn = async () => {
  const { lng, lat } = mapInstance.value.getCenter();
  const address: any = await getAddress([lng, lat]);
  if (modalLocationInfo.value) {
    modalLocationInfo.value.longitude = lng;
    modalLocationInfo.value.latitude = lat;
    modalLocationInfo.value.address = address.detailAddress;
    openInfoWindow();
  }
};
onBeforeUnmount(() => {
  if (mapInstance.value) {
    mapInstance.value.onEvent("mapmove", mapMovingFn, true);
    mapInstance.value.onEvent("moveend", mapEndFn, true);
  }
});
const centerMarker = ref();
// 初始化地图实例
const initMapInstance = (mapDom: HTMLElement) => {
  if (!mapInstance.value) {
    mapInstance.value = createMap(mapDom, {
      center: [
        modalLocationInfo.value?.longitude || 104.066301,
        modalLocationInfo.value?.latitude || 30.572961,
      ],
      zoom: 14,
      dragEnable: props.isEdit,
    });
    mapInstance.value.onEvent("mapmove", mapMovingFn);
    mapInstance.value.onEvent("moveend", mapEndFn);
    centerMarker.value = mapInstance.value.addMarker([
      modalLocationInfo.value?.longitude || 104.066301,
      modalLocationInfo.value?.latitude || 30.572961,
    ]);
  }
};
// 初始化定位信息
const initLocation = async (): Promise<LocationValue> => {
  // 有经纬度但没有具体位置信息，则调用逆编码获取具体位置信息
  if (modelValue.value.longitude && modelValue.value.latitude && !modelValue.value.address) {
    isLoading.value = true;
    const address: any = await getAddress([
      Number(modelValue.value.longitude),
      Number(modelValue.value.latitude),
    ]);
    isLoading.value = false;
    return {
      longitude: modelValue.value.longitude,
      latitude: modelValue.value.latitude,
      address: address.detailAddress,
    };
  }
  // 既没经纬度又没位置信息，则调用api获取当前定位
  if (!modelValue.value.longitude && !modelValue.value.latitude && !modelValue.value.address) {
    isLoading.value = true;
    try {
      const location: any = await getLocationApi();
      const address: any = await getAddress(location);
      isLoading.value = false;
      return {
        longitude: location[0],
        latitude: location[1],
        address: address.detailAddress,
      };
    } catch (e) {
      message.warning("定位失败，请手动选择");
      console.log(e);
      isLoading.value = false;
      return {
        longitude: "",
        latitude: "",
        address: "",
      };
    }
  }
  return {
    ...modelValue.value,
  };
};
const isModalVisible = ref(false);
initLocation().then((data) => {
  modelValue.value = { ...data };
  modalLocationInfo.value = { ...data };
  emit("update:value", { ...modelValue.value });
});

const openInfoWindow = async () => {
  if (modalLocationInfo.value?.address) {
    mapInstance.value.createInfoWindow(
      `<div style="width:200px; white-space: normal">${modalLocationInfo.value?.address}</div>`,
      [modalLocationInfo.value?.longitude, modalLocationInfo.value?.latitude]
    );
  } else if (modalLocationInfo.value?.longitude && modalLocationInfo.value?.latitude) {
    const address: any = await getAddress([
      Number(modalLocationInfo.value.longitude),
      Number(modalLocationInfo.value.latitude),
    ]);
    modalLocationInfo.value.address = address.detailAddress;
    openInfoWindow();
  }
};

const onModalVisible = async () => {
  isModalVisible.value = !isModalVisible.value;
  await nextTick();
  if (locationModalMapRef.value) {
    if (!mapInstance.value) {
      initMapInstance(locationModalMapRef.value);
    } else {
      mapInstance.value.map.setStatus({
        dragEnable: props.isEdit,
      });
    }
    openInfoWindow();
  }
};

const onConfirmLocation = () => {
  if (modalLocationInfo.value) {
    modelValue.value = { ...modalLocationInfo.value };
    isModalVisible.value = false;
    emit("update:value", { ...modelValue.value });
  }
};
</script>

<style lang="less" scoped>
.location {
  &-btn {
    height: 32px;
    line-height: 32px;
    color: #006cc6;
  }
  &-icon {
    .iconfont {
      font-size: 30px;
    }
    z-index: 1000;
  }
}
.location-modal-map {
  height: 400px;
}
</style>
