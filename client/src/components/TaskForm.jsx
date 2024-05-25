// src/components/TaskForm.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const TaskForm = () => {
  const [task, setTask] = useState({ title: '', description: '', status: 'pending', dueDate: '' });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchTask();
    }
  }, [id]);

  const fetchTask = async () => {
    const response = await axios.get(`http://localhost:5000/tasks/${id}`);
    setTask(response.data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await axios.put(`http://localhost:5000/tasks/${id}`, task);
    } else {
      await axios.post('http://localhost:5000/tasks', task);
    }
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h1 className="text-2xl font-bold mb-4">{id ? 'Edit Task' : 'Add Task'}</h1>
      <div className="mb-4">
        <label className="block mb-1">Title</label>
        <input
          type="text"
          name="title"
          value={task.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Description</label>
        <textarea
          name="description"
          value={task.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block mb-1">Status</label>
        <select
          name="status"
          value={task.status}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-1">Due Date</label>
        <input
          type="date"
          name="dueDate"
          value={task.dueDate}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
    </form>
  );
};

export default TaskForm;
