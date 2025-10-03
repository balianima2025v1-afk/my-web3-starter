import { useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [wallet, setWallet] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, wallet })
    });
    const data = await res.text();
    alert(data);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Web3 Starter Kit</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br/><br/>
        <input
          name="wallet"
          placeholder="Wallet Address"
          value={wallet}
          onChange={(e) => setWallet(e.target.value)}
          required
        /><br/><br/>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

