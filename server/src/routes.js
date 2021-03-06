import InfraRoute from './infra/infra.route';
import AuthRoute from './infra/auth.route';
import ImagesRoute from './images/route';
import PostsRoute from './posts/route';

const routes = router => {
  // Infra
  const infraRoute = new InfraRoute();
  router.use(infraRoute.path, infraRoute.routes(), infraRoute.allowedMethods());
  const authRoute = new AuthRoute();
  router.use(authRoute.path, authRoute.routes(), authRoute.allowedMethods());

  // Images
  const imagesRoute = new ImagesRoute();
  router.use(
    imagesRoute.path,
    imagesRoute.routes(),
    imagesRoute.allowedMethods()
  );

  // Posts
  const postRoute = new PostsRoute();
  router.use(postRoute.path, postRoute.routes(), postRoute.allowedMethods());
};

export default routes;
