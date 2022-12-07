<template>
  <LcAdd :table-name="tableName"></LcAdd>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";

const { query } = useRoute();
const tableName = query.tableName || "formTableName_9r38n6";
</script>
