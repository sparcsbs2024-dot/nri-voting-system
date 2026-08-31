import { useState } from "react";
export default function Candidates() {
  const [voted, setVoted] = useState(null);
  const list = [{id:1, name:"M.K. Stalin", party:"DMK"}, {id:2, name:"C. Joseph Vijay", party:"TVK"}, {id:3, name: "Edappadi.K. Palanisamy", party:"AIADMK"}, {id:4, name: "Seeman", party:"NTK" }];
  return (
    <div className="container">
      <h2>Candidates</h2>
      {voted && <div className="success">You voted for {voted}! Vote recorded securely.</div>}
      {list.map(c=> (
        <div key={c.id} style={{border:"1px solid #ddd", padding:"15px", margin:"10px 0", borderRadius:"8px"}}>
          <h4>{c.name} - {c.party}</h4>
          <button onClick={()=>setVoted(c.name)}>Vote for {c.name}</button>
        </div>
      ))}
    </div>
  )
}