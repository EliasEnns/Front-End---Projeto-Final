import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 5000; // Choose your desired port

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Sample user data (usually this would be stored in a database)
const users = [
  { id: 1, username: 'user1', password: 'password1', name: 'User One' },
  { id: 2, username: 'user2', password: 'password2', name: 'User Two' }
];

// Login endpoint
app.post('/auth/login', (req, res) => {
  const { username, password } = req.body;

  // Find user in the mock database
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Mock token (in real-world scenario, use JWT or similar)
  const token = `mock_token_${user.id}`;

  // Return user data and token
  res.json({ data: { user: { username: user.username, name: user.name }, token }});
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
