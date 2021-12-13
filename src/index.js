#!/usr/bin/env node

/**
 * Module dependencies.
 */

import app from './app'
import http from 'http'
import dotenv from 'dotenv'
dotenv.config({ path: ".env" })


/**
 * Configure port
 */
const port = process.env.SERVER_PORT
app.set('port', port)

/**
 * Create HTTP server.
 */
const server = http.createServer(app)

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => {
    console.log(`API running in port ${port}`)
})