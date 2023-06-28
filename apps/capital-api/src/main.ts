/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import * as path from 'path';

const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mock usersDatabase for demonstration
const usersDatabase = [
  { username: 'admin', password: 'admin', role: 'admin' },
  { username: 'user', password: 'user', role: 'user' },
];

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to capital-api!' });
});

// Login endpoint
app.post('/api/login', (req, res) => {
  // Validate user credentials (e.g., check against a database)
  const { username, password } = req.body;

  const user = usersDatabase.find(
    (u) => u.username === username && u.password === password
  );
  // Perform your validation logic here, such as checking against a database
  // If valid, generate a JWT token and send it back to the client
  if (user) {
    const token = jwt.sign({ username, role: user.role }, 'your_secret_key');
    res.json({ token: token, role: jwt.decode(token)['role'] });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Records endpoint(protected). Verify user token.
app.get('/api/record-list', verifyToken, (req, res) => {
  // The user is authorized, so you can return protected data
  res.json({ message: 'Protected records data' });
});

function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader;

  if (!token) return res.sendStatus(401);

  jwt.verify(token, 'your_secret_key', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
