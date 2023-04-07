import { Router } from "express";
import middlewareCommons from 'ms-commons/api/routes/middlewares'
import controller from '../controllers/contacts';

const routes = Router();

// TODO inser routes here

routes.get('/contacts/', middlewareCommons.validateAuth, controller.getContacts);

export default routes;