const express = require('express');
const routerAPI = require('./routes/index.routes');
const { errorHandler, logErrors, boomErrorHandler } = require('./middlewares/error.handler');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Prueba express');
});

routerAPI(app);
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`App running on ${port}`);
});
