<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Asistente Piscicultura</title>
    <style>
        body {
            font-family: Consolas, monospace; /* Establecer el tipo de letra en Consolas */
        }

        .card {
            border: 1px solid #ccc;
            border-radius: 5px;
            padding: 20px;
            margin-bottom: 20px;
            width: 300px;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        }

        .card h2 {
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 10px;
        }

        .card p {
            font-size: 16px;
            margin-bottom: 5px;
        }
    </style>
</head>
<body>
    <h1>Asistente Piscicultura</h1>
    <div id="datos"></div>
    <script>
      const datosDiv = document.getElementById('datos');

      // Función para manejar los eventos SSE
      const manejarEventosSSE = (event) => {
        const nuevosDatos = JSON.parse(event.data);
        actualizarVista(nuevosDatos);
      };

      // Función para actualizar la vista con los nuevos datos
      const actualizarVista = (datos) => {
        datosDiv.innerHTML = '';
        datos.forEach(dato => {
          const card = document.createElement('div');
          card.classList.add('card');
          card.innerHTML = `
            <h2>${dato.valTemp}°C</h2>
            <p>Sensor ${dato.marcaSensor}</p>
            <p>Tomada: ${dato.timeStampTemp}</p>
            <p>Ubicación: ${dato.nomPiscina}</p>
            <p>Intervalo de Lectura: ${dato.intervSensor} segundos</p>
            <p>Temperatura Mínima: ${dato.tempMinPiscina}°C</p>
            <p>Temperatura Máxima: ${dato.tempMaxPiscina}°C</p>
          `;
          datosDiv.appendChild(card);
        });
      };

      // Establecer la conexión SSE
      const eventos = new EventSource('/events');
      eventos.addEventListener('message', manejarEventosSSE);
    </script>
</body>
</html>




-----------




const express = require('express');
const axios = require('axios');
const moment = require('moment');
const app = express();
const port = 3000;

moment.locale('es');

app.set('view engine', 'ejs');

// Middleware para manejar solicitudes SSE
app.get('/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  // Función para enviar datos al cliente SSE
  const enviarDatosSSE = (datos) => {
    res.write(`data: ${JSON.stringify(datos)}\n\n`);
  };

  // Función para obtener y enviar los datos al cliente SSE
  const obtenerDatosYEnviar = async () => {
    try {
      const response = await axios.get('https://piscis2024.000webhostapp.com/piscis/envar-intervalo-limites.php?idSensT=1');
      const datos = response.data.map(dato => ({
        ...dato,
        timeStampTemp: moment(dato.timeStampTemp).format('dddd D [de] MMMM [de] YYYY [a las] HH:mm:ss')
      }));
      enviarDatosSSE(datos);
    } catch (error) {
      console.error('Error al obtener los datos del archivo JSON:', error);
    }
  };

  // Enviar los datos al cliente SSE cada cierto intervalo de tiempo
  const intervalo = setInterval(obtenerDatosYEnviar, 60000); // Intervalo de espera

  // Manejar el cierre de la conexión SSE
  req.on('close', () => {
    clearInterval(intervalo);
    console.log('Conexión SSE cerrada');
  });

  // Enviar datos por primera vez
  obtenerDatosYEnviar();
});

app.get('/', (req, res) => {
  res.render('home');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
