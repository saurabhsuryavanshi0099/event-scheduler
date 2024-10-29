/* eslint-disable @typescript-eslint/no-require-imports */
const express = require('express');
const next = require('next');
const compression = require('compression');
const zlib = require('zlib');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Enable Brotli compression with fallback to Gzip
  server.use(
    compression({
      threshold: 0,
      brotli: {
        enabled: true,
        zlib: {
          [zlib.constants.BROTLI_PARAM_MODE]: zlib.constants.BROTLI_MODE_TEXT,
          [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
          [zlib.constants.BROTLI_PARAM_LGWIN]: 22,
        },
      },
    })
  );

  // Next.js request handling
  server.all('*', (req, res) => handle(req, res));

  const port = process.env.PORT || 3000;
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
