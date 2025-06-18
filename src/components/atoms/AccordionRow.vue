<template>
    <div class="accordion">
        <div class="accordion-header" :class="{ expanded: isExpanded }" @click="toggleExpanded">
            <div class="label">
                <slot name="label"></slot>
            </div>
            <div class="value">
                <slot name="value"></slot>
            </div>
            <button class="edit-btn" aria-label="Edit" @click.stop="toggleExpanded">
                <img src="../../assets/images/chevrondown.svg" alt="Edit" width="20" height="20" class="chevron" />
            </button>
        </div>
        <div class="accordion-content" :class="{ expanded: isExpanded }">
            <div class="content-wrapper">
                <slot name="content"></slot>
                <div v-if="faqData" class="faq-content">
                    <div v-for="(item, index) in faqData" :key="index" class="faq-item">
                        <p v-if="item.children?.[0]?.bold" class="faq-question">{{ item.children[0].text }}</p>
                        <p v-if="!item.children?.[0]?.bold" class="faq-answer">{{ item.children[0].text }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { STRAPI_URL, STRAPI_TOKEN } from '../../config';

const isExpanded = ref(false);
const faqData = ref(null);

const toggleExpanded = () => {
    isExpanded.value = !isExpanded.value;
};

onMounted(async () => {
    try {
        const response = await fetch(`${STRAPI_URL}/api/faqs`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${STRAPI_TOKEN}`
            }
        });
        const data = await response.json();
        if (data.data && data.data.length > 0) {
            faqData.value = data.data[0].Fulltext;
        }
    } catch (error) {
        console.error('Error fetching FAQ data:', error);
    }
});
</script>

<style scoped>
.accordion {
    width: 100%;
    border-radius: 12px;
    border: 1px solid var(--color-controls-inactive-stroke);
    background: var(--color-controls-bg, #fff);
    font-size: 18px;
    font-weight: 500;
    box-sizing: border-box;
    margin-top: 16px;
    margin-bottom: 16px;
    cursor: pointer;
    overflow: hidden;
}

.accordion-header {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 16px;
}

.accordion-header:hover .label {
    text-decoration: underline;
}

.label {
    font-weight: 500;
    font-size: 18px;
}

.value {
    font-weight: 400;
    font-size: 18px;
    margin-left: 8px;
}

.edit-btn {
    margin-left: auto;
    background: none;
    border: none;
    padding: 0 0 0 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
}

.chevron {
    transition: transform 0.2s ease;
}

.accordion-header.expanded .chevron {
    transform: rotate(180deg);
}

.accordion-content {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;
}

.accordion-content.expanded {
    max-height: 1000px;
}

.content-wrapper {
    padding: 16px;
}

.faq-content {
    margin-top: 16px;
}

.faq-item {
    margin-bottom: 16px;
}

.faq-item:last-child {
    margin-bottom: 0;
}

.faq-question {
    font-weight: 600;
    margin-bottom: 8px;
    color: var(--color-foreground-base-alpha);
}

.faq-answer {
    color: var(--color-foreground-base-alpha);
}
</style>