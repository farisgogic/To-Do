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
                            placeholder="Enter new task..."
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
                         data-target-list="todo"
                         @dragover.prevent="dragOver($event, 'todo')"
                         @drop.prevent="drop($event, 'todo')"
                         :class="{ 'drag-over': isDragOver && draggedFromList !== 'todo' }">
                        <ul>
                            <li v-for="(task, index) in tasks" :key="'todo_' + index" class="task-item" 
                                draggable="true"
                                :data-index="index"
                                :data-list-type="'todo'"
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
                            {{ isMobile ? 'Add or drag tasks here' : 'Drag tasks here' }}
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
                         data-target-list="done"
                         @dragover.prevent="dragOver($event, 'done')"
                         @drop.prevent="drop($event, 'done')"
                         :class="{ 'drag-over': isDragOver && draggedFromList !== 'done' }">
                        <ul>
                            <li v-for="(task, index) in doneTasks" :key="'done_' + index" class="task-item" 
                                draggable="true"
                                :data-index="index"
                                :data-list-type="'done'"
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
                            {{ isMobile ? 'Completed tasks will appear here' : 'Drag completed tasks here' }}
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
            isDragOver: false,
            isMobile: false,
            touchStartY: 0,
            touchStartX: 0,
            isDragging: false
        };
    },
    mounted() {
        this.checkIfMobile();
        window.addEventListener('resize', this.checkIfMobile);
        
        // Add touch event listeners for mobile drag and drop
        this.$el.addEventListener('touchstart', this.handleTouchStart, { passive: false });
        this.$el.addEventListener('touchmove', this.handleTouchMove, { passive: false });
        this.$el.addEventListener('touchend', this.handleTouchEnd, { passive: false });
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.checkIfMobile);
        this.$el.removeEventListener('touchstart', this.handleTouchStart);
        this.$el.removeEventListener('touchmove', this.handleTouchMove);
        this.$el.removeEventListener('touchend', this.handleTouchEnd);
        

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
            
            // For mobile compatibility
            if (event.dataTransfer) {
                event.dataTransfer.effectAllowed = 'move';
                event.dataTransfer.setData('text/html', event.target.outerHTML);
            }
            
            event.target.style.opacity = '0.5';
            event.target.classList.add('dragging');
        },

        dragEnd(event) {
            event.target.style.opacity = '1';
            event.target.classList.remove('dragging');
            this.isDragOver = false;
        },

        dragOver(event, targetList) {
            if (this.draggedItem && this.draggedFromList !== targetList) {
                this.isDragOver = true;
            }
        },

        drop(event, targetList) {
            this.isDragOver = false;
            event.preventDefault();
            
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
        },

        // Mobile-specific methods
        checkIfMobile() {
            this.isMobile = window.innerWidth <= 768 || 'ontouchstart' in window;
        },

        handleTouchStart(event) {
            if (!this.isMobile || !event.target.closest('.task-item')) return;
            
            this.touchStartY = event.touches[0].clientY;
            this.touchStartX = event.touches[0].clientX;
            
            const taskItem = event.target.closest('.task-item');
            const index = parseInt(taskItem.dataset.index);
            const listType = taskItem.dataset.listType;
            
            this.draggedItem = {
                index: index,
                data: listType === 'todo' ? this.tasks[index] : this.doneTasks[index],
                element: taskItem
            };
            this.draggedFromList = listType;
        },

        handleTouchMove(event) {
            if (!this.isMobile || !this.draggedItem) return;
            
            event.preventDefault();
            
            const touch = event.touches[0];
            this.currentTouch = touch;
            const deltaY = Math.abs(touch.clientY - this.touchStartY);
            const deltaX = Math.abs(touch.clientX - this.touchStartX);
            
            // Start dragging if moved enough - use same animation as desktop
            if (deltaY > 10 || deltaX > 10) {
                if (!this.isDragging) {
                    this.isDragging = true;
                    // Use same styling as desktop drag
                    this.draggedItem.element.style.opacity = '0.5';
                    this.draggedItem.element.classList.add('dragging');
                }
            }
            
            // Check which drop zone we're over
            const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
            const dropZone = elementBelow?.closest('.drop-zone');
            
            if (dropZone) {
                const targetList = dropZone.dataset.targetList;
                if (targetList && targetList !== this.draggedFromList) {
                    this.isDragOver = true;
                } else {
                    this.isDragOver = false;
                }
            } else {
                this.isDragOver = false;
            }
        },

        handleTouchEnd(event) {
            // Only handle touch events on mobile devices
            if (!this.isMobile) return;
            
            if (!this.draggedItem) {
                this.resetDragState();
                return;
            }
            
            if (this.isDragging) {
                const touch = event.changedTouches[0];
                const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
                const dropZone = elementBelow?.closest('.drop-zone');
                
                if (dropZone) {
                    const targetList = dropZone.dataset.targetList;
                    if (targetList && targetList !== this.draggedFromList) {
                        this.performDrop(targetList);
                    }
                }
            }
            
            this.resetDragState();
        },

        performDrop(targetList) {
            if (!this.draggedItem) return;

            const sourceList = this.draggedFromList;
            const sourceIndex = this.draggedItem.index;
            const taskData = { ...this.draggedItem.data };

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
        },

        resetDragState() {
            if (this.draggedItem?.element) {
                this.draggedItem.element.style.opacity = '1';
                this.draggedItem.element.style.transform = 'scale(1)';
                this.draggedItem.element.classList.remove('dragging', 'mobile-dragging');
            }
            
            this.draggedItem = null;
            this.draggedFromList = null;
            this.isDragOver = false;
            this.isDragging = false;
            this.currentTouch = null;
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
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
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
    border-radius: 8px;
    padding: 10px;
}

.drop-zone.drag-over {
    background-color: rgba(66, 91, 217, 0.1);
    border: 2px dashed #425BD9;
    animation: pulse 1s infinite;
}

@keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.7; }
    100% { opacity: 1; }
}

.empty-list {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 120px;
    color: #6c757d;
    font-style: italic;
    font-size: 13px;
    text-align: center;
    padding: 20px;
    background-color: #F8F9FA;
    border: 2px dashed #E9ECEF;
    border-radius: 8px;
    margin: 15px 10px;
}

.task-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
    padding: 12px 16px;
    border-radius: 8px;
    transition: all 0.3s ease;
    background-color: #FAFAFA;
    border: 1px solid #E9ECEF;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    min-height: 48px;
}

.task-item:hover {
    background-color: #f0f2f5;
    border-color: #D1D5DB;
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.task-item[draggable="true"] {
    cursor: move;
}

.task-item.dragging {
    opacity: 0.7;
    transform: scale(1.05);
    z-index: 1000;
}



/* Mobile touch styles */
@media (max-width: 768px) {
    .task-item {
        padding: 16px;
        margin-bottom: 12px;
        font-size: 15px;
        min-height: 52px;
        touch-action: manipulation;
    }
    
    .task-item:active {
        background-color: #e3f2fd;
        transform: scale(0.98);
    }
    
    .task-left {
        gap: 14px;
    }
    
    .task-left input[type="checkbox"] {
        width: 18px;
        height: 18px;
    }
    
    .task-right {
        gap: 12px;
    }
}

.task-left {
    display: flex;
    align-items: center;
    flex: 1;
    min-width: 0;
    gap: 12px;
}

.task-left input[type="checkbox"] {
    width: 16px;
    height: 16px;
    cursor: pointer;
    flex-shrink: 0;
    accent-color: #425BD9;
}

.task-left span {
    word-break: break-word;
    line-height: 1.4;
    text-align: left;
}

.task-right {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-left: 10px;
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
    padding: 0 5px;
}

.title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0px 20px;
    padding: 15px 0 10px 0;
}

.title h3 {
    margin: 0;
    color: #2c3e50;
    font-weight: 600;
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
    margin-top: 60px;
}

/* Better scrollbar for webkit browsers */
.task-list::-webkit-scrollbar {
    width: 6px;
}

.task-list::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
}

.task-list::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;
}

.task-list::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
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
    gap: 25px;
    padding: 0 20px;
    margin: 30px auto;
    max-width: 600px;
  }
  
  .todo,
  .done {
    width: 100%;
    height: auto;
    min-height: 400px;
    margin: 0 auto;
  }
  
  .title h3 {
    font-size: 20px;
  }
  
  .title-icons i {
    font-size: 20px;
  }
  
  .task-list {
    margin-left: 20px;
    margin-right: 20px;
  }
  
  .drop-zone {
    min-height: 250px;
  }
}

@media (max-width: 768px) {
  .todo-list {
    padding: 0 15px;
    gap: 20px;
  }
  
  .todo,
  .done {
    min-height: 350px;
  }
  
  .title h3 {
    font-size: 18px;
  }
  
  .title-icons i {
    font-size: 18px;
    padding: 8px;
  }
  
  .input-wrapper {
    flex-direction: column;
    gap: 10px;
  }
  
  .task-input {
    width: 100%;
    padding: 12px 16px;
  }
  
  .input-buttons {
    width: 100%;
    justify-content: center;
    gap: 10px;
  }
  
  .add-btn,
  .cancel-btn {
    flex: 1;
    min-width: 120px;
  }
  
  .drop-zone {
    min-height: 200px;
  }
}

@media (max-width: 480px) {
  .todo-list {
    padding: 0 10px;
    margin: 20px auto;
    gap: 15px;
  }
  
  .todo,
  .done {
    min-height: 320px;
    border-radius: 8px;
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
    padding: 6px;
  }
  
  .task-list {
    margin-left: 15px;
    margin-right: 15px;
  }
  
  .task-item {
    margin-bottom: 10px;
    font-size: 14px;
    padding: 14px 16px;
    min-height: 56px;
  }
  
  .task-left {
    gap: 16px;
  }
  
  .task-left input[type="checkbox"] {
    width: 20px;
    height: 20px;
  }
  
  .task-icon {
    font-size: 15px;
    margin-right: 8px;
    padding: 4px;
  }
  
  .add-task-container {
    padding: 10px 15px;
  }
  
  .task-input {
    font-size: 14px;
    padding: 10px 14px;
  }
  
  .add-btn,
  .cancel-btn {
    padding: 10px 12px;
    font-size: 14px;
  }
  
  .empty-list {
    font-size: 13px;
    height: 150px;
    padding: 15px;
  }
  
  .drop-zone {
    min-height: 180px;
  }
  
  li {
    margin-right: 0;
  }
}

@media (max-width: 360px) {
  .todo-list {
    padding: 0 8px;
  }
  
  .todo,
  .done {
    min-height: 300px;
  }
  
  .title {
    margin: 0px 12px;
  }
  
  .task-list {
    margin-left: 12px;
    margin-right: 12px;
  }
  
  .task-item {
    padding: 12px 14px;
    font-size: 13px;
    min-height: 50px;
  }
  
  .task-left input[type="checkbox"] {
    width: 18px;
    height: 18px;
  }
  
  .task-input {
    padding: 8px 12px;
    font-size: 13px;
  }
  
  .add-btn,
  .cancel-btn {
    padding: 8px 10px;
    font-size: 13px;
  }
}
</style>