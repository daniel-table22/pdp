<template>
    <div class="edit-row">
        <span class="label">
            <slot name="label">Label</slot>
        </span>
        <span class="value">
            <slot name="value">Value</slot>
        </span>
        <button class="edit-btn" aria-label="Edit">
            <img src="../../assets/images/edit.svg" alt="Edit" width="20" height="20" />
        </button>
    </div>
</template>

<script setup>
// No props needed, uses slots for label and value
</script>

<style scoped>
.edit-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 16px;
    border-radius: 12px;
    border: 1px solid var(--color-controls-inactive-stroke);
    background: var(--color-controls-bg, #fff);
    font-size: 18px;
    font-weight: 500;
    gap: 8px;
    box-sizing: border-box;

    margin-top: 16px;
    margin-bottom: 16px;
}

.label {
    font-weight: 700;
    font-size: 18px;
}

.value {
    font-weight: 400;
    font-size: 18px;
    color: var(--color-foreground-secondary, #888);
    margin-left: 8px;
}

.edit-btn {
    background: none;
    border: none;
    padding: 0 0 0 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
}

.edit-btn img {
    display: block;
}
</style>