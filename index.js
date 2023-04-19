const express = require('express');
const routerAPI = require('./routes/index.routes');
const {
  errorHandler,
  logErrors,
  boomErrorHandler,
} = require('./middlewares/error.handler');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(express.json());
const whiteListCORS = ['http://localhost:8080', 'https://myapp.co'];
const options = {
  origin: (origin, callback) => {
    if (whiteListCORS.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed'));
    }
  },
};
app.use(cors(options));

app.get('/', (req, res) => {
  res.send('Prueba express');
});

routerAPI(app);

// Middlewares
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`App running on ${port}`);
});
