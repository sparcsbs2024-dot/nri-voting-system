import { Link } from "react-router-dom";
export default function Dashboard() {
  return (
    <div className="container">
      <h2>Dashboard</h2>
      <div className="success">Welcome! You are verified as NRI Voter.</div>
      <p>Passport verified. You can now vote.</p>
      <Link to="/candidates"><button>View Candidates & Vote</button></Link>
    </div>
  )
}