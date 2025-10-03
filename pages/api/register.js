import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method not allowed');
  }
  const { email, wallet } = req.body;
  if (!email || !wallet) {
    return res.status(400).send('Missing fields');
  }
  const { data, error } = await supabase
    .from('users')
    .insert([{ email, wallet }]);
  if (error) {
    console.error(error);
    return res.status(500).send(error.message);
  }
  return res.status(200).send('Registered successfully!');
}
