function requireHTTPS (req, res, next) {
    // membuat semua request yang sebelumnya HTTP biasa menjadi HTTPS
    if(
        !req.secure
        // khusus untuk server yang di deploy di Heroku
        && req.get('x-forwarded-proto') !== 'https'
    ) {
        return res.redirect(
            'htpps://' + req.get('host') + req.url
        )
    }

    next();
}

// aplikasi Express-nya

const express = require('express');
const app = express();
const port = process.env.PORT || 8080

app.use(requireHTTPS) // di comment kalo mau tes di lokal
app.use(express.static('./dist/todo'))

app.get('/*', (req, res) => res.sendFile('index.html', {root: './dist/todo'}))

app.listen(port, () => {
    console.log(`My Angular application is now running! http://localhost:${port}`)
})