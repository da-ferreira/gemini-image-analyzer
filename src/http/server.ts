import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const app = express();
const port = 80;

app.use(express.json());
app.use(cors());

app.listen(port, () => console.log(`👉 API running on port ${port}`));
