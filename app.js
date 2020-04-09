const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const app = express();
const path = require('path')
const PORT = config.get('port') || 5000

const auth = require('./routes/auth.routes')
const link = require('./routes/link.routes')
const redir = require('./routes/redirect.routes')


app.use(express.json({extended: true}))
app.use('/api/auth',  auth)
app.use('/api/link', link)
app.use('/t', redir)

if (process.env.NODE_ENV === 'production'){
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', (req, res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

async function start(){
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            keepAlive: true, 
            keepAliveInitialDelay: 300000
        })
    } catch(e) {
        console.log('Server Error', e.message)
        //process.on('exit', code=1)
        process.exit(1)
        


    }
}

start()


app.listen(PORT, ()=>{
    console.log(`app has been started on ${PORT} port...`)
})