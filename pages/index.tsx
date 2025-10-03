import { useState } from "react"

export default function Home() {
  const [email, setEmail] = useState("")
  const [wallet, setWallet] = useState("")
  const [msg, setMsg] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, wallet }),
    })
    const data = await res.json()
    if (data.success) {
      setMsg("✅ Data saved to Supabase!")
    } else {
      setMsg("❌ Error: " + data.error.message)
    }
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Register Wallet</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Wallet Address"
          value={wallet}
          onChange={(e) => setWallet(e.target.value)}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      <p>{msg}</p>
    </div>
  )
}
