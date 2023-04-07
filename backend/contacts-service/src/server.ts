import app from './app';
import database from 'ms-commons/data/db';

(async () => {
  
  try {
    const PORT = process.env.PORT || 3000;
    
    await database.sync();
    console.log('Database connected');
    
    await app.listen(PORT);
    console.log(`Server started on http://localhost:${PORT}`);
  } catch (error) {
    console.log(error);
  }

})()
