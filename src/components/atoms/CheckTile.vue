<template>
    <div class="check-tile" :class="{ selected }">
        <div class="icon">
            <slot name="icon"><span class="icon-default">👤</span></slot>
        </div>
        <div class="info">
            <div class="title form-primary">
                <slot name="title">{{ title }}</slot>
            </div>
            <div class="price form-secondary">
                <slot name="price">{{ price }}</slot>
            </div>
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
.check-tile {
    display: flex;
    align-items: center;
    gap: 12px;
    border: 2px solid var(--color-controls-inactive-stroke);
    background: var(--color-controls-bg);
    border-radius: 16px;
    padding: 16px 20px;
    min-width: 180px;
    min-height: 80px;
    transition: border-color 0.2s;
}

.check-tile.selected {
    border-color: var(--color-controls-accent-primary);
}

.icon {
    font-size: 24px;
}

.icon-default {
    font-size: 24px;
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

.price {
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