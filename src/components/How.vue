<template>
    <div class="how">
        <Header class="header">How it works</Header>
        <img class="diagram" src="@/assets/images/steps.svg" alt="How it works" />
        <div class="allergies body">
            <hr>
            Travel plans? We’re flexible, skip or cancel anytime
        </div>
    </div>
</template>

<script setup>
import Header from './atoms/Header.vue'
</script>

<style scoped>
.how {
    background: var(--Colors-background-panel, #FFF);
    padding-left: 24px;
    padding-right: 24px;
    padding-bottom: 32px;
    border-radius: var(--spacing-panel-radius);
    overflow: hidden;
}

.diagram {
    width: 100%;
    height: auto;
}

.allergies {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
    text-align: center;

    hr {
        width: 100%;
        border: 1px solid var(--Colors-border-default, #E0E0E0);
        margin-top: 16px;
        margin-bottom: 16px;
    }
}
</style>