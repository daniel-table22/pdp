<template>
    <div class="reviews-container">
        <div class="left">
            <Header class="reviews-title">Customer reviews</Header>
        </div>
        <div class="right">
            <div v-if="reviews.length === 0" class="no-reviews">-- No reviews --</div>
            <template v-else>
                <div v-for="review in reviews" :key="review.id" class="review-item">
                    <div class="review-meta bold">
                        {{ new Date(review.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' }) }}
                    </div>
                    <div class="review-text body">
                        {{ review.description }}
                    </div>
                    <div class="review-stars">
                        <span v-for="n in 5" :key="n" class="star"
                            :class="{ filled: n <= (review.stars || 4.5) }">★</span>
                    </div>
                </div>
                <a class="reviews-readmore" href="#">Read more</a>
            </template>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useBusinessStore } from '../stores/business'
import Header from './atoms/Header.vue'

const businessStore = useBusinessStore()
const reviews = computed(() => businessStore.currentReviews)
</script>

<style scoped>
.reviews-container {
    display: flex;
    border-radius: var(--spacing-panel-radius);
    background: var(--color-background-panel);
    padding-left: 24px;
    padding-right: 24px;
    padding-bottom: 24px;
    gap: 24px;
}

.left {
    width: 240px;
    min-width: 240px;
    max-width: 326px;
}

.right {
    flex: 1;
    min-width: 0;
    padding-top: 42px;
}

.review-item {
    margin-bottom: 16px;
}

.review-meta {
    font-weight: bold;
    padding-bottom: 8px;
}

.review-text {
    margin-bottom: 8px;
}

.review-stars {
    color: #FFC700;
    font-size: 16px;
    margin-bottom: 8px;
}

.star {
    color: #FFC700;
    margin-right: 2px;
}

.star.filled {
    color: #FFC700;
}

.reviews-readmore {
    color: #111;
    font-size: 1.15rem;
    text-decoration: underline;
    font-weight: 500;
    margin-top: 24px;
    display: inline-block;
}

.no-reviews {
    color: #aaa;
    font-style: italic;
}
</style>