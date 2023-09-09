import authRouter from './auth';
import strainRouter from './strain';

const routers = {
  authRouter,
  strainRouter,
};

export default routers;

// const router = Router();

// router.post(
//   '/registration',
//   body('name').isLength({ min: 2, max: 22 }),
//   body('email').isEmail(),
//   body('password').isLength({ min: 6, max: 32 }),
//   userController.registration,
// );
// router.post(
//   '/login',
//   body('email').isEmail(),
//   body('password').isLength({ min: 6, max: 32 }),
//   userController.login,
// );
// router.post('/logout', userController.logout);
// router.get('/activate/:link', userController.activate);
// router.get('/refresh', userController.refresh);
// router.get('/users', authMiddleware, userController.getUsers);

// export default router;
