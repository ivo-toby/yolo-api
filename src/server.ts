import dotenv from 'dotenv';
import app from './app';

dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Yolo API server is running on port ${PORT}`);
  console.log(`   Health check: http://localhost:${PORT}/health`);
});
