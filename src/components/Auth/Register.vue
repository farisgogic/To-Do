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
        
        <div class="login-link">
          <p>Already have an account? <span @click="goToLogin" class="link-text">Sign in</span></p>
        </div>
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
    },
    
    goToLogin() {
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
  min-height: 100vh;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}

.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #FFFFFF;
  max-width: 500px;
  width: 100%;
  padding: 40px 30px;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  border: 1px solid #E5E5E5;
}

.logo-container {
  margin-bottom: 30px;
}

.logo-container img {
  width: 80px;
  height: 80px;
  object-fit: contain;
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
  width: 100%;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #333;
  font-weight: 500;
  font-size: 14px;
}

input[type="email"],
input[type="password"],
input[type="text"] {
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  box-sizing: border-box;
  border: 2px solid #E5E5E5;
  border-radius: 8px;
  transition: all 0.3s ease;
  background-color: #FAFAFA;
}

input[type="email"]:focus,
input[type="password"]:focus,
input[type="text"]:focus {
  outline: none;
  border-color: #425BD9;
  background-color: #FFFFFF;
  box-shadow: 0 0 0 3px rgba(66, 91, 217, 0.1);
}

button {
  width: 100%;
  padding: 14px;
  font-size: 16px;
  font-weight: 600;
  box-sizing: border-box;
  margin-bottom: 20px;
  background-color: #425BD9;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.3s ease;
}

button:hover {
  background-color: #2948B7;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(66, 91, 217, 0.3);
}

button:active {
  transform: translateY(0);
}

.login-link {
  text-align: center;
  margin-top: 15px;
}

.login-link p {
  margin: 0;
  color: #6c757d;
  font-size: 14px;
}

.link-text {
  color: #425BD9;
  cursor: pointer;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.3s ease;
}

.link-text:hover {
  color: #2948B7;
  text-decoration: underline;
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
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #6c757d;
  transition: color 0.3s ease;
}

.password-toggle:hover {
  color: #425BD9;
}

/* Mobile Responsive Styles */
@media (max-width: 768px) {
  .body {
    padding: 15px;
  }
  
  .login-container {
    padding: 30px 25px;
    max-width: 450px;
  }
  
  .logo-container img {
    width: 70px;
    height: 70px;
  }
  
  .form-group {
    margin-bottom: 18px;
  }
}

@media (max-width: 480px) {
  .body {
    padding: 10px;
  }
  
  .login-container {
    padding: 25px 20px;
    border-radius: 8px;
  }
  
  .logo-container {
    margin-bottom: 25px;
  }
  
  .logo-container img {
    width: 60px;
    height: 60px;
  }
  
  .form-group {
    margin-bottom: 16px;
  }
  
  .form-group label {
    font-size: 13px;
  }
  
  input[type="email"],
  input[type="password"],
  input[type="text"] {
    padding: 10px 14px;
    font-size: 14px;
  }
  
  button {
    padding: 12px;
    font-size: 14px;
    margin-bottom: 15px;
  }
  
  .login-link p {
    font-size: 13px;
  }
}

@media (max-width: 360px) {
  .login-container {
    padding: 20px 15px;
  }
  
  .logo-container img {
    width: 50px;
    height: 50px;
  }
  
  input[type="email"],
  input[type="password"],
  input[type="text"] {
    padding: 8px 12px;
    font-size: 13px;
  }
  
  button {
    padding: 10px;
    font-size: 13px;
  }
  
  .login-link p {
    font-size: 12px;
  }
}
</style>
