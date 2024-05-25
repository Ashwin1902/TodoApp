// src/components/TaskList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await axios.get('http://localhost:5000/tasks');
    setTasks(response.data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/tasks/${id}`);
    fetchTasks();
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Task List</h1>
      <button
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => navigate('/task/new')}
      >
        Add Task
      </button>
      <ul>
        {tasks.map(task => (
          <li key={task.id} className="mb-2 p-2 border rounded flex justify-between items-center">
            <div>
              <div className="font-bold">{task.title}</div>
              <div>{task.status} - {task.dueDate}</div>
            </div>
            <div>
              <button
                className="mr-2 px-2 py-1 bg-yellow-500 text-white rounded"
                onClick={() => navigate(`/task/${task.id}`)}
              >
                Edit
              </button>
              <button
                className="px-2 py-1 bg-red-500 text-white rounded"
                onClick={() => handleDelete(task.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
