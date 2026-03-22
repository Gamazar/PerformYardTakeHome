import express, {Application} from "express";
import swaggerUi from "swagger-ui-express";

import artistRouter from './router/artistRouter';
const app: Application = express();
app.use(express.json());

app.use('/', artistRouter)
const PORT = 3000;
const openApiSpec = {
  openapi: '3.0.3',
  info: {
    title:       'People Search API',
    version:     '1.0.0',
    description: 'Search people by name, genre, movies, location, or artists. Add new music artists to genres.',
  },
  paths: {
    '/search': {
      get: {
        summary:     'Search people',
        description: 'Returns people whose properties substring-match the query (case-insensitive). Sorted by score desc, then name asc.',
        parameters: [
          {
            name:        'search',
            in:          'query',
            required:    true,
            description: 'Search term',
            schema:      { type: 'string', example: 'beethoven' },
          },
        ],
        responses: {
          200: {
            description: 'Matching people',
            content: {
              'application/json': {
                schema: {
                  type:  'array',
                  items: {
                    type:       'object',
                    properties: {
                      name:    { type: 'string',  example: 'Eddy Verde' },
                      score:   { type: 'integer', example: 6 },
                      matches: {
                        type:  'array',
                        items: { type: 'string' },
                        example: ['name', 'artists'],
                      },
                    },
                  },
                },
              },
            },
          },
          400: { description: 'Missing or invalid query parameter' },
        },
      },
    },
    '/artists': {
      post: {
        summary:     'Add a music artist',
        description: 'Adds an artist to a genre in-memory. Creates the genre if it does not exist. Duplicates are ignored.',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type:       'object',
                required:   ['genre', 'artist'],
                properties: {
                  genre:  { type: 'string', example: 'Classical' },
                  artist: { type: 'string', example: 'Beethoven' },
                },
              },
            },
          },
        },
        responses: {
          204: { description: 'Artist added (or already existed). Does not need to send anything back as response' },
          400: { description: 'Missing or invalid body fields' },
        },
      },
    },
  },
};

app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.use('/docs', swaggerUi.serve, swaggerUi.setup(openApiSpec));
app.get('/openapi.json', (_req, res) => res.json(openApiSpec));
app.listen(PORT, () => {
    console.log(`People Search API running on http://localhost:${PORT}`);
})