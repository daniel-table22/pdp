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
      <img :src="supportingMediaUrl || defaultImage" :alt="supportingMedia?.alternativeText || 'Who'" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useBusinessStore } from '../stores/business'
import { getStrapiMedia } from '../utils/strapi'
import Header from './atoms/Header.vue'
import defaultImage from '../assets/images/who.jpg'

const businessStore = useBusinessStore()
const currentBusiness = computed(() => businessStore.currentBusiness)
const supportingMedia = computed(() => {
  console.log('Current Business:', currentBusiness.value)
  console.log('Supporting Media:', currentBusiness.value?.supportingMedia)
  return currentBusiness.value?.supportingMedia
})
const supportingMediaUrl = computed(() => {
  const mediaArr = currentBusiness.value?.supportingMedia;
  const mediaObj = Array.isArray(mediaArr) ? mediaArr[0] : mediaArr;
  const url = mediaObj?.url
    ? getStrapiMedia(mediaObj.url)
    : null;
  console.log('Supporting Media Image URL:', url);
  return url;
})

const fallbackDescription = '-- Placeholder --'
const fallbackChefName = '-- Placeholder --'
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