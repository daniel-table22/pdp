<template>
    <div class="membership">
        <Header class="header">Your membership</Header>
        <div v-if="business">
            <div class="membership-summary">
                <span class="form-primary">from ${{ business.membershipPrice }} per month</span>
                <span class="form-primary">&bull; delivery {{ business.membershipDate }}</span>
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

                <EditRow style="width: 100%;">
                    <template #label>Dietary restrictions</template>
                    <template #value>Edit</template>
                </EditRow>

                <div class="delivery-options">
                    <CheckTile v-for="(option, idx) in business.delivery || []" :key="option.id" :title="option.type"
                        :price="option.description" :selected="idx === selectedDeliveryIdx"
                        @click="selectedDeliveryIdx = idx" />
                </div>

                <ButtonPrimary>Become a member</ButtonPrimary>
                <ButtonSecondary>Or gift membership</ButtonSecondary>

                <ButtonTertiary>FAQ</ButtonTertiary>
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
import ButtonSecondary from './atoms/ButtonSecondary.vue'
import ButtonTertiary from './atoms/ButtonTertiary.vue'
import FormTitle from './atoms/FormTitle.vue'
import { useBusinessStore } from '../stores/business'
import { computed, ref } from 'vue'
import { getStrapiMedia } from '../utils/strapi'

const businessStore = useBusinessStore()
const business = computed(() => businessStore.currentBusiness)
const selectedDeliveryIdx = ref(1) // Demo: select the second option (Pick-up)

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
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 12px;
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
</style>