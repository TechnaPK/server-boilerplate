import * as express from 'express';
import * as controllers from '../controllers/todoController';

// create express router
const router = express.Router();

// save todo route
router.post('/', controllers.addTodo);

//get todos route
router.get('/', controllers.getTodo);

//get singleTodo route
router.get('/:id',controllers.getsingelTodo);

//update required todo by id route
router.put('/:id', controllers.updateTodo);

//delete required todo by id route
router.delete('/:id', controllers.deleteTodo);


export default router;