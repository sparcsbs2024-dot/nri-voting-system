const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

let voters = [];
let votes = [];
let candidates = [
 {id:1, name:"M.K.Stalin", party:"DMK"},
 {id:2, name:"C.Joseph Vijay", party:"TVK"},
 {id:3, name:"Edappadi.K.Palanisamy", party:"AIADMK"},
 {id:4, name:"Seeman", party:"NTK"}
];

app.post('/api/register', (req,res) => {
  if(voters.find(v=>v.email===req.body.email)) return res.status(400).json({message:"Already Registered!"});
  voters.push({id: voters.length+1, ...req.body});
  res.json({message:"Registered!"});
});

app.post('/api/login', (req,res) => {
  const v = voters.find(v=>v.email===req.body.email && v.password===req.body.password);
  if(!v) return res.status(401).json({message:"Invalid Login!"});
  res.json({message:"Login Success", voter: v});
});

app.get('/api/candidates', (req,res) => res.json(candidates));

app.post('/api/vote', (req,res) => {
  if(votes.find(v=>v.voter_id==req.body.voter_id)) return res.status(400).json({message:"Already voted!"});
  votes.push(req.body);
  res.json({message:"Voted!"});
});

// --- THIS IS THE ONE-LINK FIX ---
app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.use((req, res) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({message: "API not found"});
  }
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

app.listen(5000, () => console.log("ONE LINK APP: http://localhost:5000"));