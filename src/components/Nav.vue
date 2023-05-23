<template>
  <nav class="nav">
    <router-link :to="{ name: 'home-route' }">Home</router-link>
    <router-link :to="{ name: 'tictactoe-route' }">Tic-Tac-Toe</router-link>
    <router-link :to="{ name: 'quanlysinhvien-route' }"
      >Quản lý Sinh Viên</router-link
    >
  </nav>
</template>

<style scoped>
</style>