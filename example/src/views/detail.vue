<template>
  <LcDetail
    :id="params.id"
    :table-name="tableName"
  ></LcDetail>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";

const { params, query } = useRoute();
const tableName = query.tableName || "formTableName_9r38n6";
</script>
