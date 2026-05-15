import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import statusRouter from './routes/status.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors()); 
app.use(express.json()); 


app.use(statusRouter);


app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando com sucesso em http://localhost:${PORT}`);
});