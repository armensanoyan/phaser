const express = require('express');
const path = require('path');
const { runPhaserGame } = require('./src/lib/engine');

const app = express();
const PORT = 3000;

// Set the directory for static files
app.use(express.static(path.join(__dirname, 'public1')));


app.get('/generate', (req, res) => {
  runPhaserGame().catch((err) => {
    console.log('Error:', err);
  });
  res.send('Phaser game started');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
