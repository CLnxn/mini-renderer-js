const express = require('express')
const app = express()
const PORT = 3000


app.get('/', function(req,res){
   
    res.sendFile(__dirname+'/frontend/page/index.html', function(err){
        if (err) console.error(`Error occurred in get: ${err}`)
    })
})

app.use('/scripts', function(req,res){
    console.log(req.url)
    url = req.url.replace(/[/\\]/,'')
    if (String.prototype.includes.call(url,'..') || !url){
        res.send('invalid url format')
    }

    res.sendFile(__dirname+`/frontend/scripts/${url}`, function(err){
        if (err) console.error(`Error occurred in get: ${err}`)
    })
})

app.listen(PORT,function(){
    console.log(`listening on port ${PORT}`)
})