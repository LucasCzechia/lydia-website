export default function handler(req, res) {
  res.status(200).json({ 
    name: 'Lylia API',
    version: '1.0.2',
    status: 'online'
  });
}
