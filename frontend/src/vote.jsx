import { useEffect, useState } from "react";

export default function Vote() {
  const [candidates, setCandidates] = useState([]);
  const [voted, setVoted] = useState(false);

  // 1. Get candidates from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/candidates")
      .then(res => res.json())
      .then(data => setCandidates(data));
  }, []);

  // 2. Handle Vote
  const handleVote = async (candidateName) => {
    const voter_id = localStorage.getItem("voter_id") || 1;
    const voter_name = localStorage.getItem("voter_name") || "Guest";

    if (!confirm(`Confirm Vote for ${candidateName}?`)) return;

    try {
      const res = await fetch("http://localhost:5000/api/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ voter_id, candidate: candidateName }),
      });

      const result = await res.json();
      alert(result.message);
      
      if (res.ok) {
        setVoted(true);
      }
    } catch (err) {
      alert("Voting failed! Backend not connected");
    }
  };

  return (
    <div className="container" style={{padding: '20px'}}>
      <h2>Vote for Your Candidate - NRI Voting</h2>
      <p>Welcome, {localStorage.getItem("voter_name") || "Voter"}</p>
      
      {voted && <div style={{background: 'lightgreen', padding: '10px'}}>Thank you! Your vote is recorded.</div>}

      <div style={{display: 'grid', gap: '15px', marginTop: '20px'}}>
        {candidates.map((c) => (
          <div key={c.id} style={{border: '1px solid #ccc', padding: '15px', borderRadius: '8px'}}>
            <h3>{c.name}</h3>
            <p>Party: {c.party} | Constituency: {c.constituency}</p>
            <p>Symbol: {c.symbol}</p>
            <button onClick={() => handleVote(c.name)} disabled={voted}>
              {voted ? "Voted" : `Vote ${c.name}`}
            </button>
          </div>
        ))}
      </div>
      
      <br />
      <button onClick={() => window.location.href = "http://localhost:5000/api/results"}>
        View Results (Backend)
      </button>
    </div>
  );
}