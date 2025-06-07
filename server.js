const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('.')); // serve index.html

const file = 'reviews.json';

app.get('/reviews', (req, res) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) return res.json([]);
    res.json(JSON.parse(data));
  });
});

app.post('/reviews', (req, res) => {
  const newReview = req.body;
  fs.readFile(file, 'utf8', (err, data) => {
    let reviews = [];
    if (!err && data) reviews = JSON.parse(data);
    reviews.unshift(newReview);
    fs.writeFile(file, JSON.stringify(reviews, null, 2), err => {
      if (err) return res.status(500).send("Failed to save");
      res.send("Saved");
    });
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
