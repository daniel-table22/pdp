<template>
    <div class="what-you-get">
        <div class="left">
            <Header class="header" />
            <div class="content">
                <Subheader class="subheader" :text="currentBusiness?.whatYouGetTitle || fallbackTitle" />
                <p class="description body">
                    {{ currentBusiness?.whatYouGetDescription || fallbackDescription }}
                </p>
                <Subheader class="subheader" text="Member perks" />
                <div class="perks">
                    <p v-for="perk in currentPerks" :key="perk.id" class="perk">
                        {{ perk.title }}
                    </p>
                </div>
            </div>
        </div>
        <div class="carousel">
            <div class="carousel-card">
                <img class="carousel-image" alt="What you get" :src="whatImageUrl" />
            </div>
            <div class="caption">
                <div class="date">Example from March</div>
                <p class="caption-title">
                    {{ menuItemText }}
                </p>
            </div>
            <div class="controls">
                <div class="chevron chevron-left" @click="prevMenu">‹</div>
                <div class="chevron chevron-right" @click="nextMenu">›</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useBusinessStore } from '../stores/business'
import { getStrapiMedia } from '../utils/strapi'
import Header from './atoms/Header.vue'
import Subheader from './atoms/Subheader.vue'

const businessStore = useBusinessStore()
const currentBusiness = computed(() => businessStore.currentBusiness)
const currentPerks = computed(() => businessStore.currentPerks)
const currentMenus = computed(() => businessStore.currentMenus)
const currentMenuIndex = ref(0)

const fallbackTitle = 'A multi course meal'
const fallbackDescription = 'A rotating multi-course tasting menu featuring signature dishes and seasonal specials'
const fallbackMenuItem = 'Crispy daikon cakes with chili sauce, pickled lotus root salad, and shiso rice.'

const menuItemText = computed(() => {
    return currentMenus.value[0]?.description[0]?.children[0]?.children[0]?.text || fallbackMenuItem
})

// For now, we'll use a static image, but this could be updated to use a media field from Strapi
const whatImageUrl = computed(() => {
    return getStrapiMedia('/uploads/what.jpg')
})

const nextMenu = () => {
    if (currentMenus.value.length > 0) {
        currentMenuIndex.value = (currentMenuIndex.value + 1) % currentMenus.value.length
    }
}

const prevMenu = () => {
    if (currentMenus.value.length > 0) {
        currentMenuIndex.value = (currentMenuIndex.value - 1 + currentMenus.value.length) % currentMenus.value.length
    }
}
</script>

<style scoped>
.what-you-get {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    background: var(--color-background-panel);
    gap: 32px;
}

.left {
    display: flex;
    flex-direction: column;
    gap: 24px;
    flex: 1;
    width: 50%;
}

.header {
    width: 100%;
    background: transparent;
}

.content {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.subheader {
    width: 100%;
}

.description {
    color: var(--color-foreground-base-alpha);
    font-size: 16px;
    line-height: 24px;
}

.perks {
    display: flex;
    flex-direction: column;
    gap: 8px;
    color: var(--color-foreground-base-alpha);
    font-size: 16px;
    line-height: 20px;
}

.carousel {
    position: relative;
    width: 50%;
    background: var(--color-background-invert-panel);
    border-radius: 12px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;

    .carousel-card {
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .carousel-image {
        width: 100%;
        height: 356.85px;
        object-fit: cover;
    }

    .caption {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        background: rgba(0, 0, 0, 0.4);
        color: #fff;
        padding: 12px 16px;
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    .date {
        font-size: 14px;
        opacity: 0.6;
        white-space: nowrap;
    }

    .caption-title {
        font-size: 16px;
        line-height: 24px;
    }

    .controls {
        position: absolute;
        top: 50%;
        left: 0;
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 0 16px;
        transform: translateY(-50%);
    }

    .chevron {
        background: var(--color-foreground-invert);
        border-radius: 100px;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        cursor: pointer;
        user-select: none;
    }
}

.perk {
    margin: 0;
    padding: 4px 0;
}
</style>