import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { createTasks, deleteTasks, getTaskById, getTasks, updateTasks } from "../controllers/tasks.controllers.js";

import { validateSchema } from "../middlewares/validator.middleware.js";
import { createTaskSchema } from "../schemas/tasks.schema.js";

const taskRoutes = Router()

taskRoutes.get('/tasks', authRequired, getTasks)
taskRoutes.get('/tasks/:id', authRequired, getTaskById)
taskRoutes.post('/tasks', authRequired, validateSchema(createTaskSchema), createTasks)
taskRoutes.put('/tasks/:id', authRequired, updateTasks)
taskRoutes.delete('/tasks/:id', authRequired, deleteTasks)


export default taskRoutes