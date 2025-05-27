<template>
    <div class="membership">
        <Header class="header" />
        <div v-if="business">
            <div class="membership-summary">
                <span class="form-primary">from ${{ business.membershipPrice }} per month</span>
                <span class="form-primary">&bull; delivery {{ business.membershipDate }}</span>
            </div>
            <div class="section-label form-primary" style="color: #f0f; margin-top: 16px;">offeringType (can be
                multiple)</div>
            <div class="offering-types">
                <CheckRow v-for="type in business.offeringType || []" :key="type.id" :title="type.title"
                    :description="type.description" :price="type.price" :selected="false" />
            </div>
            <div class="section-label form-primary" style="color: #f0f; margin-top: 24px;">variantGroup (can be empty,
                or 1 or multiple)</div>
            <div class="variant-groups">
                <VariantGroup v-for="group in business.variantGroup || []" :key="group.id" :title="group.title"
                    :description="group.description"
                    :image="group.image && group.image.url ? getStrapiMedia(group.image.url) : null">
                    <CheckRow v-for="item in group.variant || []" :key="item.id" :title="item.title"
                        :description="item.description" :price="item.price" :selected="item.selected" />
                </VariantGroup>
            </div>
            <div class="section-label form-primary" style="margin-top: 24px;">How it reaches them</div>
            <div class="delivery-options">
                <CheckTile v-for="(option, idx) in business.delivery || []" :key="option.id" :title="option.type"
                    :price="option.description" :selected="idx === selectedDeliveryIdx">
                    <template #icon>
                        <span class="icon-default">👥</span>
                    </template>
                </CheckTile>
            </div>
        </div>
    </div>
</template>

<script setup>
import Header from './atoms/Header.vue'
import CheckTile from './atoms/CheckTile.vue'
import CheckRow from './atoms/CheckRow.vue'
import VariantGroup from './atoms/VariantGroup.vue'
import { useBusinessStore } from '../stores/business'
import { computed, ref } from 'vue'
import { getStrapiMedia } from '../utils/strapi'

const businessStore = useBusinessStore()
const business = computed(() => businessStore.currentBusiness)
const selectedDeliveryIdx = ref(1) // Demo: select the second option (Pick-up)
</script>

<style scoped>
.membership {
    width: 400px;
    min-height: 700px;
    background-color: var(--color-background-panel);
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    border-radius: var(--spacing-panel-radius);
}

.header {
    background: transparent;
}

.membership-summary {
    display: flex;
    gap: 8px;
    margin-bottom: 8px;
}

.section-label {
    margin-bottom: 8px;
}

.offering-types,
.variant-groups {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.delivery-options {
    display: flex;
    flex-direction: row;
    gap: 16px;
    margin-top: 8px;
}
</style>