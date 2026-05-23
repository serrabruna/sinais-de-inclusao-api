import swaggerJSDoc from 'swagger-jsdoc';
import path from 'path';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
        title: 'Sinais de Inclusão API',
        version: '1.0.0',
        description: 'API para o aplicativo educacional de Libras e inclusão digital.',
        },
        servers: [
        {
            url: 'http://localhost:3000',
            description: 'Servidor Local',
        },
        ],
        components: {
        securitySchemes: {
            bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            },
        },
        },
    },
    apis: [
        path.resolve(__dirname, '../routes/status.routes.ts'),
        path.resolve(__dirname, '../routes/*.ts')
    ],
};

export const swaggerSpec = require(path.resolve(__dirname, './swagger.json'));