import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nicolbhswiggmqdacvud.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)
)

export default async function handler(req, res) {
  console.log("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL)
  console.log("Request Body:", req.body)

  if (req.method === "POST") {
    const { email, wallet } = req.body

    if (!email || !wallet) {
      return res.status(400).json({ error: "Email and wallet are required" })
    }

    const { data, error } = await supabase
      .from("users")
      .insert([{ email, wallet }])

    if (error) {
      console.error("Supabase Error:", error)
      return res.status(400).json({ error: error.message })
    }

    console.log("Inserted Data:", data)
    return res.status(200).json({ success: true, data })
  }

  return res.status(405).json({ error: "Method not allowed" })
}
