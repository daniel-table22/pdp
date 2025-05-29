<template>
    <div class="variant-group">
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
defineProps({
    title: String,
    description: String,
    image: String // full URL
})
</script>

<style scoped>
.variant-group {
    border: 2px solid var(--color-controls-accent-primary);
    background: var(--color-controls-bg);
    border-radius: 16px;
    padding: 16px 20px;
    min-width: 320px;
    max-width: 420px;
    display: flex;
    flex-direction: column;
    gap: 12px;
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
    /* Typography handled by .form-secondary */
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