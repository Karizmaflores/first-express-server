const express = require("express");

const users = require("./users"); // Common JS

// Look on node process if we are in production
// else use local env
const PORT = process.env.PORT || 5000;

// Instatiate an instance of express
const app = express();

// Middleware
app.use(express.json());

// Base Route - Welcome message
app.get('/', (req, res) => {
    res.json({
        message: "Welcome to the jungle!",
    });
});

// Users - CRUD Operation
// Get all users
app.get("/users", (req, res) => {
    res.json(users);
});

// Get one user
app.get("/users/:id", (req, res) => {
    const { id } = req.params;
    // console.log(id);

    const user = users.find((user) => user.id === Number(id));
    // console.log(user);
    res.json(user);
});

// Create User
app.post('/users', (req, res) => {
    const user = req.body;
    // let user = {
    //     "id": 99,
    //     "first_name": "Rick",
    //     "last_name": "James",
    //     "email": "rickjames@test.com"
    // }
    users.push(user);
    res.json(user);
})

// Update existing User
app.put("/users/:id", (req, res) => {
    // Get index from URL
    const { id } = req.params;
    // Get the desired updates from the request body
    const updates = req.body;

    // Find user by ID
    const user = users.find((user) => user.id === Number(id));
    // Find user's position in array
    const userIndex = users.findIndex((user) => user.id === Number(id));

    const updatedUser = {
        ...user,
        ...updates,
    }

    users.splice(userIndex, 1, updatedUser);
    console.log(updatedUser);
    console.log(userIndex);

    res.json(users);
});

// Delete existing User
app.delete("/users/:id", (req, res) => {
    // Get index from URL
    const { id } = req.params;

    // Find user by ID
    // const user = users.find((user) => user.id === Number(id));
    // Find user's position in array
    const userIndex = users.findIndex((user) => user.id === Number(id));

    users.splice(userIndex, 1);

    // console.log(userIndex);

    res.json(users);
});

// Listen on port
app.listen(PORT, () =>{
    console.log(`Listening on port ${PORT}`);
});

// console.log("users", users)