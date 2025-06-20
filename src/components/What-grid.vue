<template>
    <div class="what-you-get">
        <div class="top">


            <div class="top-left">
                <Header class="header">{{ currentBusiness?.whatYouGetTitle || 'What you get..' }}</Header>
                <div class="spacer"></div>
                <div class="bottom-section">
                    <div class="controls">
                        <div class="readmore" v-if="visibleCards[0]?.menuupload" @click="openMenuLightbox">
                            View menu
                        </div>
                        <div class="readmore" v-else>
                            Vibey menu
                        </div>
                        <div class="chevron chevron-left" @click="prevMenu"><img
                                src="../assets/images/chevronleft.svg" /></div>
                        <div class="chevron chevron-right" @click="nextMenu"><img
                                src="../assets/images/chevronright.svg" /></div>
                    </div>
                </div>
            </div>
            <div class="top-right">
                <div class="carousel-track" :class="slideDirection" :key="currentMenuIndex">
                    <div v-for="(card, idx) in visibleCards" :key="idx" class="carousel-card">
                        <div class="carousel-image" :style="{ backgroundImage: `url(${card.image})` }"></div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="showMenuLightbox" class="menu-lightbox-overlay" @click.self="closeMenuLightbox">
            <div class="menu-lightbox">
                <button class="close-btn" @click="closeMenuLightbox">Close</button>
                <img src="../assets/images/menu.jpg" alt="Menu" class="menu-image" />
            </div>
        </div>
        <div class="bottom">
            <div class="bottom-left">
                <Subheader class="subheader">
                    {{ currentBusiness?.wygsub || '-- placeholder --' }}
                </Subheader>
                <div class="description body">
                    {{ visibleCards[0]?.caption || '-- Placeholder perk --' }}
                </div>
            </div>
            <div class="bottom-right">
                <Subheader class="subheader">
                    And member-only perks
                </Subheader>
                <div class="perks">
                    <div v-for="perk in currentPerks" :key="perk.id" class="perk body">
                        <img src="../assets/images/chevronleft.svg" alt="Edit" />
                        {{ perk.title }}
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
import Header from './atoms/Header.vue'
import Subheader from './atoms/Subheader.vue'

const businessStore = useBusinessStore()
const currentBusiness = computed(() => businessStore.currentBusiness)
const currentPerks = computed(() => businessStore.currentPerks)
const currentMenus = computed(() => businessStore.currentMenus)
const currentMenuIndex = ref(0)
const isSliding = ref(false)
const slideDirection = ref('')

const showMenuLightbox = ref(false)
function openMenuLightbox() { showMenuLightbox.value = true }
function closeMenuLightbox() { showMenuLightbox.value = false }

const fallbackTitle = '-- Placeholder title--'
const fallbackDescription = '-- PLaceholder subheading--'
const fallbackMenuItem = '-- Placeholder caption--'

function getMenuItemText(menu) {
    if (!menu || !Array.isArray(menu.description) || menu.description.length === 0) return fallbackMenuItem;
    const desc = menu.description[0];
    // Handle both list and paragraph types
    if (desc.type === 'list' && Array.isArray(desc.children) && desc.children.length > 0) {
        // Get the first list item text
        const firstListItem = desc.children[0];
        if (firstListItem && Array.isArray(firstListItem.children) && firstListItem.children.length > 0) {
            return firstListItem.children[0].text || fallbackMenuItem;
        }
    } else if (desc.type === 'paragraph' && Array.isArray(desc.children) && desc.children.length > 0) {
        return desc.children[0].text || fallbackMenuItem;
    }
    return fallbackMenuItem;
}

// Placeholder image (uploaded by user)
const placeholderImage = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80'

function getMenuImageUrl(menu) {
    if (menu && Array.isArray(menu.image) && menu.image.length > 0 && menu.image[0].url) {
        return menu.image[0].url;
    }
    return placeholderImage;
}

const nextMenuIndex = computed(() => {
    if (!currentMenus.value.length) return 0
    return (currentMenuIndex.value + 1) % currentMenus.value.length
})
const prevMenuIndex = computed(() => {
    if (!currentMenus.value.length) return 0
    return (currentMenuIndex.value - 1 + currentMenus.value.length) % currentMenus.value.length
})

const visibleCards = computed(() => {
    const getCard = idx => {
        const menu = currentMenus.value[idx] || {}
        return {
            image: getMenuImageUrl(menu),
            title: menu.title || '',
            caption: getMenuItemText(menu),
            menuupload: menu.menuupload || null
        }
    }
    if (slideDirection.value === 'slide-left') {
        return [getCard(currentMenuIndex.value), getCard(nextMenuIndex.value)]
    } else if (slideDirection.value === 'slide-right') {
        return [getCard(prevMenuIndex.value), getCard(currentMenuIndex.value)]
    } else {
        return [getCard(currentMenuIndex.value)]
    }
})

function slideTo(nextIdx, direction) {
    if (isSliding.value) return
    slideDirection.value = direction
    isSliding.value = true
    setTimeout(() => {
        currentMenuIndex.value = nextIdx
        isSliding.value = false
        slideDirection.value = ''
    }, 500) // match CSS duration
}

function nextMenu() {
    slideTo(nextMenuIndex.value, 'slide-left')
}
function prevMenu() {
    slideTo(prevMenuIndex.value, 'slide-right')
}
</script>

<style scoped>
.what-you-get {
    display: flex;
    flex-direction: column;
    border-radius: 12px;
    overflow: hidden;
    width: 100%;
    background-color: #ffffff;
}

.top {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    width: 100%;
    background-color: #000000;
}

.top-left {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    min-width: 0;
    color: #fff;
    height: 352px;
    position: relative;
    z-index: 1;
    padding: 12px 16px 16px;
}

.header {
    color: #fff;
}

.controls {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
    color: #fff;
    width: 100%;
    justify-content: flex-start;
}

.chevron {
    display: flex;
    cursor: pointer;


    img {
        filter: brightness(0) invert(1);
        width: 24px;
        height: 24px;
    }
}

.top-right {
    width: 532px;
    height: 354px;
    position: relative;
    background: var(--color-background-base);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.bottom {
    display: flex;
    flex-direction: row;
    gap: 32px;
    width: 100%;
    padding: 32px;
    box-sizing: border-box;
}

.bottom-left {
    flex: 8;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    min-width: 0;
}

.bottom-right {
    flex: 8;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    min-width: 0;
}

.subheader {
    width: 100%;
}

.content {
    display: flex;
    padding-bottom: 16px;
    flex-direction: column;
    align-items: flex-start;
    flex: 1 0 0;
    align-self: stretch;
}

.description {
    color: var(--color-foreground-base-alpha);
    font-size: 16px;
    line-height: 24px;
}

.perks {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    align-self: stretch;
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
    z-index: 0;
}

.carousel-track.slide-left {
    transform: translateX(-100%);
}

.carousel-track.slide-right {
    transform: translateX(100%);
}

.carousel-card {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    flex-shrink: 0;
    flex-direction: column;
}

.carousel-image {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
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

.perk {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
    color: var(--color-foreground-base-alpha);
    font-size: 16px;
    line-height: 24px;
    padding-bottom: 12px;
}

.readmore {
    flex: 1;
    font-size: 16px;
    line-height: 24px;
    font-weight: 400;

    cursor: pointer;
    padding-right: 16px;

    &:hover {
        text-decoration: underline;
    }
}

.readmore:hover {
    text-decoration: underline;
}

.menu-lightbox-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.7);
    z-index: 10000;
    display: flex;
    justify-content: center;
    align-items: flex-start;
}

.menu-lightbox {
    position: relative;
    margin-top: 72px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
    padding: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.menu-image {
    width: 754px;
    height: 1438px;
    display: block;
    border-radius: 8px;
}

.close-btn {
    position: absolute;
    top: 16px;
    right: 16px;
    background: #111;
    color: #fff;
    border: none;
    border-radius: 6px;
    padding: 8px 16px;
    font-size: 1rem;
    cursor: pointer;
    z-index: 1;
}

.spacer {
    flex: 1;
}

.bottom-section {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.caption {
    color: var(--color-foreground-invert-alpha);
    font-size: 16px;
    line-height: 24px;
}
</style>