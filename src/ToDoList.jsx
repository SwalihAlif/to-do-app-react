import React, { useState } from "react";
import Swal from 'sweetalert2';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { formatDistanceStrict } from "date-fns";







function ToDoList() {

    const [tasks, setTasks] = useState([
        { text: "Wake up", completed: false },
        { text: "Taking a bath", completed: false },
        { text: "Having breakfast", completed: false }
    ]);
    const [newTask, setNewTask] = useState("");
    const [editIndex, setEditIndex] = useState(null);
    const [editedTask, setEditedTask] = useState("");

    function handleInputChange(event) {

        setNewTask(event.target.value)


    }

    function addTask() {
        // Trim the input to avoid whitespace issues
        const trimmedTask = newTask.trim();
    
        // Validation: Ensure the task is not empty
        if (trimmedTask === "") {
            toast.error("Task cannot be empty!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
            });
            return;
        }
    
        // Validation: Ensure the task doesn't exceed 100 characters
        if (trimmedTask.length > 100) {
            toast.error("Task cannot exceed 100 characters!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
            });
            return;
        }
    
        // Validation: Prevent duplicate tasks
        if (tasks.some(task => task.text === trimmedTask)) {
            toast.error("Task already exists!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
            });
            return;
        }
    
        // Proceed with adding the task if all validations pass
        setTasks(t => [...t, 
            { 
                text: trimmedTask, 
                completed: false,
                timestamp: new Date() 
            }
        ]);
        setNewTask("");
    
        // Show success toast
        toast.success("Task added successfully!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
        });
    }
    


    function startEditing(index) {
        setEditIndex(index);
        setEditedTask(tasks[index].text)
    }

    function saveEdit(index) {
        const trimmedTask = editedTask.trim(); // Remove unnecessary whitespace
    
        // Validation: Ensure the edited task is not empty
        if (trimmedTask === "") {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Task cannot be empty!",
                showConfirmButton: false,
                timer: 1500
            });
            return;
        }
    
        // Validation: Ensure the edited task doesn't exceed 100 characters
        if (trimmedTask.length > 100) {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Task cannot exceed 100 characters!",
                showConfirmButton: false,
                timer: 1500
            });
            return;
        }
    
        // Validation: Prevent duplicate tasks (excluding the current task being edited)
        if (tasks.some((task, i) => task.text === trimmedTask && i !== index)) {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Task already exists!",
                showConfirmButton: false,
                timer: 1500
            });
            return;
        }
    
        // Update the task if all validations pass
        const updatedTasks = [...tasks];
        updatedTasks[index] = {
            ...updatedTasks[index], // Keep other properties
            text: trimmedTask,
            timestamp: new Date() // Update timestamp when edited
        };
    
        setTasks(updatedTasks);
        setEditIndex(null); // Exit edit mode
    
        // Show success toast
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Task updated successfully!",
            showConfirmButton: false,
            timer: 1500
        });
    }
    
    

    function deleteTask(index) {
        confirmAlert({
            title: <span className="confirm-title">Confirm Deletion</span>,
            message: <span className="confirm-message">Are you sure you want to delete this task?</span>,
            buttons: [
                {
                    label: "Yes, Delete",
                    onClick: () => {
                        const updatedTasks = tasks.filter((_, i) => i !== index);
                        setTasks(updatedTasks);
                    },
                    
                },
                {
                    label: "Cancel",
                    onClick: () => console.log("Deletion Cancelled")
                }
            ],
            overlayClassName: "custom-overlay"
        });
    }
    

    function toggleCompletion(index) {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, completed: !task.completed } : task
        );

        // Create a new sorted array (React detects change properly)
        const sortedTasks = [...updatedTasks].sort((a, b) => a.completed - b.completed);

        setTasks(sortedTasks);
    }


    return (

        <div className="to-do-list">
            <h1>To-Do-List</h1>
            <div className="input-container">
                <input type="text" 
                placeholder="Type today's task" 
                value={newTask} 
                onChange={handleInputChange} 
                aria-label="Enter the task you want to add"
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        addTask();
                    }
                }}
                />
                <button className="add-btn" 
                onClick={addTask}
                aria-label="Click to add the task"
                >Add</button>

            </div>
            <ol>
                {tasks.map((task, index) =>
                    <li key={index} className={task.completed ? "completed" : ""}>
                        {editIndex !== index &&(
                        <input
                            type="checkbox"
                            className="c-box"
                            checked={task.completed}
                            onChange={() => toggleCompletion(index)}
                        />
                    )}
                        {editIndex === index ? (
                            <>
                                <input
                                    type="text"
                                    value={editedTask}
                                    onChange={(e) => setEditedTask(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            saveEdit(index);
                                        }
                                    }}
                                />
                                <button className="save-btn" onClick={() => saveEdit(index)}>Save</button>
                                <button className="cancel-btn" onClick={() => setEditIndex(null)}>Cancel</button>
                            </>
                        ) : (
                            <>
                                <span className="text">{task.text}</span> {/* Fix: Use task.text */}
                                <span className="timestamp">
                                <i className="fa-solid fa-clock"></i>
                                    {task.timestamp
                                        ? formatDistanceStrict(new Date(task.timestamp), new Date(), { addSuffix: false })
                                            .replace(" seconds", "s")
                                            .replace(" second", "s")
                                            .replace(" minutes", "m")
                                            .replace(" minute", "m")
                                        : ""}
                                </span>


                                <button className="edit-btn" onClick={() => startEditing(index)}><i className="fa-solid fa-pen"></i></button>
                                <button className="delete-btn" onClick={() => deleteTask(index)}><i className="fa-solid fa-trash"></i></button>
                            </>
                        )}
                    </li>
                )}

            </ol>
            <ToastContainer />
        </div>
    )

}

export default ToDoList;
