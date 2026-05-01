import axios from "axios";
import { useState } from "react";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
const handleSignup = async () => {
  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/signup",
      formData
    );

    alert(res.data.message);
  } catch (error) {
    alert("Signup Failed");
  }
};
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#0f172a",
      }}
    >
      <div
        style={{
          background: "#1e293b",
          padding: "30px",
          borderRadius: "10px",
          width: "300px",
        }}
      >
        <h1 style={{ color: "white", textAlign: "center" }}>Signup</h1>

        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          style={inputStyle}
        />

        <button style={buttonStyle} onClick={handleSignup}>
        Signup
        </button>
      </div>
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
  marginTop: "20px",
  borderRadius: "5px",
  border: "none",
  background: "#3b82f6",
  color: "white",
  cursor: "pointer",
};

export default Signup;