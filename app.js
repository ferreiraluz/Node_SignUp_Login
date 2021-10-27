const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const bcrypt = require('bcryptjs')

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.set('view engine', 'ejs');

const connection = require("./database/connection");
const User = require("./database/models")

connection.authenticate()
    .then(() => console.log('Sequelize is running too!'))
    .catch((error) => {
        console.log(error);
    });

    // routes

    app.get("/", (req, res)=>{
        res.render("index")
    });

    app.post('/register', (req, res)=>{
        const username = req.body.username;
        const birthday = req.body.birthday;
        const media = req.body.media;
        const email = req.body.email;
        const password = req.body.password;

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        User.create({
            name: username,
            birthday: birthday,
            media: media,
            email: email,
            password: hash
        }).then(()=>{
            res.redirect("/loginpage")
        })
    });

    app.get("/loginpage", (req, res)=>{
        res.render("login")
    });

    app.post("/login", (req, res)=>{
        const email = req.body.email;
        const password = req.body.password;

        User.findOne({where: {email: email}}).then(user => {
            if(user != undefined){
                const correct = bcrypt.compareSync(password, user.password);
                if(correct){
                    res.render("session")
                }else{
                    alert("Dados não compatíveis")
                }
            }else{
                alert("esse login não existe")
            }
        })
    });

    app.get("/session", (req, res)=>{
        res.send("Login executado com sucesso!")
    })

app.listen(8080, ()=>{
    console.log('Server is running');
})