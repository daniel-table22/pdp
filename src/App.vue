<template>
  <div class="app">
    <div v-if="showBusinessSelector" class="business-selector">
      <router-link v-for="business in businessStore.businesses" :key="business.id" :to="`/business/${business.id}`"
        class="business-link" :class="{ active: businessStore.currentBusiness?.id === business.id }">
        {{ business.heroRestaurantName }}
      </router-link>
    </div>
    <div class="content" :class="{ 'with-menu': showBusinessSelector }">
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

    <!-- No Partner Found Modal -->
    <div v-if="showNoPartnerModal" class="modal-overlay" @click="closeNoPartnerModal">
      <div class="modal" @click.stop>
        <h2>No Partner Found</h2>
        <p>There is no partner at this address.</p>
        <p class="partner-id">Partner ID: {{ route.params.id }}</p>
        <button @click="closeNoPartnerModal" class="close-button">Close</button>
      </div>
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
import { onMounted, watch, ref, onUnmounted } from 'vue'
import { useBusinessStore } from './stores/business.js'
import { STRAPI_URL, STRAPI_TOKEN } from './config'
import { useRoute, useRouter } from 'vue-router'

const businessStore = useBusinessStore()
const logo = businessStore.currentLogo
const perks = businessStore.currentPerks
const menus = businessStore.currentMenus
const route = useRoute()
const router = useRouter()
const showBusinessSelector = ref(false)
const showNoPartnerModal = ref(false)
let keySequence = ''

const closeNoPartnerModal = () => {
  showNoPartnerModal.value = false
  // Redirect to home or first available business
  if (businessStore.businesses.length > 0) {
    router.push(`/business/${businessStore.businesses[0].id}`)
  } else {
    router.push('/')
  }
}

onMounted(async () => {
  try {
    const res = await fetch(`${STRAPI_URL}/api/businesses?populate[]=perks&populate[]=reviews&populate[]=menus.image&populate[]=heroCarousel&populate[]=variantGroup.variant&populate[]=variantGroup.image&populate[]=logo&populate[]=supportingMedia&populate[]=delivery&populate[]=offeringType`, {
      headers: {
        Authorization: `Bearer ${STRAPI_TOKEN}`
      }
    })
    const data = await res.json()
    console.log('Full Strapi API response:', data)
    console.log('Supporting Media in response:', data.data?.[0]?.attributes?.supportingMedia)
    businessStore.setBusinesses(data.data)

    // After businesses are loaded, select the business from the route if present
    if (route.params.id) {
      const business = businessStore.businesses.find(b => b.id == route.params.id)
      if (business) {
        businessStore.setCurrentBusiness(business)
        console.log('Selected business from route:', business.heroRestaurantName)
      } else {
        console.warn('Business not found for ID:', route.params.id)
        businessStore.clearCurrentBusiness()
        showNoPartnerModal.value = true
      }
    }
  } catch (e) {
    console.error('Failed to fetch businesses:', e)
  }
})

// Watch for route changes and update the selected business
watch(
  () => route.params.id,
  (newId, oldId) => {
    console.log('Route changed from', oldId, 'to', newId)
    if (newId && businessStore.businesses.length > 0) {
      const business = businessStore.businesses.find(b => b.id == newId)
      if (business) {
        businessStore.setCurrentBusiness(business)
        console.log('Updated business from route change:', business.heroRestaurantName)
        showNoPartnerModal.value = false
      } else {
        console.warn('Business not found for route ID:', newId)
        businessStore.clearCurrentBusiness()
        showNoPartnerModal.value = true
      }
    }
  },
  { immediate: true }
)

const handleKeyPress = (event) => {
  keySequence += event.key.toLowerCase()
  if (keySequence.length > 2) {
    keySequence = keySequence.slice(-2)
  }
  if (keySequence === 'me') {
    showBusinessSelector.value = !showBusinessSelector.value
    keySequence = ''
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyPress)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyPress)
})
</script>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  max-width: 1124px;
  margin: 0 auto;
  padding: 12px;
  background-color: var(--color-background-page);
}

.business-selector {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: var(--color-background-panel);
  padding: 16px;
  display: flex;
  gap: 16px;
  z-index: 1000;
  border-bottom: 1px solid var(--color-controls-inactive-stroke);
}

.business-link {
  color: var(--color-foreground-secondary);
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.business-link:hover {
  background: var(--color-controls-bg-hover);
}

.business-link.active {
  color: white;
  background: var(--color-brand-green);
}

.content {
  flex: 1;
}

.content.with-menu {
  padding-top: 80px;
}

.bottom {
  display: flex;
  gap: 24px;
  margin-top: 24px;
  width: 100%;
}

.left {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.membership {
  width: 400px;
  flex-shrink: 0;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.modal {
  background: white;
  padding: 32px;
  border-radius: 12px;
  text-align: center;
  max-width: 400px;
  width: 90%;
}

.modal h2 {
  margin-bottom: 16px;
  color: var(--color-foreground-primary);
}

.modal p {
  margin-bottom: 12px;
  color: var(--color-foreground-secondary);
}

.partner-id {
  font-weight: bold;
  color: var(--color-foreground-primary);
  font-family: monospace;
  background: var(--color-controls-bg-hover);
  padding: 8px;
  border-radius: 4px;
}

.close-button {
  margin-top: 16px;
  padding: 12px 24px;
  background: var(--color-brand-green);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
}

.close-button:hover {
  opacity: 0.9;
}
</style>
