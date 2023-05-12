require('dotenv').config()
const express = require('express')
const { initDB } = require('./database');
const Task = require('./database/models/todo.model')
const PORT = process.env.PORT
const cors = require('cors')
const http = require("http");
const User = require('./database/models/user.model')
const Token = require('./database/models/token.model')



const app = express()

app.use(cors())
app.use(express.json())

http.createServer(app).listen(PORT, () => {
    console.log('Server is working on port '+ PORT)
})

initDB();

app.use('/todos', async (req, res, next) => {
    try {
        const token = await Token.findByPk(req.body.token)
        const user = await User.findByPk(req.body.id)
        console.log(token.value)
        console.log(req.body.token)
        if (token.value && req.body.token === '2d2aa131-c2af-4c86-a338-6d5c9aef885c') {
            next()
        } else {
            res.status(500).json({message: "Токен не найден"})
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

app.get("/todos", async (req, res) => {
    try {
        const todos = await Task.findAll();
        res.json({
            todos
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
});


app.get("/todos/:id", async (req, res) => {
    try {
        const todo = await Task.findByPk(req.params.id);
        res.json({
            todo
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
});


app.post("/todos", async (req, res) => {
    try {
        const todo = await Task.create({
            title : req.body.title,
            description : req.body.description
        })
        res.json({
            todo
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.patch("/todos/:id", async (req, res) => {
    try {
        const todo = await Task.findByPk(req.params.id);
        await Task.update({
                title : req.body.title,
                description : req.body.description},
            {where : {id: req.params.id}});
        res.json({
            todo
        })
    }   catch (error) {
        res.status(500).json({ message: error.message });
    }
});


app.delete("/todos", async (req, res) => {
    try {
        const todos = await Task.findAll();
        for (let todo of todos) {
            await todo.destroy()

        }
        res.json({
            todos
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.delete("/todos/:id", async (req, res) => {
    try {
        const todo = await Task.findByPk(req.params.id);
        await todo.destroy();
        res.json({
            todo
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

});

app.post('/registration', async (req, res) => {
    try {
        const checkEmail = await User.findOne({where : {email: req.body.email}})
        if (checkEmail) {
            res.status(400).json({message: 'Ошибка. Такой пользователь уже есть'})
        }
        else {
            const user = await User.create({
                firstName: req.body.name,
                lastName: req.body.lastName,
                email: req.body.email.toLowerCase(),
                password: req.body.password
            })
            res.json(user)
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

app.post('/auth', async (req, res) => {
    try {
        const user = await User.findOne({where : {email: req.body.email, password: req.body.password}})
        if (user) {
            const token = await Token.create({
                userId: user.id
            })
            res.json(token)
        } else {
            res.status(400).json({message: 'Некорретные данные'})
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

