import { Link } from "react-router-dom";
export default function Home() {
  return (
    <>
      <nav><h3>NRI Voting System</h3><div><Link to="/login">Login</Link><Link to="/register">Register</Link></div></nav>
      <div className="container" style={{textAlign:"center"}}><h1>Secure NRI Voting</h1><p>Vote from anywhere in the world securely.</p><Link to="/register"><button>Get Started</button></Link></div>
    </>
  )
}