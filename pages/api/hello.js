export default function handler(req, res) {
  res.status(200).json({ 
    name: 'Lydia API',
    version: '1.0.2',
    status: 'online'
  });
}
