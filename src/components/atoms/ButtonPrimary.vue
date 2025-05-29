<template>
    <button class="button-primary">
        <slot />
    </button>
</template>

<script setup>
// No props needed, just slot for content
</script>

<style scoped>
.button-primary {
    width: 100%;
    padding: 16px;
    border-radius: 4px;
    background: var(--color-controls-accent-primary);
    color: var(--color-controls-accent-secondary);
    font-weight: 700;
    font-size: 16px;
    border: none;
    text-align: center;
    cursor: pointer;
}
</style>