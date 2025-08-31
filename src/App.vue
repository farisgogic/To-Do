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

body {
  margin: 0;
  padding: 0;
  background-color: #F1F1F1;
  overflow-x: hidden;
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

/* Improve touch targets for mobile */
@media (hover: none) and (pointer: coarse) {
  button, 
  .task-icon, 
  .title-icons i,
  input[type="checkbox"] {
    min-height: 44px;
    min-width: 44px;
  }
}
</style>
