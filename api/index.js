const express = require('express');
const routerAPI = require('./routes/index.routes');
const {
  errorHandler,
  logErrors,
  boomErrorHandler,
} = require('./middlewares/error.handler');
const cors = require('cors');
const queryErrorHandler = require('./middlewares/sequelize.handler');
const { checkAPIKey } = require('./middlewares/auth.handler')
const app = express();
const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL || `http://localhost:${PORT}`;

// Parsing JSON
app.use(express.json());

// Activating CORS
const whiteListCORS = ['http://localhost:8080', FRONTEND_URL];
const options = {
  origin: (origin, callback) => {
    if (whiteListCORS.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed'));
    }
  },
};
app.use(cors(options));

// Passport middleware
require('./utils/auth/index');

// Test endpoint
app.get('/api', (req, res) => {
  res.send('Prueba express');
});

// Test API_KEY endpoint
app.get('/new-endpoint', checkAPIKey, (req, res) => {
  res.send('Prueba express');
});

routerAPI(app);

// Middlewares
app.use(queryErrorHandler);
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App running on ${PORT}`);
});
