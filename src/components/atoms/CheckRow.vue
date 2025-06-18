<template>
    <div class="check-row" :class="{ selected }">
        <div class="info">
            <div class="title form-primary">
                <slot name="title">{{ title }}</slot>
            </div>
            <div class="description form-secondary">
                <slot name="description">{{ description }}</slot>
            </div>
        </div>
        <div class="price form-primary">
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
    description: String,
    price: String,
    selected: Boolean
})
</script>

<style scoped>
.check-row {
    display: flex;
    align-items: flex-start;
    border: 2px solid var(--color-controls-inactive-stroke);
    background: var(--color-controls-bg);
    border-radius: 12px;
    padding: 14px 20px;
    gap: 16px;
    min-width: 260px;
    transition: border-color 0.2s;
}

.check-row.selected {
    border-color: var(--color-controls-accent-primary);
}

.info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.title {
    /* Typography handled by .form-primary */
}

.description {
    font-size: 14px;
    color: var(--color-foreground-base-alpha);
    word-break: break-word;
}

.price {
    margin-right: 12px;
    /* Typography handled by .form-primary */
    align-self: flex-start;
}

.checkmark {
    display: flex;
    align-items: flex-start;
    align-self: flex-start;
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