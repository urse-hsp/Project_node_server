const express = require('express')
const compression = require('compression')
const app = express()

// 先压缩在托管
app.use(compression())
app.use(express.static('./dist'))

app.listen(80, ()=> {
    console.log('server running at http://127.0.0.1')
})