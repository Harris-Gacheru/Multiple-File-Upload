"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/uploads', express_1.default.static('uploads'));
app.use((0, cors_1.default)());
const path = require('path');
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});
const uploads = (0, multer_1.default)({ storage: storage });
app.get('/', (req, res) => {
    res.send('Uploads apis');
});
app.post('/upload', uploads.array('uploads'), (req, res) => {
    console.log(req.files, req.body);
    res.status(200).json({ success: true, photos: req.files });
});
app.listen(3800, () => console.log('App running on port 3800'));
//# sourceMappingURL=server.js.map