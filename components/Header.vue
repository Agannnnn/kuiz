<template>
  <nav>
    <NuxtLink class="nav-link" to="/">Home</NuxtLink>
    <NuxtLink class="nav-link" to="/bikin">Buat Quiz Baru</NuxtLink>
    <NuxtLink class="nav-link" to="/selesai">Quiz Selesai</NuxtLink>
    <NuxtLink class="nav-link float" to="/logout">Logout</NuxtLink>
  </nav>
</template>

<style scoped lang="scss">
nav {
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: rgb(50, 50, 50);

  .nav-link {
    border-bottom: 2px solid transparent;
    text-decoration: none;
    font-weight: 500;
    color: #ffffff;
    margin: 10px;
    padding: 4px 0;

    &:is(:hover, :active, :focus) {
      border-bottom-color: #ffffff;
    }
  }
}
</style>
