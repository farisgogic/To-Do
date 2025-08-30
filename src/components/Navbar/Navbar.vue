<template>
  <nav class="navbar">
    <div class="navbar-container">
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
  background-color: #232C33;
  top: 0;
  left: 0;
  width: 100%;
  position: absolute;
  box-sizing: border-box;
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1240px;
  margin: 0 auto;
  padding: 10px 20px;
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
  margin-right: 30px;
  color: white;
}

/* Mobile Responsive Styles */
@media (max-width: 1024px) {
  .navbar-container {
    padding: 10px 15px;
  }
  
  .logo h4 {
    font-size: 14px;
  }
  
  .logo img {
    width: 50px;
    height: 50px;
  }
  
  .username {
    font-size: 14px;
    margin-right: 15px;
  }
  
  .user-info img {
    width: 35px;
    height: 35px;
  }
  
  .logout-menu {
    width: 90px;
    height: 35px;
    left: 65%;
    font-size: 12px;
  }
}

@media (max-width: 768px) {
  .logo h4 {
    font-size: 13px;
  }
  
  .logo img {
    width: 45px;
    height: 45px;
  }
  
  .username {
    font-size: 13px;
    margin-right: 20px;
  }
  
  .user-info img {
    width: 32px;
    height: 32px;
  }
}

@media (max-width: 480px) {
  .navbar-container {
    padding: 8px 10px;
  }
  
  .logo h4 {
    font-size: 12px;
  }
  
  .logo img {
    width: 40px;
    height: 40px;
  }
  
  .username {
    font-size: 12px;
    margin-right: 10px;
  }
  
  .user-info img {
    width: 30px;
    height: 30px;
  }
  
  .logout-menu {
    width: 80px;
    height: 30px;
    left: 60%;
    font-size: 11px;
    padding: 5px;
  }
}
</style>
