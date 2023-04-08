import { Router } from "express";
import { CanceledSchedulesController } from "./controllers/canceledSchedules";
import { ClientsController } from "./controllers/clients";
import { SchedulesController } from "./controllers/schedules";
import { UserController } from "./controllers/user";
import { authMiddleware } from "./middleware";

const router = Router();

const login = new UserController().login;

const users = new UserController().users;
const profile = new UserController().profile;
const registerUser = new UserController().create;
const updateUser = new UserController().update;
const deleteUser = new UserController().delete;

const clients = new ClientsController().clients;
const clientProfile = new ClientsController().profile;
const registerClient = new ClientsController().create;
const updateClient = new ClientsController().update;
const deleteClient = new ClientsController().delete;

const schedules = new SchedulesController().schedules;
const scheduleProfile = new SchedulesController().profile;
const registerSchedule = new SchedulesController().create;
const updateSchedule = new SchedulesController().update;
const deleteSchedule = new SchedulesController().delete;

const getAllSchedulesCanceled = new CanceledSchedulesController().canceled;
const deleteAllSchedulesCanceled = new CanceledSchedulesController().deleteCanceled;

router.post('/login', login);
router.post('/register', registerUser);

router.use(authMiddleware);

router.get('/users/', users);
router.put('/user/:id/', updateUser);
router.delete('/user/:id/', deleteUser);
router.get('/user/:id/', profile);

router.get('/clients/', clients);
router.post('/client/', registerClient);
router.put('/client/:id/', updateClient);
router.delete('/client/:id/', deleteClient);
router.get('/client/:id/', clientProfile);

router.get('/schedules/', schedules);
router.post('/schedule/', registerSchedule);
router.put('/schedule/:id/', updateSchedule);
router.delete('/schedule/:id/', deleteSchedule);
router.get('/schedule/:id/', scheduleProfile);

router.get('/canceled-schedules/', getAllSchedulesCanceled);
router.delete('/canceled-schedules/', deleteAllSchedulesCanceled);

export { router };