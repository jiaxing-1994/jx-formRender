<template>
  <lc-data-list>
    <template #search="{ cpns }">
      <search-condition :cpns="cpns"></search-condition>
    </template>
  </lc-data-list>
</template>

<script lang="ts" setup>
import SearchCondition from "../components/searchCondition.vue";
</script>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "LcList",
});
</script>

<style scoped></style>
