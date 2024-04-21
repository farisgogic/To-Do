<template>
    <div class="todo-box">
        <Navbar />
        <ToDoIntro />
        

        <div class="todo-list">
            <div class="todo">
                <div class="title">
                    <h3>To do</h3>
                    <div class="title-icons">
                        <i class="fa fa-plus-square" aria-hidden="true" @click="showInput = true"></i>
                        <hr>
                    </div>
                </div>
                <hr>
                <input v-show="showInput" type="text" v-model="newTask.name" @keyup.enter="addTask"
                    placeholder="Add new task">
                <div class="task-list" v-bind:style="{ maxHeight: maxListHeight + 'px' }"
                    @dragover.prevent="dragOver(-1, 'todo')" @drop.prevent="drop(-1, 'todo')">
                    <ul>
                        <li v-for="(task, index) in tasks" :key="index" class="task-item" draggable="true"
                            @dragstart="dragStart(index)">
                            <div class="task-left">
                                <input type="checkbox" v-model="task.completed" @change="markTaskAsDone(index)">
                                <span v-if="editingIndex !== index">{{ task.name }}</span>
                                <span v-else>
                                    <input type="text" v-model="editedTaskName" @keyup.enter="updateTask(index)"
                                        @blur="updateTask(index)">
                                    <i class="fa fa-check" aria-hidden="true" @click="updateTask(index)"
                                        style="cursor: pointer;"></i>
                                </span>
                            </div>
                            <div class="task-right">
                                <i class="fa fa-pencil" aria-hidden="true" @click="editTask(index)"
                                    style="cursor: pointer; margin-right: 10px;"></i>
                                <i class="fa fa-trash" aria-hidden="true" @click="deleteTask(index)"
                                    style="cursor: pointer;"></i>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="done">
                <div class="title">
                    <h3>Done</h3>
                    <div class="title-icons">
                        <i class="fa fa-trash" aria-hidden="true" @click="clearDoneTasks"></i>
                        <hr>
                    </div>
                </div>
                <hr>
                <div class="task-list" v-bind:style="{ maxHeight: maxListHeight + 'px' }"
                    @dragover.prevent="dragOver(-1, 'done')" @drop.prevent="drop(-1, 'done')">
                    <ul>
                        <li v-for="(task, index) in doneTasks" :key="'done_' + index" class="task-item" draggable="true"
                            @dragstart="dragStart(index)">
                            <div class="task-left">
                                <span>{{ task.name }}</span>
                            </div>
                            <div class="task-right">
                                <i class="fa fa-undo" aria-hidden="true" @click="undoTask(index)"
                                    style="cursor: pointer; margin-right: 10px;"></i>
                                <i class="fa fa-trash" aria-hidden="true" @click="deleteDoneTask(index)"
                                    style="cursor: pointer;"></i>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from '../Navbar/Navbar.vue';
import ToDoIntro from './ToDoIntro.vue';

export default {
    name: 'ToDoBox',
    components: {
        Navbar,
        ToDoIntro,
    },
    data() {
        return {
            newTask: { name: '', completed: false },
            tasks: [],
            showInput: false,
            maxListHeight: 300,
            doneTasks: [],
            editingIndex: -1,
            editedTaskName: '',
            draggingIndex: -1
        };
    },
    methods: {
        addTask() {
            if (this.newTask.name.trim() !== '') {
                const newTask = { name: this.newTask.name, completed: false };
                this.tasks.push(newTask);
                this.newTask.name = '';
                this.showInput = false;
                this.maxListHeight += 50;
            }
        },

        deleteTask(index) {
            this.tasks.splice(index, 1);
            this.maxListHeight -= 50;
        },
        markTaskAsDone(index) {
            const doneTask = this.tasks.splice(index, 1)[0];
            this.doneTasks.push(doneTask);
        },
        clearDoneTasks() {
            this.doneTasks = [];
        },
        editTask(index) {
            this.editingIndex = index;
            this.editedTaskName = this.tasks[index].name;
        },
        updateTask(index) {
            if (this.editedTaskName.trim() !== '') {
                this.tasks[index].name = this.editedTaskName;
            }
            this.editingIndex = -1;
            this.editedTaskName = '';
        },
        undoTask(index) {
            const undoneTask = this.doneTasks.splice(index, 1)[0];
            undoneTask.completed = false;
            this.tasks.push(undoneTask);
        },
        deleteDoneTask(index) {
            this.doneTasks.splice(index, 1);
        },
        dragStart(index) {
            this.draggingIndex = index;
        },
        dragOver(index, listType) {
            if (this.draggingIndex !== -1 ) {
                if (listType === 'done') {
                    const task = this.doneTasks[this.draggingIndex];
                    task.completed = false;
                    this.tasks.splice(index, 0, task);
                    this.doneTasks.splice(this.draggingIndex, 1);

                } else {
                    const task = this.tasks[this.draggingIndex];
                    task.completed = true;
                    this.doneTasks.splice(index, 0, task);
                    this.tasks.splice(this.draggingIndex, 1);

                }
                this.draggingIndex = -1;
            }
        },



        drop(index, listType) {
            this.dragOver(index, listType);
            this.draggingIndex = -1;
        }
    }
};
</script>

<style scoped>
.todo input {
    justify-items: left;
    text-align: left;
    justify-content: left;
}

.todo-list {
    display: flex;
    margin-top: 30px;
    overflow-x: auto;
    justify-content: center;
    align-items: center;
}

.todo,
.done {
    width: 600px;
    height: 400px;
    background-color: white;
    margin-right: 10px;
    overflow-y: scroll;
    overflow-x: hidden;

}

.task-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
}

.task-left {
    display: flex;
    align-items: center;
}

.task-right {
    display: flex;
    align-items: center;
}

.todo li {
    color: rgb(0, 0, 0);
}

.done li {
    color: rgb(170, 168, 168);
}

.task-list {
    text-align: left;
    margin-left: 20px;
    overflow-y: auto;
}

.todo-list input[type="text"] {
    border: none;
    text-align: left;
    background-color: rgb(196, 193, 193);
    justify-content: left;
    width: 80%;
    border-radius: 5px;
}



.title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0px 20px;
}

.title-icons {
    display: flex;
    align-items: center;
}

.title-icons i {
    margin-right: 10px;
    font-size: 20px;
    cursor: pointer;
}


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

.todo-list {
    margin-top: 20px;
}

.todo-list h3 {
    margin-bottom: 10px;
}

.todo-list ul {
    list-style: none;
    padding: 0;
}

.todo-list li {
    margin-bottom: 5px;
}

.todo-list input[type="checkbox"] {
    margin-right: 5px;
}

.add-task {
    margin-top: 10px;
}

li {
    display: flex;
    justify-content: space-between;
    margin-right: 30px;
}
</style>
