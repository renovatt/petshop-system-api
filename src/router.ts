import { Router } from "express";
import { ClientsController } from "./controllers/clients";
import { UserController } from "./controllers/user";
import { authMiddleware } from "./middleware";

const router = Router();

const login = new UserController().login;

const users = new UserController().users;
const profile = new UserController().profile;
const registerUser = new UserController().create;
const updateUser = new UserController().update;
const deleteUser = new UserController().delete;

const getAllClients = new ClientsController().clients;
const registerClient = new ClientsController().create;
const updateClient = new ClientsController().update;
const deleteClient = new ClientsController().delete;
const clientProfile = new ClientsController().profile;

router.post('/login', login);
router.post('/register', registerUser);

router.use(authMiddleware);

router.get('/users/', users);
router.get('/user/:id/', profile);
router.put('/user/:id/', updateUser);
router.delete('/user/:id/', deleteUser);

router.get('/clients/', getAllClients);
router.post('/client/', registerClient);
router.put('/client/:id/', updateClient);
router.delete('/client/:id/', deleteClient);
router.get('/client/:id/', clientProfile);

export { router };