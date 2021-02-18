const path = require('path')
const express = require('express')
const CommentsService = require('./comments-service')
const ExchagesService = require('../exchanges/exchanges-service')

const commentsRouter = express.Router()
const jsonParser = express.json()

commentsRouter
    .route('/')
    .post(jsonParser, (req, res, next) => {
        const db = req.app.get('db')
        const { message, song_id, exchange_id, created_by } = req.body
        const newComment = { message, song_id, exchange_id, created_by }

        for (const [key, value] of Object.entries(newComment)) {
            if (value == null) {
                return res.status(400).json({
                    error: { message: `Missing ${key} in request body.` }
                })
            }
        }

        CommentsService.insertComment(
            db,
            newComment
        )
            .then(comment => {
                ExchagesService.updateExchange(
                    db,
                    comment.exchange_id,
                    { modified: comment.date_added }
                )
                    .then(() => {
                        res
                            .status(201)
                            .json(comment)
                    })
            })
    })

module.exports = commentsRouter