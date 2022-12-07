<template>
  <iframe :src="getIframeUrl()"></iframe>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";

const Route = useRoute();

const getIframeUrl = () => {
  const { url, urlQuery } = Route.query;
  if (url.indexOf("?") > -1) {
    return `${url}&${urlQuery}`;
  }
  return `${url}?${urlQuery}`;
};
</script>

<style lang="less" scoped>
iframe {
  height: 100%;
  width: 100%;
  border: none;
}
</style>
