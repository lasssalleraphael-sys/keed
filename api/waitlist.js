const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { firstName, lastName, email, agencyName } = req.body;

  if (!firstName || !lastName || !email || !agencyName) {
    return res.status(400).json({ error: 'Tous les champs sont requis' });
  }

  try {
    const { data, error } = await supabase
      .from('waitlist')
      .insert([{ first_name: firstName, last_name: lastName, email: email.toLowerCase(), agency_name: agencyName, paid: false }])
      .select()
      .single();

    if (error) {
      if (error.code === '23505') return res.status(409).json({ error: 'Email déjà inscrit' });
      throw error;
    }
    return res.status(201).json({ success: true, id: data.id });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
};
