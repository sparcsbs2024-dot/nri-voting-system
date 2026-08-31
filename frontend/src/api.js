const API = "https://nri-voting-system-production.up.railway.app/api"

export const registerVoter = async (data) => {
  const res = await fetch(`${API}/register`, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(data)
  });
  return res.json();
};

export const loginVoter = async (data) => {
  const res = await fetch(`${API}/login`, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(data)
  });
  return res.json();
};

export const getCandidates = async () => {
  const res = await fetch(`${API}/candidates`);
  return res.json();
};

export const castVote = async (data) => {
  const res = await fetch(`${API}/vote`, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(data)
  });
  return res.json();
};