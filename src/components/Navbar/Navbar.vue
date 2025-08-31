<template>
  <nav class="navbar">
    <div class="navbar-container">
      <div class="logo">
        <img src="@/assets/logowhite.png" alt="Logo">
        <h4>Todobox</h4>
      </div>
      <div class="user-info">
        <span class="username">{{ username }}</span>
        <div class="profile-container" @click="toggleLogoutMenu">
          <img src="@/assets/profile.png" alt="User Icon" class="profile-image">
          <div class="logout-dropdown" v-if="showLogoutMenu" @click.stop="logout">
            <div class="dropdown-arrow"></div>
            <div class="dropdown-content">
              <div class="user-details">
                <img src="@/assets/profile.png" alt="User Icon" class="dropdown-avatar">
                <div class="user-text">
                  <p class="username-display">{{ username }}</p>
                  <p class="user-email">{{ userEmail }}</p>
                </div>
              </div>
              <hr class="dropdown-divider">
              <div class="logout-option">
                <i class="fa fa-sign-out"></i>
                <span>Sign out</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      showLogoutMenu: false,
      username: '',
      userEmail: ''
    };
  },
  methods: {
    toggleLogoutMenu() {
      this.showLogoutMenu = !this.showLogoutMenu;
    },
    logout() {
      this.showLogoutMenu = false;
      this.$router.replace('/');
    },
    closeDropdownOnOutsideClick(event) {
      if (!this.$el.contains(event.target)) {
        this.showLogoutMenu = false;
      }
    }
  },
  created() {
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser) {
      this.username = storedUser.username;
      this.userEmail = storedUser.email || 'user@example.com';
    } else {
      this.username = 'Username';
      this.userEmail = 'user@example.com';
    }
  },
  
  mounted() {
    // Close dropdown when clicking outside
    document.addEventListener('click', this.closeDropdownOnOutsideClick);
  },
  
  beforeUnmount() {
    document.removeEventListener('click', this.closeDropdownOnOutsideClick);
  }
};
</script>

<style scoped>
.profile-container {
  position: relative;
  cursor: pointer;
}

.profile-image {
  transition: all 0.3s ease;
}

.profile-image:hover {
  transform: scale(1.05);
  box-shadow: 0 0 0 3px rgba(66, 91, 217, 0.3);
}

.logout-dropdown {
  position: absolute;
  top: calc(100% + 15px);
  right: 0;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  border: 1px solid #E5E5E5;
  min-width: 280px;
  z-index: 1000;
  animation: dropdownSlide 0.3s ease-out;
  overflow: hidden;
}

@keyframes dropdownSlide {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.dropdown-arrow {
  position: absolute;
  top: -8px;
  right: 20px;
  width: 16px;
  height: 16px;
  background-color: white;
  border: 1px solid #E5E5E5;
  border-bottom: none;
  border-right: none;
  transform: rotate(45deg);
}

.dropdown-content {
  padding: 20px;
}

.user-details {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 15px;
}

.dropdown-avatar {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: 2px solid #F0F2F5;
}

.user-text {
  flex: 1;
}

.username-display {
  margin: 0;
  font-weight: 600;
  color: #2c3e50;
  font-size: 15px;
}

.user-email {
  margin: 2px 0 0 0;
  color: #6c757d;
  font-size: 13px;
}

.dropdown-divider {
  border: none;
  border-top: 1px solid #E9ECEF;
  margin: 15px -20px;
}

.logout-option {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 15px;
  margin: 0 -15px -15px -15px;
  border-radius: 0 0 12px 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #6c757d;
}

.logout-option:hover {
  background-color: #F8F9FA;
  color: #425BD9;
}

.logout-option i {
  font-size: 16px;
}

.logout-option span {
  font-size: 14px;
  font-weight: 500;
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
  gap: 15px;
}

.user-info img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
}

.username {
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
  }
  
  .user-info img {
    width: 35px;
    height: 35px;
  }
  
  .logout-dropdown {
    min-width: 260px;
    right: -10px;
  }
  
  .dropdown-content {
    padding: 15px;
  }
  
  .user-details {
    margin-bottom: 12px;
  }
  
  .dropdown-avatar {
    width: 40px;
    height: 40px;
  }
  
  .username-display {
    font-size: 14px;
  }
  
  .user-email {
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
    display: none;
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
    display: none;
  }
  
  .user-info img {
    width: 30px;
    height: 30px;
  }
  
  .logout-dropdown {
    min-width: 240px;
    right: -15px;
  }
  
  .dropdown-content {
    padding: 12px;
  }
  
  .dropdown-arrow {
    right: 25px;
  }
  
  .username-display {
    font-size: 13px;
  }
  
  .user-email {
    font-size: 11px;
  }
  
  .logout-option {
    padding: 10px 12px;
  }
}
</style>