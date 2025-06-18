<template>
    <div class="membership">
        <Header class="header">Your membership</Header>
        <div v-if="business">
            <div class="membership-summary">
                Billed now • Next edition {{ new Date(new Date().setMonth(new Date().getMonth() +
                    1)).toLocaleString('default', { month: 'long' }) }} {{ new Date().getFullYear() }}
            </div>
            <div class="inputs">
                <div class="offering-types">
                    <CheckRow v-for="type in business.offeringType || []" :key="type.id" :title="type.title"
                        :description="type.description" :price="type.price"
                        :selected="type.id === business.offeringType[0]?.id" />
                </div>

                <div class="variant-groups">
                    <VariantGroup v-for="group in business.variantGroup || []" :key="group.id" :title="group.title"
                        :description="group.description"
                        :image="group.image && group.image.url ? getStrapiMedia(group.image.url) : null"
                        :selectedIndex="selectedVariantIndexes[group.id] ?? 0">
                        <CheckInline v-for="(item, idx) in group.variant" :key="item.id" :title="item.title"
                            :price="item.price" :selected="(selectedVariantIndexes[group.id] ?? 0) === idx"
                            @click="handleVariantSelect(group.id, idx)" />
                    </VariantGroup>
                </div>

                <!-- <EditRow style="width: 100%;">
                    <template #label>Dietary restrictions</template>
<template #value>Edit</template>
</EditRow> -->

                <div class="delivery-options">
                    <CheckTile v-for="(option, idx) in business.delivery || []" :key="option.id" :title="option.type"
                        :price="option.description" :selected="idx === selectedDeliveryIdx"
                        @click="selectedDeliveryIdx = idx" />
                </div>
                <div class="map-cta" @click="showMapModal = true">
                    <img src="../assets/images/map.svg" alt="Edit" width="20" height="20" /> View delivery locations
                </div>

                <ButtonPrimary>Become a member</ButtonPrimary>
                <!-- <ButtonSecondary>Or gift membership</ButtonSecondary> -->

                <!-- <ButtonTertiary>FAQ----</ButtonTertiary> -->
                <AccordionRow>
                    <template #label>FAQ</template>

                </AccordionRow>



            </div>
        </div>

        <!-- Map Modal -->
        <div v-if="showMapModal" class="map-modal-overlay" @click="showMapModal = false">
            <div class="map-modal" @click.stop>
                <img src="../assets/images/map.png" alt="Delivery Locations Map" class="map-image" />
            </div>
        </div>
    </div>
</template>

<script setup>
import Header from './atoms/Header.vue'
import CheckInline from './atoms/CheckInline.vue'
import CheckTile from './atoms/CheckTile.vue'
import CheckRow from './atoms/CheckRow.vue'
import VariantGroup from './atoms/VariantGroup.vue'
import EditRow from './atoms/EditRow.vue'
import ButtonPrimary from './atoms/ButtonPrimary.vue'
import AccordionRow from './atoms/AccordionRow.vue'
import ButtonTertiary from './atoms/ButtonTertiary.vue'
import FormTitle from './atoms/FormTitle.vue'
import { useBusinessStore } from '../stores/business'
import { computed, ref } from 'vue'
import { getStrapiMedia } from '../utils/strapi'

const businessStore = useBusinessStore()
const business = computed(() => businessStore.currentBusiness)
const selectedDeliveryIdx = ref(1) // Demo: select the second option (Pick-up)
const showMapModal = ref(false)

// Track selected index for each variant group
const selectedVariantIndexes = ref({})
function handleVariantSelect(groupId, idx) {
    selectedVariantIndexes.value[groupId] = idx
}
</script>

<style scoped>
.membership {
    position: sticky;
    top: 24px;
    align-self: flex-start;
    width: 400px;
    min-height: 700px;
    background-color: var(--color-background-panel);
    padding: 12px;
    display: flex;
    flex-direction: column;
    /* gap: 12px; */
    border-radius: var(--spacing-panel-radius);
}

.header {
    background: transparent;
    padding-bottom: 0;
    padding-left: 8px;
    padding-top: 12px;
}

.membership-summary {
    display: flex;
    margin-bottom: 8px;
    padding-left: 8px;
    color: var(--color-foreground-base-alpha);
    padding-bottom: 8px;
}

.inputs {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.section-label {
    margin-bottom: 8px;
}

.offering-types,
.variant-groups {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.delivery-options {
    display: flex;
    flex-direction: row;
    gap: 12px;
    width: 355px;
    flex-wrap: wrap;
    justify-content: flex-start;

    >* {
        flex: 1 1 calc(50% - 6px);
        /* 6px accounts for the 12px gap divided by 2 */
        min-width: 140px;
        /* Ensures reasonable minimum width */
        max-width: calc(50% - 6px);
    }
}

.dietary-restrictions-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 269px;
    padding: 16px;
    border-radius: 12px;
    border: 1px solid var(--color-controls-inactive-stroke);
    background: var(--color-controls-bg, #fff);
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 16px;
    gap: 8px;

}

.label {
    font-weight: 700;
    font-size: 18px;
}

.value {
    font-weight: 400;
    font-size: 18px;
    color: var(--color-foreground-secondary, #888);
    margin-left: 8px;
}

.edit-btn {
    background: none;
    border: none;
    padding: 0 0 0 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
}

.edit-btn svg {
    display: block;
}

.map-cta {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    padding-top: 8px;
    padding-bottom: 8px;

    &:hover {
        text-decoration: underline;
    }
}

.map-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.map-modal {
    width: 500px;
    height: 500px;
    background: white;
    border-radius: 12px;
    padding: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.map-image {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
}
</style>