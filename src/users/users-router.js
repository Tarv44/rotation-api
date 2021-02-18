const path = require('path')
const express = require('express')
const bcrypt = require('bcrypt');
const saltRounds = 10;

const UsersService = require('./users-service')
const SongsService = require('../songs/songs-service');
const ExchangesService = require('../exchanges/exchanges-service');
const CommentsService = require('../comments/comments-service')

const usersRouter = express.Router()
const jsonParser = express.json()

usersRouter
    .route('/')
    //Responds with ids and usernames for all users
    .get((req, res, next) => {
        const db = req.app.get('db')
        UsersService.getAllUsers(db)
            .then(users => {
                const response = users.map(user => {
                    return {
                        id: user.id,
                        username: user.username
                    }
                })
                res.json(response)
            })
            .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const { username, email, password } = req.body
        const newUser = { username, email: email.toLowerCase()}
        
        for (const [key, value] of Object.entries(newUser)) {
            if (value === null) {
                return res.status(400).json({
                    error: { message: `Missing ${key} in request body.` }
                })
            }
        }

        const db = req.app.get('db')

        UsersService.getByEmail(db, email.toLowerCase())
            .then(user => {
                if (user) {
                    return res.status(404).json({
                        error: { message: 'Account with email already exists.' }
                    })
                } else {
                    UsersService.getByUsername(db, username)
                        .then(user => {
                            if (user) {
                                return res.status(404).json({
                                    error: { message: 'Username unavailble.' }
                                })
                            } else {
                                bcrypt.hash(password, saltRounds)
                                    .then(hash => {
                                        newUser.password = hash
                                        UsersService.insertUser(
                                            req.app.get('db'),
                                            newUser
                                          )
                                            .then(user => {
                                                const {id, username} = user
                                                const response = {id, username}
                                                res
                                                    .status(201)
                                                    .location(path.posix.join(req.originalUrl, `/${user.id}`))
                                                    .json(response)
                                            })
                                            .catch(next)
                                    })
                                    .catch(next)
                            }
                        })
                        .catch(next)
                }
            })
            .catch(next)
  
    })

usersRouter
    .route('/login')
    //Validates login info and returns id and username if account found and password matches.
    .post(jsonParser, (req, res, next) => {
        UsersService.getByEmail(
            req.app.get('db'),
            req.body.email.toLowerCase()
        )
            .then(user => {
                if (!user) {
                    return res.status(404).json({
                        error: { message: `Account with email doesn't exist.` }
                    })
                }
                return user
                 
                
            })
                .then(user => {
                    bcrypt.compare(req.body.password, user.password).then(function(result) {
                        if (!result) {
                            return res.status(401).json({
                                error: { message: 'Incorrect password.' }
                            })
                        }
                        const userInfo = {
                            id: user.id,
                            username: user.username
                        }
                        res.status(201).json(userInfo)
                    })
                })
            .catch(next)
    })

usersRouter
    .route('/:user_id/exchanges')
    //Responds with all exchanges the user with given user_id has interacted with (i.e. created, commented, or added a song to)
    .get((req, res, next) => {
        const db = req.app.get('db')
        const user_id = req.params.user_id
        const exchanges = []
        ExchangesService.getByCreateBy(
            db,
            user_id
        )
            .then(ex => {
                exchanges.push(...ex)
                SongsService.getByAddedBy(db, user_id)
                    .then(songs => {
                        const exchangesBySong = songs.map(song => {
                            return ExchangesService.getById(db, song.exchange_id)
                                .then(ex => exchanges.push(ex))
                                .catch(next)
                        })
                        Promise.all(exchangesBySong).then(() => {
                            CommentsService.getByCreateBy(db, user_id)
                                .then(comments => {
                                    const exchangesByComm = comments.map(comm => {
                                        return ExchangesService.getById(db, comm.exchange_id)
                                            .then(ex => exchanges.push(ex))
                                            .catch(next)
                                    })
                                    Promise.all(exchangesByComm).then(() => {
                                        const uniqueEx = Array.from(new Set(exchanges.map(ex => ex.id)))
                                            .map(id => {
                                                return exchanges.find(ex => ex.id === id)
                                            })
                                        res.status(200).json(uniqueEx)
                                    })
                                })
                                .catch(next)
                        })
                    })
                    .catch(next)
            })
            .catch(next)
    })

module.exports = usersRouter