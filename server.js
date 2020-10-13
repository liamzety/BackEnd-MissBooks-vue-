const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const cors = require('cors')
const path = require('path')

const app = express()
const port = process.env.PORT || 3030;
const http = require('http').createServer(app);

// Express App Config
app.use(bodyParser.json())
app.use(cookieParser())
app.use(session({
    secret: 'ahla bahla shebaolam',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')));
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    };
    app.use(cors(corsOptions));
}

app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
})

http.listen(port, () => {
    (`listening on http://localhost:${port}`)
})


