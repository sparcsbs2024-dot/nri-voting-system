import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Register() {
  const nav = useNavigate();
  const [msg, setMsg] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(""); setIsError(false);
    const f = e.target;
    const data = {
      name: f[0].value,
      email: f[1].value,
      passport: f[2].value,
      constituency: f[3].value,
      password: f[4].value,
    };
    const res = await fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (res.ok) {
      setIsError(false);
      setMsg(result.message + " Redirecting...");
      setTimeout(() => nav("/login"), 1200);
    } else {
      setIsError(true);
      setMsg(result.message);
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      {msg && <div style={{padding:'10px', background: isError? '#f8d7da' : '#d4edda', color: isError? 'red' : 'green', borderRadius:'5px', marginBottom:'10px'}}>{msg}</div>}
      <form onSubmit={handleSubmit}>
        <input defaultValue="PARAMESWARAN S" required />
        <input defaultValue="par.cse20@gmail.com" required />
        <input defaultValue="P1234567" required />
        <input defaultValue="Chennai Central" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}