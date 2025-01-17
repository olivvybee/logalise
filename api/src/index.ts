import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { prettyJSON } from 'hono/pretty-json';
import { config as loadEnv } from 'dotenv';

import { themeParksHandler } from './routes/theme-parks';
import { coastersHandler } from './routes/coasters';
import { activitiesHandler } from './routes/activities';
import { authMiddleware } from './middleware/authMiddleware';

loadEnv();
const PORT = Number(process.env.PORT) || 3000;

const app = new Hono();

app.use(logger());
app.use(prettyJSON());
app.use(authMiddleware);

app.route('/activities', activitiesHandler);
app.route('/coasters', coastersHandler);
app.route('/theme-parks', themeParksHandler);

app.get('/auth', async (ctx) => {
  return ctx.json({ valid: true });
});

serve(
  {
    ...app,
    port: PORT,
  },
  (info) => {
    console.log(`Server started at http://localhost:${info.port}`);
  }
);
