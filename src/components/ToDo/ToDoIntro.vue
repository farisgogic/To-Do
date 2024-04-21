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
    padding: 10px 2%;
}

.todo-img {
    position: absolute;
    top: 50px;
    z-index: -1;
    right: 15%;
}

.todo-text {
    margin-left: 20%;
    margin-top: 5%;
    text-align: left;
    font-family: Roboto-Regular;
    font-size: 16px;
}

.todo-text h2 {
    font-weight: bolder;
    font-size: 48px;
    font-family: Roboto-Bold;
    margin: 0;
    padding: 0;
}

.todo-text p {
    font-size: 12px;
}
</style>