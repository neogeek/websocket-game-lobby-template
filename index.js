import http from 'http-single-serve';
import websocket from './websocket.js';

websocket({
    server: http({
        port: process.env.PORT || 5000
    })
});
