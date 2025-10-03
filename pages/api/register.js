import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export default async function handler(req, res) {
  console.log("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL)
  console.log("Supabase Key (first 10 chars):", process.env.SUPABASE_SERVICE_ROLE_KEY?.slice(0, 10))
  console.log("Request Body:", req.body)

  if (req.method === "POST") {
    const { email, wallet } = req.body

    if (!email || !wallet) {
      return res.status(400).json({ error: "Email dan wallet wajib diisi" })
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: "Format email salah" })
    }

    if (!/^0x[a-fA-F0-9]{40}$/.test(wallet)) {
      return res.status(400).json({ error: "Alamat wallet salah" })
    }

    const { data, error } = await supabase
      .from("users")
      .insert([{ email, wallet }])

    if (error) {
      console.error("Supabase Error:", error)
      return res.status(400).json({ error: error.message })
    }

    console.log("Data Masuk:", data)
    return res.status(200).json({ success: true, data })
  }

  return res.status(405).json({ error: "Metode tidak diizinkan" })
}
