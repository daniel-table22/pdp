<template>
    <div class="check-tile" :class="{ selected }" @click="$emit('click')">
        <div class="tile-top">
            <div class="icon">
                <slot name="icon">
                    <span v-if="isPickup" class="icon-svg"><img src="../../assets/images/car.svg" alt="Car" /></span>
                    <span v-else-if="isDelivery" class="icon-svg"><img src="../../assets/images/home.svg"
                            alt="Home" /></span>
                    <span v-else-if="isShipping" class="icon-svg"><img src="../../assets/images/plane.svg"
                            alt="Plane" /></span>
                </slot>
            </div>
            <div class="checkmark">
                <span v-if="selected" class="circle selected">✔</span>
                <span v-else class="circle"></span>
            </div>
        </div>
        <div class="info">
            <div class="title form-primary">
                <slot name="title">{{ title }}</slot>
            </div>
            <div class="price form-secondary">
                <slot name="price">{{ price }}</slot>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    title: String,
    price: String,
    selected: Boolean
})

const isDelivery = computed(() => {
    return props.title && props.title.toLowerCase() === 'delivery'
})

const isPickup = computed(() => {
    return props.title && props.title.toLowerCase() === 'pickup'
})

const isShipping = computed(() => {
    return props.title && props.title.toLowerCase() === 'shipping'
})
</script>

<style scoped>
.check-tile {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 16px;
    border-radius: 12px;
    border: 2px solid var(--color-controls-inactive-stroke);
    background: var(--color-controls-bg, #fff);
    min-width: 146px;
    min-height: 110px;
    box-sizing: border-box;
    transition: border-color 0.2s;
    cursor: pointer;
    flex: 1 0 0;
    align-self: stretch;
    gap: 8px;
}

.check-tile.selected {
    border-color: var(--color-controls-accent-primary);
}

.tile-top {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 8px;
}

.icon {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    min-width: 24px;
    min-height: 24px;
}

.icon-svg img {
    width: 24px;
    height: 24px;
    display: block;
}

.checkmark {
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
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

.info {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 0;
}

.title {
    font-size: 16px;
    font-weight: 500;
    line-height: 1.2;
    color: var(--color-foreground-base);
    word-break: break-word;
}

.price {
    font-size: 14px;
    color: var(--color-foreground-secondary);
    word-break: break-word;
}
</style>