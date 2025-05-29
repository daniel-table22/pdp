<template>
    <button class="button-tertiary">
        <slot />
    </button>
</template>

<script setup>
// No props needed, just slot for content
</script>

<style scoped>
.button-tertiary {
    width: 100%;
    padding: 16px;
    border-radius: 4px;
    background: var(--color-background-panel);
    color: var(--color-foreground-base);
    font-weight: 700;
    font-size: 16px;
    border: 2px solid var(--color-foreground-horizontal-rule);
    text-align: center;
    cursor: pointer;
    text-decoration: underline;
}
</style>