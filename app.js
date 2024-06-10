const express = require('express');
const app = express();
const port = 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.use(express.static("./public"));

// Middleware to parse JSON bodies
app.use(express.json());

// Default array of todos
let todos = [
    { id: 1, task: "Learn HTML" },
    { id: 2, task: "Learn CSS" },
    { id: 3, task: "Learn JAVASCRIPT" }
];
app.get('/', (req, res) => {
    res.render('front');
});

// Route to get all todos
app.get('/todos', (req, res) => {
    res.render('todos', { todos });
});

// Route to get a specific todo by ID
app.get('/todo/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(todo => todo.id === id);
    if (!todo) {
        res.status(404).send('Todo not found');
    } else {
        res.render('todo', { todo });
    }
});

// Route to create a new todo
app.post('/todos', (req, res) => {
    const newTodo = {
        id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 1,
        task: req.body.task
    };
    todos.push(newTodo);
    console.log(newTodo);
    res.redirect('/todos');
});

// Route to delete a todo by ID
app.delete('/todo/:id', (req, res) => {
    const id = parseInt(req.params.id);
    todos = todos.filter(todo => todo.id !== id);
    
    res.redirect('/todos');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
