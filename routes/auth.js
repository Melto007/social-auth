import express from 'express'
const router = express.Router()
import passport from 'passport'

router.get('/login', (req, res) => {
    res.render('login')
})

router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}), (req, res) => {
    res.send('login with google')
})

router.get('/google/callback', passport.authenticate('google'), (req, res) => {
    res.send(req.user)
})

router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/auth/login')
})

export default router