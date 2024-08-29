import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from '../routes/route';

dotenv.config({ path: '.env' });

const app = express();
const port = process.env.PORT || 80;

app.use(express.json());
app.use(cors());

app.use('/', routes);

app.listen(port, () => console.log(`👉 API running on port ${port}`));
