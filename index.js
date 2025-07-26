const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let notes = [];

app.get('/notes', (req, res) => {
  res.json(notes);
});

app.post('/notes', (req, res) => {
  const note = { id: Date.now(), ...req.body };
  notes.push(note);
  res.status(201).json(note);
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
