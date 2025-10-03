import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, wallet } = req.body
    const { data, error } = await supabase
      .from("users")
      .insert([{ email, wallet }])

    if (error) return res.status(400).json({ error })
    return res.status(200).json({ success: true, data })
  }
  res.status(405).json({ error: "Method not allowed" })
}
