const path = require('path')
const express = require('express')
const SongsService = require('../songs/songs-service')
const ExchangesService = require('../exchanges/exchanges-service')

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
            .then(song => {
                ExchangesService.updateExchange(
                    db,
                    song.exchange_id,
                    { modified: song.date_added }
                )
                    .then(() => {
                        res.status(201).json(song)
                    })
                    .catch(next)
            })
            .catch(next)
            
    })

module.exports = songsRouter