<template>
  <div class="app">
    <div class="business-selector">
      <router-link v-for="business in businessStore.businesses" :key="business.id" :to="`/business/${business.id}`"
        class="business-link" :class="{ active: businessStore.currentBusiness?.id === business.id }">
        {{ business.heroRestaurantName }}
      </router-link>
    </div>
    <Hero />
    <div class="bottom">
      <div class="left">
        <What />
        <How />
        <Who />
        <Reviews />
      </div>
      <Membership />
    </div>


  </div>
</template>

<script setup>
import Hero from './components/Hero.vue'
import What from './components/What.vue'
import How from './components/How.vue'
import Who from './components/Who.vue'
import Membership from './components/Membership.vue'
import Reviews from './components/Reviews.vue'
import { onMounted, watch } from 'vue'
import { useBusinessStore } from './stores/business.js'
import { STRAPI_URL, STRAPI_TOKEN } from './config'
import { useRoute, useRouter } from 'vue-router'

const businessStore = useBusinessStore()
const logo = businessStore.currentLogo
const perks = businessStore.currentPerks
const menus = businessStore.currentMenus
const route = useRoute()
const router = useRouter()

onMounted(async () => {
  try {
    const res = await fetch(`${STRAPI_URL}/api/businesses?populate[]=perks&populate[]=reviews&populate[]=menus.image&populate[]=heroCarousel&populate[]=variantGroup.variant&populate[]=variantGroup.image&populate[]=logo&populate[]=supportingMedia&populate[]=delivery&populate[]=offeringType`, {
      headers: {
        Authorization: `Bearer ${STRAPI_TOKEN}`
      }
    })
    const data = await res.json()
    console.log('Strapi API response:', data)
    businessStore.setBusinesses(data.data)
    // After businesses are loaded, select the business from the route if present
    if (route.params.id) {
      const business = businessStore.businesses.find(b => b.id == route.params.id)
      if (business) businessStore.setCurrentBusiness(business)
    }
  } catch (e) {
    // handle error if needed
    console.error('Failed to fetch businesses:', e)
  }
})

// Watch for route changes and update the selected business
watch(
  () => route.params.id,
  (id) => {
    if (id) {
      const business = businessStore.businesses.find(b => b.id == id)
      if (business) businessStore.setCurrentBusiness(business)
    }
  }
)
</script>

<style scoped>
.app {
  margin: 0 auto;
}

.business-selector {
  display: flex;
  gap: 12px;
  padding: 12px;
  background-color: var(--color-background-page);
  border-bottom: 1px solid var(--color-border);
  margin-bottom: 12px;
  overflow-x: auto;
}

.business-link {
  margin: 0;
  padding: 8px 16px;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background-color: var(--color-background-page);
  color: var(--color-text);
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  text-decoration: none;
  display: inline-block;
}

.business-link:hover {
  background-color: var(--color-background-hover);
}

.business-link.active {
  background-color: var(--color-brand-green);
  color: white;
  border-color: var(--color-brand-green);
}

.app {
  min-height: 100vh;
  max-width: 1280px;
  padding: 12px;
  background-color: var(--color-background-page);
  display: flex;
  flex-direction: column;
  gap: 12px;

  .bottom {
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    display: flex;
    align-items: flex-start;
    gap: 12px;
    align-self: stretch;

    .left {
      flex: 1 1 0;
      min-width: 0;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      gap: 12px;
    }

    .membership {
      width: 400px;
      flex-shrink: 0;
    }
  }
}

button {
  margin: 2rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
}

pre {
  background: #f4f4f4;
  padding: 1rem;
  border-radius: 4px;
  margin: 2rem;
}
</style>
