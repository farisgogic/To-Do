<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      showPassword: false
    };
  },
  methods: {
    login() {
      const storedUser = JSON.parse(localStorage.getItem('user'));

      if (storedUser && this.email === storedUser.email && this.password === storedUser.password) {
        console.log('Login successful!');
        this.$router.push('/todo'); 
      } else {
        console.log('Invalid email or password.');
        alert('Invalid email or password. Please try again.');
      }
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },

    register(){
      this.$router.push('/register'); 
    }
  }
};
</script>

<template>
  <div class="body">
    <div class="login-container">
      <div class="logo-container">
        <img src="/src/assets/Logo.png" alt="Logo">
      </div>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required>
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <div class="password-input">
            <input v-if="!showPassword" type="password" id="password" v-model="password" required>
            <input v-else type="text" id="password" v-model="password" required>
            <span class="password-toggle" @click="togglePasswordVisibility">
              <i class="fa fa-eye"></i>
            </span>
          </div>
        </div>
        <button @click="login">Login</button>
        <button @click="register" type="button">Register</button>
      </form>
    </div>
  </div>
</template>



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
  height: 400px;
  width: 400px;
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
}

input[type="email"],
input[type="password"],
input[type="text"],
button {
  width: 100%;
  padding: 10px;
  font-size: 16px;
}

button {
  background-color: #425BD9;
  color: #fff;
  border: none;
  cursor: pointer;
}

.input-label {
  display: block;
  text-align: left;
  margin-bottom: 5px;
}

.input-label,
input[type="email"],
input[type="password"],
button {
  margin-bottom: 5px;
  width: 100%;
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
</style>
