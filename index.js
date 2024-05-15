import express from 'express';
import cors from 'cors';
// import bodyparser from 'body-parser'

import config from './config.js';
import router from './network/routes.js'

const app = express();

app.use(cors());
app.use(express.json());

router(app)

app.listen(5000, () =>
  console.log(`Server is live @ ${5000}`),
);