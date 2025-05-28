<template>
    <div class="what-you-get">
        <div class="left">
            <Header class="header" />
            <div class="content">
                <Subheader class="subheader">
                    {{ currentBusiness?.whatYouGetTitle || fallbackTitle }}
                </Subheader>
                <p class="description body">
                    {{ currentBusiness?.whatYouGetDescription || fallbackDescription }}
                </p>
                <Subheader class="subheader">
                    Member perks
                </Subheader>
                <div class="perks">
                    <p v-for="perk in currentPerks" :key="perk.id" class="perk body">
                        {{ perk.title }}
                    </p>
                </div>
                <!-- <pre>currentBusiness: {{ currentBusiness }}</pre>
                <pre>currentBusiness.menus: {{ currentBusiness?.menus }}</pre>
                <pre>currentMenus: {{ currentMenus }}</pre> -->
            </div>
        </div>
        <div class="carousel">
            <div v-for="(menu, idx) in currentMenus" :key="menu.id" class="carousel-card"
                v-show="idx === currentMenuIndex">
                <div class="carousel-image" :style="{ backgroundImage: `url(${getMenuImageUrl(menu)})` }"></div>
                <div class="caption">
                    <div class="date">-- Example from March --</div>
                    <p class="caption-title">
                        {{ getMenuItemText(menu) }}
                    </p>
                </div>
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

const fallbackTitle = '-- A multi course meal --'
const fallbackDescription = '-- A rotating multi-course tasting menu featuring signature dishes and seasonal specials --'
const fallbackMenuItem = '-- Crispy daikon cakes with chili sauce, pickled lotus root salad, and shiso rice. --'

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

const carouselImageUrl = computed(() => {
    // In the future, use a menu image here if available
    // For now, use the placeholder for all menus
    return placeholderImage
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
}

.header {
    width: 100%;
    background: transparent;
}

.subheader {
    width: 100%;
}

.left {
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 394px;
    padding: 0px 24px;
    justify-content: space-between;
    align-items: flex-start;

    .content {
        display: flex;
        padding-bottom: 16px;
        flex-direction: column;
        align-items: flex-start;
        flex: 1 0 0;
        align-self: stretch;

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

            .perk {}
        }
    }
}

.carousel {
    width: 200px;
    position: relative;
    flex: 1;
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
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        width: 100%;
        height: 356.85px;
        border-radius: 12px;
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