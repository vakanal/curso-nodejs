import { Application } from 'express';
//import productsRoutes from './products-routes';
//import usersRoutes from './users-routes';
import notificationsRoutes from './notifications-routes';

export default (app: Application): void => {
  //app.use('/api/v1/users', usersRoutes);
  //app.use('/api/v1/products', productsRoutes);
  app.use('/api/v1/notifications', notificationsRoutes);
};
