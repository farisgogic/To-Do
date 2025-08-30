<template>
    <div class="body">
      <div class="login-container">
        <div class="logo-container">
          <img src="/src/assets/Logo.png" alt="Logo">
        </div>
        <form @submit.prevent="register" class="register-form">
          <div class="form-group">
            <label for="username">Username:</label>
            <input type="text" id="username" v-model="username" required>
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="email" required>
          </div>
          <div class="form-group">
            <label for="password">Password:</label>
            <div class="password-input">
              <input v-if="!showPassword" type="password" id="password" v-model="password" required>
              <input v-else type="text" id="password" v-model="password" required>
             
            </div>
          </div>
          <div class="form-group">
            <label for="confirm-password">Confirm Password:</label>
            <input type="password" id="confirm-password" v-model="confirmPassword" required>
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        showPassword: false
      };
    },
    methods: {
        register() {
      if (!this.username || !this.email || !this.password || !this.confirmPassword) {
        alert('Please fill in all fields.');
        return;
      }
      
      if (this.password !== this.confirmPassword) {
        alert('Passwords do not match.');
        return;
      }

      const user = {
        username: this.username,
        email: this.email,
        password: this.password
      };
      localStorage.setItem('user', JSON.stringify(user));

      this.$router.push('/');
    }
  }
  };
  </script>

<style scoped>
.body {
  background-color: #F1F1F1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #FFFFFF;
  height: 500px;
  width: 450px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.logo-container {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
  width: 100%;
}

input[type="email"],
input[type="password"],
input[type="text"] {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  box-sizing: border-box;
  margin-bottom: 10px;
  background-color: #425BD9;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}

.register-form {
  width: 100%;
  max-width: 300px;
}

.input-label {
  display: block;
  text-align: left;
  margin-bottom: 5px;
}

.password-input {
  position: relative;
}

.password-toggle {
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}

/* Mobile Responsive Styles */
@media (max-width: 768px) {
  .login-container {
    width: 90%;
    height: auto;
    min-height: 450px;
    padding: 20px;
  }
  
  .register-form {
    max-width: 100%;
  }
  
  .logo-container img {
    width: 60px;
    height: 60px;
  }
}

@media (max-width: 480px) {
  .login-container {
    width: 95%;
    height: auto;
    min-height: 400px;
    padding: 15px;
  }
  
  .logo-container {
    margin-bottom: 15px;
  }
  
  .logo-container img {
    width: 50px;
    height: 50px;
  }
  
  .form-group {
    margin-bottom: 12px;
  }
  
  input[type="email"],
  input[type="password"],
  input[type="text"],
  button {
    padding: 8px;
    font-size: 14px;
  }
  
  button {
    margin-bottom: 8px;
  }
}
</style>
