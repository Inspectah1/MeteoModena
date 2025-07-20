import express from 'express';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

// Serve file statici dalla cartella public
app.use(express.static(path.join(process.cwd(), 'public')));

// API proxy meteo (esempio)
app.get('/meteo', (req, res) => {
  res.json({ messaggio: "Qui la tua API proxy" });
});

app.listen(PORT, () => console.log(`Server in ascolto su porta ${PORT}`));
