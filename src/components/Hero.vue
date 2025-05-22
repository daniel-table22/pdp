<template>
  <div class="hero">
    <div class="left">
      <div class="content">
        <img class="logo" alt="Logo" src="@/assets/images/logo.png" />
        <div class="title">
          <slot name="title">The Supper Club</slot>
        </div>
        <p class="description">
          <slot name="description">
            Each month we bring you a tasting menu featuring signature dishes to prepare at home, as well as some members-only surprises.
          </slot>
        </p>
      </div>
      <div class="rating">
        <div class="stars">
          <span class="icon-solid-star">★</span>
          <span class="icon-solid-star">★</span>
          <span class="icon-solid-star">★</span>
          <span class="icon-solid-star">★</span>
          <span class="icon-solid-star">★</span>
        </div>
        <p class="average">
          <slot name="average">4.7 • based on 83 reviews</slot>
        </p>
      </div>
    </div>
    <div class="right">
      <div class="carousel">
        <div class="controls">
          <div class="icon-outline-chevron-wrapper">
            <span class="icon-outline-chevron">‹</span>
          </div>
          <div class="chevron-down-wrapper">
            <span class="chevron-down">›</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// No props needed, using slots for flexible content
</script>

<style scoped>
.hero {
  align-items: center;
  background: var(--color-background-panel);
  display: flex;
  justify-content: space-between;
  min-height: 100vh;
  position: relative;
  border-radius: 20px;
}
.left {
  align-items: center;
  background: var(--color-background-panel);
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: var(--spacing-panel-inner-row-gap);
  justify-content: space-around;
  padding: 0 52px;
}
.content {
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}
.logo {
  height: 48px;
  width: 112px;
  object-fit: contain;
  mix-blend-mode: darken;
}
.title {
  color: var(--color-foreground-base);
  text-align: center;
  font-size: 24px;
  font-weight: 900;
  line-height: 32px;
}
.description {
  color: var(--color-foreground-base-alpha);
  text-align: center;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
}
.rating {
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px 0 0 0;
}
.stars {
  display: flex;
  gap: 2px;
}
.icon-solid-star {
  color: var(--color-foreground-yellow);
  font-size: 20px;
}
.average {
  color: var(--color-foreground-base);
  opacity: 0.5;
  font-size: 18px;
  font-weight: 400;
  line-height: 20px;
  text-align: center;
}
.right {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 628px;
}
.carousel {
  background: url('@/assets/images/hero.jpg') center/cover no-repeat;
  height: 418.67px;
  width: 100%;
  border-radius: 0 20px 20px 0;
  position: relative;
}
.controls {
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  transform: translateY(-50%);
  padding: 0 34px;
}
.icon-outline-chevron-wrapper,
.chevron-down-wrapper {
  background: var(--color-foreground-invert);
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  font-size: 24px;
  cursor: pointer;
}
</style> 