<template>
    <div class="todo-box">
        <Navbar />
        <ToDoIntro />
        

        <div class="todo-list">
            <div class="todo">
                <div class="title">
                    <h3>To do</h3>
                    <div class="title-icons">
                        <i class="fa fa-plus-square" aria-hidden="true" @click="toggleInput"></i>
                        <hr>
                    </div>
                </div>
                <hr>
                
                <!-- Poboljšani input za unos novih taskova -->
                <div v-show="showInput" class="add-task-container">
                    <div class="input-wrapper">
                        <input 
                            ref="taskInput"
                            type="text" 
                            v-model="newTask.name" 
                            @keyup.enter="addTask"
                            @keyup.esc="cancelInput"
                            placeholder="Unesite novi task..."
                            class="task-input"
                        >
                        <div class="input-buttons">
                            <button @click="addTask" class="add-btn" :disabled="!newTask.name.trim()">
                                <i class="fa fa-check"></i>
                            </button>
                            <button @click="cancelInput" class="cancel-btn">
                                <i class="fa fa-times"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <div class="task-list" v-bind:style="{ maxHeight: maxListHeight + 'px' }">
                    <div class="drop-zone" 
                         @dragover.prevent="dragOver($event, 'todo')"
                         @drop.prevent="drop($event, 'todo')"
                         :class="{ 'drag-over': isDragOver && draggedFromList !== 'todo' }">
                        <ul>
                            <li v-for="(task, index) in tasks" :key="'todo_' + index" class="task-item" 
                                draggable="true"
                                @dragstart="dragStart($event, index, 'todo')"
                                @dragend="dragEnd">
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
                                    <i class="fa fa-pencil task-icon edit-icon" aria-hidden="true" @click="editTask(index)"></i>
                                    <i class="fa fa-trash task-icon delete-icon" aria-hidden="true" @click="deleteTask(index)"></i>
                                </div>
                            </li>
                        </ul>
                        <div v-if="tasks.length === 0" class="empty-list">
                            Povucite taskove ovdje
                        </div>
                    </div>
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
                <div class="task-list" v-bind:style="{ maxHeight: maxListHeight + 'px' }">
                    <div class="drop-zone" 
                         @dragover.prevent="dragOver($event, 'done')"
                         @drop.prevent="drop($event, 'done')"
                         :class="{ 'drag-over': isDragOver && draggedFromList !== 'done' }">
                        <ul>
                            <li v-for="(task, index) in doneTasks" :key="'done_' + index" class="task-item" 
                                draggable="true"
                                @dragstart="dragStart($event, index, 'done')"
                                @dragend="dragEnd">
                                <div class="task-left">
                                    <span>{{ task.name }}</span>
                                </div>
                                <div class="task-right">
                                    <i class="fa fa-undo task-icon undo-icon" aria-hidden="true" @click="undoTask(index)"></i>
                                    <i class="fa fa-trash task-icon delete-icon" aria-hidden="true" @click="deleteDoneTask(index)"></i>
                                </div>
                            </li>
                        </ul>
                        <div v-if="doneTasks.length === 0" class="empty-list">
                            Povucite completed taskove ovdje
                        </div>
                    </div>
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
            draggedItem: null,
            draggedFromList: null,
            isDragOver: false
        };
    },
    methods: {
        toggleInput() {
            this.showInput = !this.showInput;
            if (this.showInput) {
                this.$nextTick(() => {
                    this.$refs.taskInput.focus();
                });
            } else {
                this.cancelInput();
            }
        },

        addTask() {
            if (this.newTask.name.trim() !== '') {
                const newTask = { name: this.newTask.name.trim(), completed: false };
                this.tasks.push(newTask);
                this.newTask.name = '';
                this.showInput = false;
                this.maxListHeight += 50;
            }
        },

        cancelInput() {
            this.newTask.name = '';
            this.showInput = false;
        },

        deleteTask(index) {
            this.tasks.splice(index, 1);
            this.maxListHeight -= 50;
        },

        markTaskAsDone(index) {
            const doneTask = this.tasks.splice(index, 1)[0];
            doneTask.completed = true;
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
                this.tasks[index].name = this.editedTaskName.trim();
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

        dragStart(event, index, listType) {
            this.draggedItem = {
                index: index,
                data: listType === 'todo' ? this.tasks[index] : this.doneTasks[index]
            };
            this.draggedFromList = listType;
            
            event.target.style.opacity = '0.5';
        },

        dragEnd(event) {
            event.target.style.opacity = '1';
            this.isDragOver = false;
        },

        dragOver(event, targetList) {
            if (this.draggedItem && this.draggedFromList !== targetList) {
                this.isDragOver = true;
            }
        },

        drop(event, targetList) {
            this.isDragOver = false;
            
            if (!this.draggedItem) return;

            const sourceList = this.draggedFromList;
            const sourceIndex = this.draggedItem.index;
            const taskData = { ...this.draggedItem.data };

            if (sourceList !== targetList) {
                if (sourceList === 'todo') {
                    this.tasks.splice(sourceIndex, 1);
                } else {
                    this.doneTasks.splice(sourceIndex, 1);
                }

                if (targetList === 'todo') {
                    taskData.completed = false;
                    this.tasks.push(taskData);
                } else {
                    taskData.completed = true;
                    this.doneTasks.push(taskData);
                }
            }

            this.draggedItem = null;
            this.draggedFromList = null;
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
    margin: 30px auto;
    gap: 20px;
    justify-content: center;
    align-items: flex-start;
    max-width: 1240px;
    padding: 0 20px;
    position: relative;
    z-index: 2;
}

.todo,
.done {
    width: 600px;
    height: 400px;
    background-color: white;
    overflow-y: auto;
    overflow-x: hidden;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border: 1px solid #E5E5E5;
}

.add-task-container {
    padding: 10px 20px;
    background-color: #f8f9fa;
    border-bottom: 1px solid #e9ecef;
    margin-bottom: 10px;
}

.input-wrapper {
    display: flex;
    align-items: center;
    gap: 10px;
}

.task-input {
    flex: 1;
    padding: 10px 12px;
    border: 2px solid #e9ecef;
    border-radius: 8px;
    font-size: 14px;
    transition: border-color 0.3s ease;
    background-color: white;
}

.task-input:focus {
    outline: none;
    border-color: #425BD9;
    box-shadow: 0 0 0 3px rgba(66, 91, 217, 0.1);
}

.input-buttons {
    display: flex;
    gap: 5px;
}

.add-btn,
.cancel-btn {
    padding: 10px 12px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}

.add-btn {
    background-color: #425BD9;
    color: white;
}

.add-btn:hover:not(:disabled) {
    background-color: #2948B7;
    transform: translateY(-1px);
}

.add-btn:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
}

.cancel-btn {
    background-color: #6c757d;
    color: white;
}

.cancel-btn:hover {
    background-color: #5a6268;
    transform: translateY(-1px);
}

.drop-zone {
    min-height: 310px;
    transition: all 0.3s ease;
}

.drop-zone.drag-over {
    background-color: rgba(66, 91, 217, 0.1);
    border: 2px dashed #425BD9;
}

.empty-list {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 150px;
    color: #6c757d;
    font-style: italic;
    font-size: 14px;
}

.task-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
    padding: 5px;
    border-radius: 4px;
    transition: background-color 0.2s ease;
}

.task-item:hover {
    background-color: #f8f9fa;
}

.task-item[draggable="true"] {
    cursor: move;
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
    overflow-y: auto;
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
    color: #425BD9;
    transition: color 0.3s ease;
}

.title-icons i:hover {
    color: #2948B7;
}

.task-icon {
    cursor: pointer;
    margin-right: 10px;
    transition: color 0.3s ease;
}

.edit-icon {
    color: #425BD9;
}

.edit-icon:hover {
    color: #2948B7;
}

.delete-icon {
    color: #DC3545;
}

.delete-icon:hover {
    color: #B02A37;
}

.undo-icon {
    color: #28A745;
}

.undo-icon:hover {
    color: #1E7E34;
}

.todo-list {
    margin-top: 120px;
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
    margin: 5px;
}

@media (max-width: 1024px) {
  .todo-list {
    flex-direction: column;
    gap: 20px;
    padding: 0 15px;
    margin: 20px auto;
  }
  
  .todo,
  .done {
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    height: 350px;
  }
  
  .title h3 {
    font-size: 18px;
  }
  
  .title-icons i {
    font-size: 18px;
  }
  
  .task-list {
    margin-left: 15px;
    margin-right: 15px;
  }
}

@media (max-width: 768px) {
  .todo,
  .done {
    max-width: 450px;
    height: 320px;
  }
  
  .title h3 {
    font-size: 17px;
  }
  
  .title-icons i {
    font-size: 17px;
  }
  
  .input-wrapper {
    flex-direction: column;
    gap: 8px;
  }
  
  .task-input {
    width: 100%;
  }
  
  .input-buttons {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .todo-list {
    padding: 0 10px;
    margin: 15px auto;
  }
  
  .todo,
  .done {
    height: 300px;
  }
  
  .title {
    margin: 0px 15px;
  }
  
  .title h3 {
    font-size: 16px;
  }
  
  .title-icons i {
    font-size: 16px;
    margin-right: 8px;
  }
  
  .task-list {
    margin-left: 10px;
    margin-right: 10px;
  }
  
  .task-item {
    margin-bottom: 8px;
    font-size: 14px;
  }
  
  .task-icon {
    font-size: 14px;
    margin-right: 8px;
  }
  
  .add-task-container {
    padding: 8px 15px;
  }
  
  .task-input {
    font-size: 14px;
    padding: 8px 10px;
  }
  
  .add-btn,
  .cancel-btn {
    padding: 8px 10px;
    font-size: 13px;
  }
  
  li {
    margin-right: 15px;
  }
}
</style>