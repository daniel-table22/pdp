<template>
    <div :class="['variant-group', borderClass]">
        <div class="header">
            <div class="info">
                <div class="title form-primary">
                    <slot name="title">{{ title }}</slot>
                </div>
                <div class="description form-secondary">
                    <slot name="description">{{ description }}</slot>
                </div>
            </div>
            <slot name="image">
                <img v-if="image" class="image" :src="image" alt="Variant image" />
            </slot>
        </div>
        <div class="options">
            <slot />
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
    title: String,
    description: String,
    image: String, // full URL
    selectedIndex: Number
})
const borderClass = computed(() =>
    props.selectedIndex === 0
        ? 'variant-group-neutral'
        : 'variant-group-accent'
)
</script>

<style scoped>
.variant-group {
    border: 2px solid var(--color-foreground-horizontal-rule, rgba(0, 0, 0, 0.1));
    background: var(--color-controls-bg);
    border-radius: 16px;
    padding: 16px 20px;
    min-width: 320px;
    max-width: 420px;
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.variant-group-accent {
    border-color: var(--color-foreground-accent);
}

.header {
    display: flex;
    align-items: flex-start;
    gap: 16px;
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
    color: var(--color-foreground-secondary);
    word-break: break-word;
}

.image {
    width: 56px;
    height: 56px;
    object-fit: cover;
    border-radius: 8px;
    border: 1px solid var(--color-controls-inactive-stroke);
}

.options {
    display: flex;
    flex-direction: column;
    gap: 8px;
}
</style>