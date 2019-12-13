<template>
  <div id="app">
    <link href='https://fonts.googleapis.com/css?family=Muli' rel='stylesheet'>
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {
  }
}
</script>

<style lang="less">
@import '~@/assets/less/variables';

/* ===== App Default ===== */
html, body {
  height: 100%;
  margin: 0;
  #app {
    font-family: Muli, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    height: 100%;
  }
  a {
    text-decoration: none;
    &:hover {
      text-decoration: none;
    }
  }
  input {
    outline: none;
  }
  img {
    -o-object-fit: cover;
    object-fit: cover;
  }
}

.container {
  margin: 0 25px;
}

.full-height {
  height: 100%;
}

//Buttons
.dame__button {
  -webkit-transition: background-color 400ms ease, opacity 400ms ease, color 400ms ease;
  transition: background-color 400ms ease, opacity 400ms ease, color 400ms ease;
  border-radius: 5px;
  padding: 6px 16px;
  margin-right: 15px;
  font-size: 11px;
  outline: none;
  cursor: pointer;
  color: white;
  background-color: @primary_color;
  &:hover {
    background-color: @secondary_color;
  }
}

//Loading sections
.bg-loading {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 2px;
  background: grey;
  background: linear-gradient(90deg, @grey_light, #CACACA, @grey_light);
	background-size: 400% 400%;
  animation: bg-loading 5s ease infinite,
            fade .3s ease-in-out .5s forwards;
  @keyframes fade {
    0% {
      opacity:0;
    }
    100% {
      opacity: 1;
    }
  }
  @keyframes bg-loading {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
}

</style>
