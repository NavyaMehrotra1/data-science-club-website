const { MongoClient } = require('mongodb');

module.exports = async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { name, email } = req.body;

  // Validation
  if (!name || !email) {
    return res.json({ success: false, message: 'Name and email are required.' });
  }

  if (!email.endsWith('@jh.edu')) {
    return res.json({ success: false, message: 'Please use a JHU email (@jh.edu).' });
  }

  // If no MongoDB URI is provided, just return success (for demo purposes)
  if (!process.env.MONGO_URI) {
    console.log('Form submission received:', { name, email });
    return res.json({ 
      success: true, 
      message: 'Thank you! You have been added to our mailing list and will receive an email before our next meeting' 
    });
  }

  // MongoDB connection and save
  let client;
  try {
    client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
    
    const db = client.db();
    const collection = db.collection('signups');
    
    const newSignup = {
      name,
      email,
      timestamp: new Date()
    };
    
    await collection.insertOne(newSignup);
    
    return res.json({ 
      success: true, 
      message: 'Thank you! You have been added to our mailing list and will receive an email before our next meeting' 
    });
  } catch (error) {
    console.error('Error saving to MongoDB:', error);
    return res.json({ 
      success: false, 
      message: 'An error occurred. Please try again later.' 
    });
  } finally {
    if (client) {
      await client.close();
    }
  }
}
