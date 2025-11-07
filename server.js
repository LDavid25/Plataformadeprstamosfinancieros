const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Servir archivos estáticos de la carpeta 'build' (configurada en vite.config.ts)
app.use(express.static(path.join(__dirname, 'build')));

// Manejar todas las rutas para SPA
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'), (err) => {
    if (err) {
      console.error('Error al cargar el archivo:', err);
      res.status(500).send('Error al cargar la aplicación');
    }
  });
});

// Manejador de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('¡Algo salió mal!');
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
