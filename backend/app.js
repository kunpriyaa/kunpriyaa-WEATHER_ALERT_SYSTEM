require('dotenv').config();
const express = require('express');
const db = require('./models/index');
const authRoutes = require('./routes/authRoutes');
const weatherRoutes = require('./routes/weatherRoutes');
const path = require('path');  

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/weather', weatherRoutes);

app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'index.html')); 
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

