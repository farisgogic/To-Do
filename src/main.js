
import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Login from './components/Auth/Login.vue'
import ToDoBox from './components/ToDo/ToDoBox.vue'
import register from './components/Auth/Register.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Login },
    { path: '/todo', component: ToDoBox },
    { path: '/register', component: register }
  ]
})

createApp(App).use(router).mount('#app')
