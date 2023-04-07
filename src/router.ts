import { Router } from "express";
import { UserController } from "./controllers/user";
import { authMiddleware } from "./middleware";

const router = Router();

const login = new UserController().login;

const users = new UserController().users;
const profile = new UserController().profile;
const registerUser = new UserController().create;
const updateUser = new UserController().update;
const deleteUser = new UserController().delete;

router.post('/login', login);
router.post('/register', registerUser);

router.use(authMiddleware);

router.get('/users', users);
router.get('/user/:id/', profile);
router.put('/user/:id/', updateUser);
router.delete('/user/:id/', deleteUser);

export { router };