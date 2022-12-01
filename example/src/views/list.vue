<template>
  <div class="pd_1">
    <LcList
      :table-name="tableName"
      :headers="headers"
      :search-conditions="searchConditions"
      @onToAdd="onToAdd"
    >
      <template #operateLeft>
        <wk-button>自定义左边</wk-button>
      </template>
      <template #operateRight>
        <wk-button>自定义右边</wk-button>
        <wk-button>自定义右边2</wk-button>
      </template>
    </LcList>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
const tableName = "formTableName_d3cga7";
const headers = {
  source: "DolphinSchedule",
};
const searchConditions = {
  k_TEXT_frapmj: "123",
};
const { push } = useRouter();
const onToAdd = () => {
  push("/add");
};
</script>
