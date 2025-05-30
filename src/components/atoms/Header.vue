<template>
  <div class="header-atom">
    <h3>
      <slot>-- Header --</slot>
    </h3>
  </div>
</template>

<script setup>
// No props needed, using slot for content
</script>

<style scoped>
.header-atom {
  align-items: center;
  display: flex;
  padding: 32px 0 16px 0;
  position: relative;
  width: 100%;
}

h3 {
  /* color: var(--color-foreground-base); */
}
</style>