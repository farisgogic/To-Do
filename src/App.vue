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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

}

body{
  background-color: #F1F1F1;
}
</style>
