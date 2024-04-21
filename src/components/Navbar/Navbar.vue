<template>
  <nav class="navbar">
    <div class="logo">
      <img src="@/assets/logowhite.png" alt="Logo">
      <h4>Todobox</h4>
    </div>
    <div class="user-info" @click="toggleLogoutMenu">
      <span class="username">{{ username }}</span>
      <img src="@/assets/profile.png" alt="User Icon">
    </div>
    <div class="logout-menu" v-if="showLogoutMenu" @click="logout">
      <i class="fa fa-sign-out"></i>
      <p>Log out</p>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      showLogoutMenu: false,
      username: ''
    };
  },
  methods: {
    toggleLogoutMenu() {
      this.showLogoutMenu = !this.showLogoutMenu;
    },
    logout() {
      this.$router.replace('/');
    }

  },
  created() {
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser) {
      this.username = storedUser.username;
    } else {
      this.username = 'Username';
    }
  }

};
</script>


<style scoped>
.logout-menu {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 40px;
  text-align: center;
  margin-left: 20px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  position: absolute;
  top: 100%;
  left: 73%;
}

.logout-menu i {
  margin-right: 5px;
}

.logo {
  display: flex;
  position: relative;
  justify-content: center;
  text-align: center;
}

.logo h4 {
  color: white;
  font-size: 16px;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20%;
  background-color: #232C33;
  margin: 0;
  top: 0;
  left: 0;
  width: 100%;
  position: absolute;
  box-sizing: border-box;
  max-width: 100%;

}

.logo img {
  width: 60px;
  height: 60px;
}

.user-info {
  display: flex;
  align-items: center;
}

.user-info img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
}

.username {
  margin-right: 10px;
  color: white;
  margin-right: 30px;
}
</style>
