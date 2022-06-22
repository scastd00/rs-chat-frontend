const express = require('express');
const cors = require('cors');
const path = require('path');
const PORT = process.env.PORT || 3000;
const dist = 'dist';

const app = express();
app.use(cors());
app.use(express.static(`${dist}`));

app.get('*', (_, res) => {
  // Send to the client the entry point to the frontend
  res.sendFile(path.resolve(__dirname, dist, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
