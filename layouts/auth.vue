<template>
  <div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import {defineProps} from 'vue'

defineProps(['layout'])
</script>