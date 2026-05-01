import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
const [formData, setFormData] = useState({
  title: "",
  description: "",
});
const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};
const createTask = async () => {
  try {
    const token = localStorage.getItem("token");

    await axios.post(
      "http://localhost:5000/api/tasks/create",
      formData,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    fetchTasks();

    setFormData({
      title: "",
      description: "",
    });

  } catch (error) {
    console.log(error);
  }
};
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/tasks/all",
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        padding: "20px",
      }}
    >
      <h1>Task Dashboard</h1>
      <button
  onClick={() => {
    localStorage.removeItem("token");
    window.location.href = "/";
  }}
  style={{
    padding: "10px 15px",
    background: "red",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  }}
>
  Logout
</button>
<div
  style={{
    background: "#1e293b",
    padding: "20px",
    borderRadius: "10px",
    marginTop: "20px",
  }}
>
  <input
    type="text"
    name="title"
    placeholder="Enter Task Title"
    value={formData.title}
    onChange={handleChange}
    style={inputStyle}
  />

  <input
    type="text"
    name="description"
    placeholder="Enter Description"
    value={formData.description}
    onChange={handleChange}
    style={inputStyle}
  />

  <button style={buttonStyle} onClick={createTask}>
    Create Task
  </button>
</div>
      {tasks.map((task) => (
        <div
          key={task._id}
          style={{
            background: "#1e293b",
            padding: "15px",
            marginTop: "15px",
            borderRadius: "10px",
          }}
        >
          <h3>{task.title}</h3>

          <p>{task.description}</p>

          <p>Status: {task.status}</p>
        </div>
      ))}
    </div>
  );
}
const inputStyle = {
  width: "100%",
  padding: "10px",
  marginTop: "10px",
  borderRadius: "5px",
  border: "none",
};

const buttonStyle = {
  width: "100%",
  padding: "10px",
  marginTop: "15px",
  borderRadius: "5px",
  border: "none",
  background: "#3b82f6",
  color: "white",
  cursor: "pointer",
};
export default Dashboard;