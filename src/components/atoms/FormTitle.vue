<template>
    <div class="form-title">
        <slot />
    </div>
</template>

<script setup>
// No props needed, just slot for content
</script>

<style scoped>
.form-title {
    padding-top: 8px;
    padding-left: 4px;
    color: var(--color-foreground-base);
    font-family: Avenir, sans-serif;
    font-size: 12px;
    font-weight: 500;
    line-height: 18px;
}
</style>