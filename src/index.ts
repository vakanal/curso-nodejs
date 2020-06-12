import express, { Application } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import routesV1 from './routes/v1';

dotenv.config();

declare global {
  namespace Express {
    export interface Request {
      sessionData: any;
    }
  }
}

const app: Application = express();

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

routesV1(app);

const PORT: string | number = process.env.PORT || 4000;

mongoose
  .connect(process.env.MONGO!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Running on ${PORT}`));
  })
  .catch(error => { console.log(error); });
