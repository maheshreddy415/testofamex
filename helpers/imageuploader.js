var multer  = 	require('multer');

var storage = 	multer.diskStorage({
                    destination: function (req, file, cb) {
                        cb(null, './public/contactimages')
                    },
                    filename: function (req, file, cb) {
                        cb(null, Date.now() + '-' + file.originalname)
                    },
                    onFileUploadStart: function(file) {
                        if(file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
                            return false;
                        }
                    }
                });

module.exports = {
    upload : multer({ storage: storage })
}