<template>
  <div className="notFounf-container">
    <h2>This Page Isn't Avalible</h2>
    <div>
      This link may be broken, or the page may have been removed. Check to see
      if the link you're trying to open is correct.
    </div>

    <button>
      <router-link :to="{ name: 'home-route' }">Go to HomePage</router-link>
    </button>
  </div>
</template>

<style scoped>
.notFounf-container {
  margin: 20px;
  text-align: center;
}
</style>