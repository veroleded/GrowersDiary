import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import multer from 'multer';

import routers from './routers';
import errorMiddleware from './middlewares/error-middleware';

dotenv.config();

const PORT = process.env.PORT ?? 3000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL,
}));
app.use(multer().any());

app.use('/apiv1/auth', routers.authRouter);
app.use('/apiv1/users', routers.userRouter);
app.use('/apiv1/strains', routers.strainRouter);
app.use('/apiv1/growlogs', routers.growLogRouter);
app.use('/apiv1/logentries', routers.logEntryRouter);

app.use(errorMiddleware);

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server has been started on port ${PORT}...`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
