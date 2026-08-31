import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const nav = useNavigate();
  const [msg, setMsg] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(""); setIsError(false);
    const email = e.target[0].value;
    const password = e.target[1].value;

    const res = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const result = await res.json();

    if (!res.ok) {
      setIsError(true);
      setMsg(result.message); // No alert, shows in page
    } else {
      setIsError(false);
      setMsg("Login Successful! Redirecting...");
      localStorage.setItem("voter_id", result.voter.id);
      localStorage.setItem("voter_name", result.voter.name);
      setTimeout(() => nav("/dashboard"), 1000);
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      {msg && <div style={{padding:'10px', background: isError? '#f8d7da' : '#d4edda', color: isError? 'red' : 'green', borderRadius:'5px', marginBottom:'10px'}}>{msg}</div>}

      <form onSubmit={handleSubmit}>
        <input placeholder="Email" defaultValue="par.cse20@gmail.com" required />
        <input placeholder="Password" type="password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}