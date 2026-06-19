import app from './index';
import { connectDatabase } from './config/database';

const PORT = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const API_HOST = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

connectDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`API host: ${API_HOST}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error', err);
    process.exit(1);
  });
