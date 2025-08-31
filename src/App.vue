<script>
 import Login from './components/Auth/Login.vue';
 import ToDoBox from './components/ToDo/ToDoBox.vue';
 

export default {
  name: 'App',
  components: {
    Login,
    ToDoBox,
  }
};
</script>

<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
* {
  box-sizing: border-box;
}

html {
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
  font-size: 100%;
}

body {
  margin: 0;
  padding: 0;
  background-color: #F1F1F1;
  overflow-x: hidden;
  zoom: 1;
  -webkit-text-size-adjust: 100%;
}

/* Remove overflow on large screens for login/register pages */
@media (min-width: 1025px) {
  body {
    overflow: hidden;
  }
}

/* Prevent zoom issues */
@media screen and (max-device-width: 480px) {
  html {
    -webkit-text-size-adjust: none;
  }
}

#app {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 80px;
  min-height: 100vh;
  width: 100%;
}

/* Mobile Responsive Styles */
@media (max-width: 1024px) {
  #app {
    margin-top: 75px;
  }
}

@media (max-width: 768px) {
  #app {
    margin-top: 70px;
  }
}

@media (max-width: 480px) {
  #app {
    margin-top: 65px;
  }
}

@media (max-width: 360px) {
  #app {
    margin-top: 60px;
  }
}
</style>
