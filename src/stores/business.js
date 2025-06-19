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
      // If no current business is set and we have businesses, set the first one
      if (this.businesses.length > 0 && this.currentIndex >= this.businesses.length) {
        this.currentIndex = 0
      }
    },
    setCurrentBusiness(business) {
      const index = this.businesses.findIndex(b => b.id === business.id)
      if (index !== -1) {
        this.currentIndex = index
        console.log('Business store: Set current business to index', index, business.heroRestaurantName)
      } else {
        console.warn('Business store: Business not found in list:', business.id)
      }
    },
    clearCurrentBusiness() {
      this.currentIndex = -1
      console.log('Business store: Cleared current business')
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
    currentBusiness: (state) => state.currentIndex >= 0 && state.businesses[state.currentIndex] ? state.businesses[state.currentIndex] : null,
    currentLogo: (state) => state.currentIndex >= 0 && state.businesses[state.currentIndex]?.logo ? state.businesses[state.currentIndex].logo : null,
    currentHeroCarousel: (state) => state.currentIndex >= 0 && state.businesses[state.currentIndex]?.heroCarousel ? state.businesses[state.currentIndex].heroCarousel : [],
    currentPerks: (state) => state.currentIndex >= 0 && state.businesses[state.currentIndex]?.perks ? state.businesses[state.currentIndex].perks : [],
    currentReviews: (state) => state.currentIndex >= 0 && state.businesses[state.currentIndex]?.reviews ? state.businesses[state.currentIndex].reviews : [],
    currentMenus: (state) => state.currentIndex >= 0 && state.businesses[state.currentIndex]?.menus ? state.businesses[state.currentIndex].menus : [],
    currentVariantGroup: (state) => state.currentIndex >= 0 && state.businesses[state.currentIndex]?.variantGroup ? state.businesses[state.currentIndex].variantGroup : [],
    currentDelivery: (state) => state.currentIndex >= 0 && state.businesses[state.currentIndex]?.delivery ? state.businesses[state.currentIndex].delivery : []
  }
}) 