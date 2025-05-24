import { defineStore } from 'pinia'

// Types for our data structures
const MediaType = {
  id: Number,
  name: String,
  url: String,
  formats: Object,
  alternativeText: String,
  caption: String,
  width: Number,
  height: Number,
  size: Number,
  mime: String
}

const MenuItemType = {
  type: String,
  text: String
}

const MenuType = {
  id: Number,
  title: String,
  description: Array
}

const BusinessType = {
  id: Number,
  documentId: String,
  businessType: String,
  heroRestaurantName: String,
  heroMembershipName: String,
  whatYouGetTitle: String,
  whatYouGetDescription: String,
  supportingDescription: String,
  supportingChefname: String,
  supportingMedia: Array,
  perks: Array,
  reviews: Array,
  menus: Array,
  variantGroup: Array,
  delivery: Array,
  heroCarousel: Array,
  logo: Object,
  createdAt: String,
  updatedAt: String,
  publishedAt: String
}

export const useBusinessStore = defineStore('business', {
  state: () => ({
    businesses: [],
    currentIndex: 0,
  }),
  actions: {
    setBusinesses(data) {
      this.businesses = data
    },
    next() {
      if (this.businesses.length > 0) {
        this.currentIndex = (this.currentIndex + 1) % this.businesses.length
      }
    },
    prev() {
      if (this.businesses.length > 0) {
        this.currentIndex = (this.currentIndex - 1 + this.businesses.length) % this.businesses.length
      }
    }
  },
  getters: {
    currentBusiness: (state) => state.businesses[state.currentIndex] || null,
    currentLogo: (state) => state.businesses[state.currentIndex]?.logo || null,
    currentHeroCarousel: (state) => state.businesses[state.currentIndex]?.heroCarousel || [],
    currentPerks: (state) => state.businesses[state.currentIndex]?.perks || [],
    currentReviews: (state) => state.businesses[state.currentIndex]?.reviews || [],
    currentMenus: (state) => state.businesses[state.currentIndex]?.menus || [],
    currentVariantGroup: (state) => state.businesses[state.currentIndex]?.variantGroup || [],
    currentDelivery: (state) => state.businesses[state.currentIndex]?.delivery || []
  }
}) 