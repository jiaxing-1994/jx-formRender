<template>
  <LcDetail
    :id="params.id"
    :table-name="tableName"
  ></LcDetail>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
const tableName = "formTableName_9r38n6";
const { params } = useRoute();
</script>
