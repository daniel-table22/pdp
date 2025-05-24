<template>
  <div class="app">

    <Hero />
    <div class="bottom">
      <div class="left">
        <What />
        <How />
        <Who />
      </div>
      <Membership />
    </div>
    <div class="panel">
      <h2 style="color: var(--color-brand-green)">hellllo</h2>
    </div>
    <br>
    <div class="panel2">
      <h2 style="color: var(--color-brand-green)">goodbuye</h2>
    </div>
  </div>
</template>

<script setup>
import Hero from './components/Hero.vue'
import What from './components/What.vue'
import How from './components/How.vue'
import Who from './components/Who.vue'
import Membership from './components/Membership.vue'
import { onMounted } from 'vue'
import { useBusinessStore } from './stores/business.js'

const businessStore = useBusinessStore()
const logo = businessStore.currentLogo
const perks = businessStore.currentPerks
const menus = businessStore.currentMenus

onMounted(async () => {
  try {
    const res = await fetch('http://localhost:1337/api/businesses?populate[]=perks&populate[]=reviews&populate[]=menus.image&populate[]=heroCarousel&populate[]=variantGroup.variant&populate[]=variantGroup.image&populate[]=logo&populate[]=supportingMedia&populate[]=delivery&populate[]=offeringType', {
      headers: {
        Authorization: 'Bearer c153ba748a898f1f8109eb9a6e9a409073c00e8a35ef9f7b063e7198b20e7ce77849ac188803e9df57750bcaf5728d1ef5138e3850d6b44100e67269897ad6aacd068be251c11c1db6445484dab0ead34bbe97bc7c40958ed69347742db7353d5536e0ea2b01290aa04a212549b4a1c270cdb479fb254bf09b855c8e22c06575'
      }
    })
    const data = await res.json()
    businessStore.setBusinesses(data.data)
  } catch (e) {
    // handle error if needed
    console.error('Failed to fetch businesses:', e)
  }
})
</script>

<style scoped>
.app {
  min-height: 100vh;
  max-width: 1280px;

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
