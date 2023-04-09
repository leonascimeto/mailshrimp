import { Router } from "express";
import middlewareCommons from 'ms-commons/api/routes/middlewares'
import controller from '../controllers/contacts';
import { validateContactSchema, validateUpdateContactSchema } from "./middlewares";

const routes = Router();

// TODO inser routes here

routes.get('/contacts/', middlewareCommons.validateAuth, controller.getContacts);

routes.get('/contacts/:id', middlewareCommons.validateAuth, controller.getContact);

routes.post('/contacts/', middlewareCommons.validateAuth, validateContactSchema, controller.addContact);

routes.patch('/contacts/:id', middlewareCommons.validateAuth, validateUpdateContactSchema, controller.setContact);

export default routes;