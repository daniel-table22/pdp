<template>
    <div class="check-inline">
        <div class="title form-secondary">
            <slot name="title">{{ title }}</slot>
        </div>
        <div class="price form-secondary">
            <slot name="price">{{ price }}</slot>
        </div>
        <div class="checkmark">
            <span v-if="selected" class="circle selected">✔</span>
            <span v-else class="circle"></span>
        </div>
    </div>
</template>

<script setup>
defineProps({
    title: String,
    price: String,
    selected: Boolean
})
</script>

<style scoped>
.check-inline {
    display: flex;
    align-items: center;
    background: var(--color-controls-bg);
    padding-bottom: 14px;
    padding-top: 14px;
    gap: 12px;
    min-width: 180px;
    border-bottom: 1px solid var(--color-controls-inactive-stroke);

    &:last-child {
        border-bottom: none;
    }
}

.title {
    flex: 1;
    /* Typography handled by .form-primary */
}

.price {
    margin-right: 12px;
    /* Typography handled by .form-secondary */
}

.checkmark {
    display: flex;
    align-items: center;
}

.circle {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    border: 2px solid var(--color-controls-inactive-stroke);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: var(--color-controls-accent-secondary);
}

.selected.circle {
    background: var(--color-controls-accent-primary);
    border-color: var(--color-controls-accent-primary);
    color: var(--color-controls-accent-secondary);
}
</style>