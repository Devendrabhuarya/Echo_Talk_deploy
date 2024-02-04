const Router = require('express').Router();
const authController = require('../controller/auth-controller');
const activateController = require('../controller/activate-controller');
const roomController = require('../controller/rooms-controller');
const authMiddelware = require('../middelware/auth-middelware');
const userController = require('../controller/user-controller');

const multer = require('multer');
// const upload = multer({ dest: '../client/public/images' });
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/public/images')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const upload = multer({ storage: storage })

Router.post('/phone', authController.sendOtp);
Router.post('/verify', authController.verifyOtp);
Router.post('/activate', authMiddelware, upload.single('image'), activateController.activate);
Router.get('/refresh', authController.refresh);
Router.post('/logout', authController.logOutUser);
Router.post('/room', authMiddelware, roomController.create);
Router.get('/room', authMiddelware, roomController.index);
Router.get('/room/:roomId', authMiddelware, roomController.show);
Router.get('/user/:userId', authMiddelware, userController.getUser);
Router.get('/user/:userId', authMiddelware, userController.getUser);
Router.post('/edit-profile', upload.single('image'), authMiddelware, userController.editUserProfile);

module.exports = Router;
