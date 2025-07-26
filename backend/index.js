const express = require('express');
const session = require('express-session');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(
  session({
    secret: 'notionlike-secret',
    resave: false,
    saveUninitialized: true,
  })
);

const users = [];

function auth(req, res, next) {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  req.user = req.session.user;
  next();
}

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (users.find((u) => u.username === username)) {
    return res.status(400).json({ error: 'User exists' });
  }
  const user = { username, password, notes: [], todos: [] };
  users.push(user);
  res.status(201).json({ message: 'registered' });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  req.session.user = user;
  res.json({ message: 'logged in' });
});

app.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.json({ message: 'logged out' });
  });
});

app.get('/notes', auth, (req, res) => {
  res.json(req.user.notes);
});

app.post('/notes', auth, (req, res) => {
  const note = { id: Date.now(), text: req.body.text };
  req.user.notes.push(note);
  res.status(201).json(note);
});

app.get('/todos', auth, (req, res) => {
  res.json(req.user.todos);
});

app.post('/todos', auth, (req, res) => {
  const todo = { id: Date.now(), text: req.body.text, done: false };
  req.user.todos.push(todo);
  res.status(201).json(todo);
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
