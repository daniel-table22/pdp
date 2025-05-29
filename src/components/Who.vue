<template>
  <div class="who">
    <div class="left">
      <Header class="header">Who you're supporting</Header>
      <div class="content">
        <div class="description body">
          {{ currentBusiness?.supportingDescription || fallbackDescription }}
        </div>
        <div class="owner body bold">
          {{ currentBusiness?.supportingChefname || fallbackChefName }}
        </div>
      </div>
    </div>
    <div class="right">
      <img v-if="supportingMediaUrl" :src="supportingMediaUrl" :alt="supportingMedia?.alternativeText || 'Who'" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useBusinessStore } from '../stores/business'
import { getStrapiMedia } from '../utils/strapi'
import Header from './atoms/Header.vue'

const businessStore = useBusinessStore()
const currentBusiness = computed(() => businessStore.currentBusiness)
const supportingMedia = computed(() => currentBusiness.value?.supportingMedia?.[0] || null)
const supportingMediaUrl = computed(() => supportingMedia.value ? getStrapiMedia(supportingMedia.value.url) : null)

const fallbackDescription = "-- We're a group of friends who love to cook and eat. We're not chefs, but we're good at it. --"
const fallbackChefName = '-- Chef name --'
</script>

<style scoped>
.who {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  align-self: stretch;
  border-radius: var(--Spacing-pannel-radius, 12px);
  background: var(--Colors-background-panel, #FFF);
  height: 384px;
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
}

.left,
.right {
  flex: 1 1 0;
  width: 50%;
  box-sizing: border-box;
}

.left {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding-left: 24px;
  padding-right: 24px;
  padding-bottom: 32px;
}

.right {
  display: flex;
  height: 100%;
}

.owner {}
</style>