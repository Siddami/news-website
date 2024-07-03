const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/config.js', (req, res) => {
  res.send(`window.__env = { API_KEY: '${process.env.API_KEY}' };`);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
