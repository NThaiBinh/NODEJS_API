const express = require('express')

function configServer(app) {
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
}

module.exports = {
    configServer
}