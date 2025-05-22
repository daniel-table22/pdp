<template>
  <div>
    <button @click="fetchData">Fetch Strapi Data</button>
    <pre v-if="result">{{ result }}</pre>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const result = ref('')

const fetchData = async () => {
  result.value = 'Loading...'
  try {
    const res = await fetch('http://localhost:1337/api/businesses', {
      headers: {
        Authorization: 'Bearer c153ba748a898f1f8109eb9a6e9a409073c00e8a35ef9f7b063e7198b20e7ce77849ac188803e9df57750bcaf5728d1ef5138e3850d6b44100e67269897ad6aacd068be251c11c1db6445484dab0ead34bbe97bc7c40958ed69347742db7353d5536e0ea2b01290aa04a212549b4a1c270cdb479fb254bf09b855c8e22c06575'
      }
    })
    const data = await res.json()
    result.value = JSON.stringify(data, null, 2)
  } catch (e) {
    result.value = 'Error: ' + e.message
  }
}
</script>

<style scoped>
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
