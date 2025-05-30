<template>
    <div class="hero">
        <div class="left">
            <div class="content">
                <img v-if="logo" class="logo" :src="logoUrl" :alt="logo.alternativeText || 'Logo'" />
                <div class="title">
                    {{ currentBusiness?.heroMembershipName || fallbackTitle }}
                </div>
                <p class="description">
                    {{ currentBusiness?.membershipDescription || fallbackDescription }}
                </p>
            </div>
            <div class="rating">
                <div class="stars">
                    <span class="icon-solid-star">★</span>
                    <span class="icon-solid-star">★</span>
                    <span class="icon-solid-star">★</span>
                    <span class="icon-solid-star">★</span>
                    <span class="icon-solid-star">★</span>
                </div>
                <p class="average">
                    <!-- {{ reviewText }} -->
                    4.7 • based on 83 reviews
                </p>
            </div>
        </div>
        <div class="right">
            <div class="carousel">
                <div class="carousel-track" :class="slideDirection" :key="currentCarouselIndex">
                    <div v-for="(img, idx) in visibleImages" :key="idx" class="carousel-image"
                        :style="{ backgroundImage: `url(${img})` }"></div>
                </div>
                <div class="controls">
                    <div class="icon-outline-chevron-wrapper" @click="prevCarousel">
                        <span class="icon-outline-chevron">‹</span>
                    </div>
                    <div class="chevron-down-wrapper" @click="nextCarousel">
                        <span class="chevron-down">›</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useBusinessStore } from '../stores/business'
import { getStrapiMedia } from '../utils/strapi'

const businessStore = useBusinessStore()
const currentBusiness = computed(() => businessStore.currentBusiness)
const logo = computed(() => businessStore.currentLogo)
const currentHeroCarousel = computed(() => businessStore.currentHeroCarousel)
const currentCarouselIndex = ref(0)
const isSliding = ref(false)
const slideDirection = ref('')

const fallbackTitle = '-- Title --'
const fallbackDescription = '-- Description. --'
const reviewText = computed(() => {
    return currentBusiness.value?.reviews?.length
        ? `${currentBusiness.value.reviews.length} reviews`
        : '-- 4.7 • based on 83 reviews --'
})

const logoUrl = computed(() => logo.value ? getStrapiMedia(logo.value.url) : null)
const currentCarouselImage = computed(() => {
    if (!currentHeroCarousel.value.length) return null
    return getStrapiMedia(currentHeroCarousel.value[currentCarouselIndex.value].url)
})
const nextCarouselIndex = computed(() => {
    if (!currentHeroCarousel.value.length) return 0
    return (currentCarouselIndex.value + 1) % currentHeroCarousel.value.length
})
const prevCarouselIndex = computed(() => {
    if (!currentHeroCarousel.value.length) return 0
    return (currentCarouselIndex.value - 1 + currentHeroCarousel.value.length) % currentHeroCarousel.value.length
})
const nextCarouselImage = computed(() => {
    if (!currentHeroCarousel.value.length) return null
    return getStrapiMedia(currentHeroCarousel.value[nextCarouselIndex.value].url)
})
const prevCarouselImage = computed(() => {
    if (!currentHeroCarousel.value.length) return null
    return getStrapiMedia(currentHeroCarousel.value[prevCarouselIndex.value].url)
})

const visibleImages = computed(() => {
    if (slideDirection.value === 'slide-left') {
        return [currentCarouselImage.value, nextCarouselImage.value]
    } else if (slideDirection.value === 'slide-right') {
        return [prevCarouselImage.value, currentCarouselImage.value]
    } else {
        return [currentCarouselImage.value]
    }
})

function slideTo(nextIdx, direction) {
    if (isSliding.value) return
    slideDirection.value = direction
    isSliding.value = true
    setTimeout(() => {
        currentCarouselIndex.value = nextIdx
        isSliding.value = false
        slideDirection.value = ''
    }, 500) // match CSS duration
}

function nextCarousel() {
    slideTo(nextCarouselIndex.value, 'slide-left')
}
function prevCarousel() {
    slideTo(prevCarouselIndex.value, 'slide-right')
}

let interval = null
onMounted(() => {
    interval = setInterval(() => {
        nextCarousel()
    }, 5000)
})
onUnmounted(() => {
    if (interval) clearInterval(interval)
})
</script>

<style scoped>
.hero {
    align-items: center;
    background: var(--color-background-panel);
    display: flex;
    justify-content: space-between;
    position: relative;
    border-radius: 20px;
}

.left {
    align-items: center;
    background: var(--color-background-panel);
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: var(--spacing-panel-inner-row-gap);
    justify-content: space-around;
    padding: 0 52px;
}

.content {
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
}

.logo {
    height: 48px;
    width: 112px;
    object-fit: contain;
    mix-blend-mode: darken;
}

.title {
    color: var(--color-foreground-base);
    text-align: center;
    font-size: 24px;
    font-weight: 400;
    line-height: 32px;
}

.description {
    color: var(--color-foreground-base-alpha);
    text-align: center;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
}

.rating {
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 8px 0 0 0;
}

.stars {
    display: flex;
    gap: 2px;
}

.icon-solid-star {
    color: var(--color-foreground-yellow);
    font-size: 20px;
}

.average {
    color: var(--color-foreground-base);
    opacity: 0.5;
    font-size: 18px;
    font-weight: 400;
    line-height: 20px;
    text-align: center;
}

.right {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 628px;
}

.carousel {
    background: url('@/assets/images/hero.jpg') center/cover no-repeat;
    height: 418.67px;
    width: 100%;
    border-radius: 0 20px 20px 0;
    position: relative;
    overflow: hidden;
}

.carousel-track {
    display: flex;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    transition: transform 0.5s cubic-bezier(.55, 0, .1, 1);
    will-change: transform;
}

.carousel-track.slide-left {
    transform: translateX(-100%);
}

.carousel-track.slide-right {
    transform: translateX(100%);
}

.carousel-image {
    width: 100%;
    height: 418.67px;
    background-size: cover;
    background-position: center;
    border-radius: 0 20px 20px 0;
    flex-shrink: 0;
}

.controls {
    display: flex;
    justify-content: space-between;
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    transform: translateY(-50%);
    padding: 0 34px;
}

.icon-outline-chevron-wrapper,
.chevron-down-wrapper {
    background: var(--color-foreground-invert);
    border-radius: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    font-size: 24px;
    cursor: pointer;
}
</style>