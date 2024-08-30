import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from '../routes/route';
import path from 'path';

dotenv.config({ path: '.env' });

const app = express();
const port = process.env.PORT || 80;

app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ limit: '30mb' }));
app.use(cors());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/', routes);

app.listen(port, () => console.log(`👉 API running on port ${port}`));
