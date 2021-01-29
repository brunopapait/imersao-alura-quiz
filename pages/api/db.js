import db from '../../db.json';

export default function api(req, res) {
  if (req.method === 'OPTIONS') {
    res.status(200).end();
  }

  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');

  return res.json(db);
}
