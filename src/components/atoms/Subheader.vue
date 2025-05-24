<template>
    <div class="subheader-atom">
      <h4><slot>Subheader</slot></h4>
    </div>
  </template>
  
  <script setup>
  // No props needed, using slot for content
  </script>
  
  <style scoped>
  .subheader-atom {
    display: flex;
    align-items: center;
    min-height: 40px;
    width: 100%;
  }
  h4 {
    color: var(--color-foreground-base);
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    margin: 0;
  }
  </style> 