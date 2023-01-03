import express from 'express'
import mongoose from 'mongoose'
import auth from './routes/auth.js'
import passportConfig from './passport/passport.js'
import passport from 'passport'
import cookieSession from 'cookie-session'
// import session from 'express-session';
const app = express()

mongoose.set("strictQuery", false)

mongoose.connect('mongodb+srv://melto:1234@armor.ldce99i.mongodb.net/passportApp', () => {
    console.log("DB Connected")
})

// app.use(session({
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: false
// }));

app.use(cookieSession({
    keys: ['key12345'],
    maxAge: 3 * 24 * 60 * 60 * 1000
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/auth', auth)

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('home')
})

app.listen(4000, () => {
    console.log("Server is running on port 4000")
})