<template>
  <div class="pd_1">
    <LcList
      :table-name="tableName"
      :headers="headers"
      :search-conditions="searchConditions"
    ></LcList>
  </div>
</template>

<script lang="ts" setup>
const tableName = "formTableName_d3cga7";
const headers = {
  source: "DolphinSchedule",
};
const searchConditions = {
  k_TEXT_frapmj: "123",
};
</script>
