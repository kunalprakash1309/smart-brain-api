const express = require('express');
const cors = require('cors');
const knex = require('knex');
const bycrpt = require('bcrypt-nodejs')

const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const db = knex({
    client: 'pg',
    connection: {
      host : 'postgresql-regular-50553',
      user : 'postgres',
      password : 'kunal',
      database : 'smart_brain'
    }
})


const app = express();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {res.send("it is working!")})

app.post('/signin', (req, res) => {signin.handleSignIn(req, res, db, bycrpt)} )

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bycrpt)})

app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, db)})

app.put('/image', (req, res) => {image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})

app.listen(process.env.PORT || 3000, () => {
    console.log(`server is running on port 3000 ${process.env.PORT}`)
})

