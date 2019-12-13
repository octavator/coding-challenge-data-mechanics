<template>
  <div class="navbar">
    <img height='40px' src='https://uploads-ssl.webflow.com/5d1cf406bc7d9278ad105165/5d69e7316079d01ce6bc99ac_Brand_Lockup.svg'>

    <div class="navbar-item">
      <a href='/#/' class="dame__button">
        Home
      </a>
    </div>
    <div class="navbar-item">
      <a href='/#/' class="dame__button">
        Team
      </a>
    </div>
    <div class="navbar-item">
      <a href='/#/' class="dame__button">
        Jobs
      </a>
    </div>
    <div class="navbar-item">
      <a href='/#/' class="dame__button">
        Contact
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style lang="less">
@import '~@/assets/less/variables';

.navbar {
  // @TODO: Change hidden overflow to burger menu for mobile
  overflow: hidden;

  border-bottom: 1px solid @primary_color;
  display: flex;
  justify-content: space-between;
  height: 60px;
  padding: 5px 15px;
  align-items: center;
}
</style>