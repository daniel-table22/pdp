<template>
    <div class="how">
        <Header class="header" />
        <img src="@/assets/images/steps.svg" alt="How it works" />
        <div class="allergies body">
            Allergies or travel plans? We’re flexible, cancel anytime
        </div>
    </div>
</template>

<script setup>
import Header from './atoms/Header.vue'
</script>

<style scoped>
.how {
    background: var(--Colors-background-panel, #FFF);
}

.allergies {
    display: flex;
    align-items: center;
    gap: 16px;
    align-self: stretch;
}
</style>