const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://mongo:27017/devopsdb');

app.get('/api', (req, res) => {
  res.json({ message: "🚀 Backend Running with MongoDB" });
});

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});