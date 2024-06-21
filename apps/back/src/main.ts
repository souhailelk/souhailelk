import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { ArticlesRouter } from './Routers/ArticlesRouter';
import { ResumeRouter } from './Routers/ResumeRouter';


const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors());

app.use('/Articles', ArticlesRouter);
app.use('/Resume', ResumeRouter);

const port = process.env.PORT || 3333;

app.listen(port, () => {
  console.log(`App running on http://localhost:` + port);
});
module.exports = app;
