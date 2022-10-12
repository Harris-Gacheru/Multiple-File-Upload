import express from 'express';
import multer from 'multer';
import cors from 'cors';

const app = express()
app.use(express.json())
app.use('/uploads', express.static('uploads'))
app.use(cors())

const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + path.extname(file.originalname))
    }
  })
  
const uploads = multer({ storage: storage })

app.get('/', (req, res) => {
    res.send('Uploads apis')
})

app.post('/upload', uploads.array('uploads'), (req, res) => {
    console.log(req.files, req.body)
    res.status(200).json({success: true, photos: req.files})
})

app.listen(3800, () => console.log('App running on port 3800'))