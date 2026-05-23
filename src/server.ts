import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger.js';
import routes from './routes/status.routes.js';

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(routes);

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
    console.log('Documentação Swagger disponível em http://localhost:3000/api-docs');
});