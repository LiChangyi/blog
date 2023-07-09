<template>
  <header class="flex items-center px-6 justify-end" style="height: 60px">
    <nav>
      <router-link class="nav-item mr-4" to="/"> Home </router-link>
      <router-link class="nav-item" to="/about"> About </router-link>
    </nav>
  </header>
</template>

<style>
.router-link-exact-active,
.nav-item:hover {
  color: #059669;
}
.nav-item {
  transition: color 0.12s;
}
</style>
