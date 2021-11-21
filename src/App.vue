<script lang="ts">
import { defineComponent } from "vue";
import { TestTrigger } from "./triggers/test.trigger";
import { Task } from "./types/pubsub/task";

export default defineComponent({
  setup() {
    const testTrigger = new TestTrigger("parent");
    const testTriggerChild = new TestTrigger("child");
    const dependency = new Task(testTriggerChild, []);
    const testTask = new Task(testTrigger, [dependency]);

    dependency.$beforeRun(() => {
      console.log("Before dependency");
    });

    dependency.$running(() => {
      console.log("Running dependency");
    });

    dependency.$afterRun(() => {
      console.log("End dependency");
    });

    testTask.$beforeRun(() => {
      console.log("Before parent");
    });

    testTask.$running(() => {
      console.log("Running Parent");
    });

    testTask.$afterRun(() => {
      console.log("Finish Parent");
    });

    testTask.run();
  },
});
</script>


<template>
  <img
    alt="Vue logo"
    src="./assets/logo.png"
  />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
