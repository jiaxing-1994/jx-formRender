<template>
  <div class="pd_1">
    <LcList
      :table-name="tableName"
      :headers="headers"
      :search-conditions="searchConditions"
      @onToAdd="onToAdd"
      @onToDetail="onToDetail"
    >
      <template #operateLeft>
        <wk-button>自定义左边</wk-button>
      </template>
      <template #operateRight>
        <wk-button>自定义右边</wk-button>
        <wk-button>自定义右边2</wk-button>
      </template>
      <template #bodyCellActions>
        <a class="mg-r_1 red">自定义1</a>
        <a class="mg-r_1 red">自定义2</a>
      </template>
    </LcList>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
const tableName = "formTableName_9r38n6";
const headers = {
  source: "DolphinSchedule",
};
const searchConditions = {};
const { push } = useRouter();
const onToAdd = () => {
  push("/add");
};
const onToDetail = (id: string) => {
  push(`/detail/${id}`);
};
</script>
