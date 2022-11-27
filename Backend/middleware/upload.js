const multer = require('multer')
const GridFsStorage = require('multer-gridfs-storage').GridFsStorage;

const storage = new GridFsStorage({
    url: process.env.DBURI,
    options: {useNewUrlParser: true, useUnifiedTopology: true},
    file: (req,file)=>{
        const match = ['image/png', 'image/jpg', 'image/jpeg', 'application/pdf']
        if(match.indexOf(file.mimetype)=== -1){
            const filename = `parchi-secure-${file.originalname}`
            return filename
        }
        return {
            bucketname:"fs", 
            filename:`parchi-secure-${file.originalname}`
        }
    }
})

module.exports = multer({storage})