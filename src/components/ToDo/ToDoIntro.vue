<template>
    <div class="todo-intro">
            <div class="todo-text">
                <h2>Manage your to do list</h2>
                <p>Click on checkbox or drag and drop to done</p>
            </div>

            <div class="todo-img">
                <img src="@/assets/todo.png">
            </div>
        </div>
</template>

<script>
</script>

<style scoped>

.todo-intro {
    display: flex;
    justify-content: space-between;
    max-width: 1240px;
    margin: 0 auto;
    padding: 10px 20px;
}

.todo-img {
    position: absolute;
    top: 120px;
    right: 0;
    z-index: 1;
    pointer-events: none;
}

.todo-text {
    margin-top: 5%;
    text-align: left;
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
}

.todo-text h2 {
    font-weight: bolder;
    font-size: 48px;
    font-family: 'Roboto', sans-serif;
    font-weight: 700;
    margin: 0;
    padding: 0;
}

.todo-text p {
    font-size: 12px;
}

/* Mobile Responsive Styles */
@media (max-width: 1024px) {
  .todo-intro {
    flex-direction: column;
    padding: 10px 15px;
    align-items: center;
    text-align: center;
    padding-top: 40px;
  }
  
  .todo-text {
    margin-top: 2%;
    order: 2;
  }
  
  .todo-text h2 {
    font-size: 36px;
  }
  
  .todo-text p {
    font-size: 14px;
  }
  
  .todo-img {
    position: relative;
    top: auto;
    right: auto;
    order: 1;
  }
  
  .todo-img img {
    width: 300px;
    height: auto;
  }
}

@media (max-width: 768px) {
  .todo-text h2 {
    font-size: 32px;
  }
  
  .todo-img img {
    width: 200px;
  }
}

@media (max-width: 480px) {
  .todo-intro {
    padding: 10px;
  }
  
  .todo-text h2 {
    font-size: 28px;
  }
  
  .todo-text p {
    font-size: 12px;
  }
  
  .todo-img img {
    width: 120px;
  }
}
</style>