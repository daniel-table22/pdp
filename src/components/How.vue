<template>
    <div class="how">
        <Header class="header">How it works</Header>
        <img class="diagram" :src="diagramSrc" alt="How it works" />
        <div class="allergies body">
            <hr>
            Travel plans? We're flexible, skip or cancel anytime
        </div>
    </div>
</template>

<script setup>
import Header from './atoms/Header.vue'
import { computed } from 'vue'
import { useBusinessStore } from '../stores/business'
import wineDesktop from '@/assets/images/howItWorks-beverageClub-desktop.png'
import mealDesktop from '@/assets/images/howItWorks-mealKit-desktop.png'
import retailDesktop from '@/assets/images/howItWorks-specialtyBox-desktop.png'

const businessStore = useBusinessStore()
const currentBusiness = computed(() => businessStore.currentBusiness)

const diagramSrc = computed(() => {
    switch (currentBusiness.value?.businessType) {
        case 'wine':
            return wineDesktop
        case 'restaurant':
            return mealDesktop
        case 'shop':
            return retailDesktop
        default:
            return mealDesktop
    }
})
</script>

<style scoped>
.how {
    background: var(--Colors-background-panel, #FFF);
    padding-left: 24px;
    padding-right: 24px;
    padding-bottom: 32px;
    border-radius: var(--spacing-panel-radius);
    overflow: hidden;
}

.diagram {
    width: 100%;
    height: auto;

}

.allergies {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
    text-align: center;

    hr {
        width: 100%;
        border: 1px solid var(--Colors-border-default, #E0E0E0);
        margin-top: 16px;
        margin-bottom: 8px;
    }
}
</style>