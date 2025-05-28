<template>
    <div class="reviews">
        <h3>Reviews</h3>
        <div v-if="reviews.length === 0" class="no-reviews">-- No reviews --</div>
        <div v-else class="review-list">
            <div v-for="review in reviews" :key="review.id" class="review">
                <div class="review-header">
                    <span class="review-date">{{ review.date }}</span>
                    <span class="review-city">{{ review.city }}</span>
                </div>
                <div class="review-description">{{ review.description }}</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useBusinessStore } from '../stores/business'

const businessStore = useBusinessStore()
const reviews = computed(() => businessStore.currentReviews)
</script>

<style scoped>
.reviews {
    margin-top: 24px;
    padding: 16px;
    background: var(--color-background-panel);
    border-radius: 12px;
}

.review-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.review {
    padding: 12px;
    border-radius: 8px;
    background: #f8f8f8;
}

.review-header {
    font-size: 14px;
    color: #888;
    margin-bottom: 4px;
    display: flex;
    gap: 12px;
}

.review-description {
    font-size: 16px;
    color: var(--color-foreground-base);
}

.no-reviews {
    color: #aaa;
    font-style: italic;
}
</style>