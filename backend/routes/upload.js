const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const authenticated = require('../middlewares/authenticated');
const hasRole = require('../middlewares/hasRole');
const ROLES = require('../constants/roles');

// Создаем директорию для загрузок, если её нет
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Настройка хранилища для multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir)
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + path.extname(file.originalname))
    }
});

// Фильтр файлов
const fileFilter = (req, file, cb) => {
    console.log('Получен файл:', file.originalname, 'тип:', file.mimetype);
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Только изображения могут быть загружены!'), false);
    }
};

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5 MB
    }
}).array('images', 5);

// Защищаем роут аутентификацией и ролями
router.use(authenticated);
router.use(hasRole([ROLES.ADMIN]));

router.post('/', (req, res) => {
    upload(req, res, function(err) {
        console.log('Начало обработки загрузки');
        
        if (err instanceof multer.MulterError) {
            console.error('Multer error:', err);
            return res.status(400).json({ error: `Ошибка загрузки: ${err.message}` });
        } else if (err) {
            console.error('Other error:', err);
            return res.status(400).json({ error: err.message });
        }

        // Проверяем наличие файлов
        if (!req.files || req.files.length === 0) {
            console.error('Файлы не найдены в запросе');
            return res.status(400).json({ error: 'Файлы не были загружены' });
        }

        console.log('Файлы успешно загружены:', req.files.map(f => f.filename));

        const paths = req.files.map(file => `/uploads/${file.filename}`);
        res.json({ paths });
    });
});

module.exports = router; 