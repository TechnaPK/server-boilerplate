import TodoModel from '../models/Api-model'
import { Request, Response, NextFunction } from "express";

//add todos controller 

export const addTodo = (req: Request, res: any, next: NextFunction) => {

    //if user provide null values
    if (!req.body.title || !req.body.place || !req.body.description) {
        res.t.message = "Please fill all the required fields"
        return res.status(203).send(res.t);
    }

    // if user provide valid values then save todo
    let newTodo = new TodoModel({
        title: req.body.title.trim(),
        place: req.body.place.trim(),
        description: req.body.description.trim(),
    });
    newTodo.save((err, user) => {
        if (err) {
            return next(err);
        }
        res.t.success = true
        res.t.message = "New Todo Added"
        res.t.data = user

        return res.status(200).send(res.t)
    })
}

// get todos controller

 export const getTodo = (req: Request, res: any, next: NextFunction) => {

    let query: object = {}
    TodoModel.find(query).sort({ date: -1 }).exec((err:any, todos: any) => {

        if (err) {
            return next(err);
        }

        // if  todos are not available 
        if (todos.length === 0) {
             console.log("in step 1", todos)
            res.t.message = "No Todos Available yet";
            return res.send(res.t);
        }

        // if todos are available
        else {

            res.t.success = true;
            res.t.message = "All Todos Found";
            res.t.data = todos;
            return res.send(res.t);
        }

    });

    
};

// get  OneTodo controller

export const getsingelTodo = (req: Request, res: any, next: NextFunction) => {

    //  todo agains this provided id
    const { id }: any = req.params;

    TodoModel.findById(id).exec((err: any, todo: any) => {

        if (err) {
            return next(err);
        }
        // if no todo is available against provided id
        if (todo.length === 0) {
            res.t.message = "Sorry no Todo Available against this id";
            return res.send(res.t)
        }

        // if todo is available
        else {
            res.t.success = true;
            res.t.message = "Todo found";
            res.t.data = todo;
            return res.send(res.t);
        }

    })
}


// update Todo controller

 export const updateTodo = (req: Request, res: any, next: NextFunction) => {

    // if user update null values
    if (!req.body.title || !req.body.place || !req.body.description) {
        res.t.message = "Invalid Request"
        return res.status(203).send(res.t)
    }

    // update todo against this id
    const { id }: any = req.params;
    let { title, place, description, status }: any = req.body;

    TodoModel.findByIdAndUpdate(id, { title, place, description, status }).exec((err: any, updatedTodo:any) => {

        if (err) {
            return next(err);
        }
        // if todo updated
        else {
            res.t.status = true;
            res.t.message = "Your Required Todo has updated";
            res.t.data = updatedTodo;
            return res.send(res.t);
        }

    })

};

// Delete todo controller 

export const deleteTodo = (req: Request, res: any, next: NextFunction) => {

    //delete todo against provided id
    const { id }: any = req.params;
    TodoModel.findByIdAndRemove(id).exec((err: any, todo: any) => {
        if (err) {
            return next(err)
        }
        // if todo found and deleted
        res.t.success = true
        res.t.message = "Todo Deleted"
        res.t.data = todo

        return res.status(200).send(res.t)


    })

}