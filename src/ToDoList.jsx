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
        if (newTask.trim() !== "") {
            setTasks(t => [...t, 
                { 
                    text: newTask, 
                    completed: false,
                    timestamp: new Date() 
                }]);
            setNewTask("");

            // Show success toast
            toast.success("Task added successfully!", {
                position: "top-right",
                autoClose: 2000, // Disappears after 2 seconds
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
            });
        } else {
            toast.error("Task cannot be empty!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
            });
        }
    }


    function startEditing(index) {
        setEditIndex(index);
        setEditedTask(tasks[index].text)
    }

    function saveEdit(index) {
        const updatedTasks = [...tasks];
        updatedTasks[index] = {
            ...updatedTasks[index], // Keep other properties
            text: editedTask,
            timestamp: new Date() // Update timestamp when edited
        };
    
        setTasks(updatedTasks);
        setEditIndex(null);
    
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
            title: "Confirm Deletion",
            message: "Are you sure you want to delete this task?",
            buttons: [
                {
                    label: "Yes, Delete",
                    onClick: () => {
                        const updatedTasks = tasks.filter((_, i) => i !== index);
                        setTasks(updatedTasks);
                    },
                    className: "confirm-delete-btn" // Custom styling if needed
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
            <div>
                <input type="text" placeholder="Type today's task" value={newTask} onChange={handleInputChange} />
                <button className="add-btn" onClick={addTask}>Add</button>

            </div>
            <ol>
                {tasks.map((task, index) =>
                    <li key={index} className={task.completed ? "completed" : ""}>
                        <input
                            type="checkbox"
                            className="c-box"
                            checked={task.completed}
                            onChange={() => toggleCompletion(index)}
                        />
                        {editIndex === index ? (
                            <>
                                <input
                                    type="text"
                                    value={editedTask}
                                    onChange={(e) => setEditedTask(e.target.value)}
                                />
                                <button className="save-btn" onClick={() => saveEdit(index)}>Save</button>
                                <button className="cancel-btn" onClick={() => setEditIndex(null)}>Cancel</button>
                            </>
                        ) : (
                            <>
                                <span className="text">{task.text}</span> {/* Fix: Use task.text */}
                                <span className="timestamp">
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
