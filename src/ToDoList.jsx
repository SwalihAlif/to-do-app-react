import React, {useState} from "react";


function ToDoList() {

    const [tasks, setTasks] = useState(["eat breakfast", "take a shower", "walk the dog"]);
    const [newTask, setNewTask] = useState("");

    function handleInputChange(event) {

        setNewTask(event.target.value)


    }

    function addTask() {

    }

    function editTask(index) {

    }

    function deleteTask(index) {

    }

    function moveUp(index) {

    }

    function moveDown(index) {

    }

    return (
        <div>
            <h1>To-Do-List</h1>
            <div>
                <input type="text" placeholder="Type today's task" value={newTask} onChange={handleInputChange} />
                <button className="add-btn" onClick={addTask}>Add</button>

            </div>
            <ol>
                {tasks.map((task, index) => 
                <li key={index}>
                    <span className="text">{task}</span>
                    <button className="edit-btn" onClick={() => editTask(index)}>Edit</button>
                    <button className="delete-btn" onClick={() => deleteTask(index)}>Delete</button>
                    <button className="up-btn" onClick={() => moveUp(index)}>⬆️</button>
                    <button className="down-btn" onClick={() => moveDown(index)}>⬇️</button>
                </li>
                )}
            </ol>
        </div>
    )

}

export default ToDoList;