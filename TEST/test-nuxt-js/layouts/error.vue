<template>
  <div class="error-page-container">
    <div class="error-page-content">
      <div class="error-text">
        <span>Error 404</span>
      </div>
      <nuxt-link class="navigation__link" tag="a" to="/">
        На главную
      </nuxt-link>
    </div>
  </div>
</template>
<style scoped>
.error-page-container {
  width: 100%;
  height: 100vh;
  background-color: #dcdfe6;
  display: flex;
  justify-content: center;
  align-items: center;
  position:absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
}
.error-page-content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.error-text {
  font-size: 30px;
  color: #444;
  margin-bottom: 15px;
}
</style>
