<script lang="ts">
import { defineComponent } from "vue";
import { makeLayoutCollection } from "./layouts";

export default defineComponent({
  components: makeLayoutCollection().getAllComponents(),
  setup() {},
});
</script>


<template>
  <component :is="`empty`" />
</template>