const path = require('path')
const express = require('express')
const xss = require('xss')
const SongsService = require('../songs/songs-service')
const CommentsService = require('../comments/comments-service')
const { response } = require('express')

const songsRouter = express.Router()
const jsonParser = express.json()

songsRouter
    .route('/')
    .post(jsonParser, (req,res,next) => {
        const db = req.app.get('db')
        const  { title, artist, album, url_link, exchange_id, added_by } = req.body
        const newSong = { title, artist, exchange_id, added_by }
        
        for (const [key, value] of Object.entries(newSong)) {
            if (value == null) {
                return res.status(400).json({
                    error: { message: `Missing ${key} in request body.`}
                })
            }
        }

        newSong.album =  album || ''
        newSong.url_link = url_link || ''

        SongsService.insertSong(db, newSong)
            .then(song => res.status(201).json(song))
            .catch(next)
    })

module.exports = songsRouter