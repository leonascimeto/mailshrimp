import express, {Router} from 'express';
import cors from 'cors';
import helmet from 'helmet';


export default (router: Router) => {
   const app = express();
   app.use(cors())
   app.use(helmet());
   app.use(express.json());
   app.use(router);
   
   return app;
}
