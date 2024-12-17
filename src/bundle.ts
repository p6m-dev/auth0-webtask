import { IncomingMessage, ServerResponse } from 'http';
import app from './app';

if (require.main === module) {
  process.on('unhandledRejection', (reason, promise) => {
    console.warn('Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(-1);
  });

  process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(-1);
  });

  console.log('Starting app...\n');
  app.listen(3000, '0.0.0.0', () => {
    console.log('Listening on http://0.0.0.0:3000');
  });
}

module.exports = (ctx: unknown, req: IncomingMessage, res: ServerResponse) => {
  console.log('!!! ctx', ctx);
  console.log('!!! req.url', req.url);
  return () => app(req, res);
};
