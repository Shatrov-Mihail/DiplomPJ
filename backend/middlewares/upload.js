const multer = require('multer');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

// Создаем папку uploads, если её нет
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Недопустимый формат файла. Разрешены только JPEG, JPG и PNG'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB
    }
});

const resizeImages = async (req, res, next) => {
    if (!req.files) return next();

    req.files = await Promise.all(
        req.files.map(async file => {
            const filePath = path.join(uploadDir, file.filename);
            
            await sharp(file.path)
                .resize(800, 600, { // Стандартный размер для основного изображения
                    fit: 'inside',
                    withoutEnlargement: true
                })
                .jpeg({ quality: 85 })
                .toFile(path.join(uploadDir, 'resized-' + file.filename));

            // Удаляем оригинальный файл
            fs.unlinkSync(file.path);
            
            // Обновляем путь к файлу
            file.filename = 'resized-' + file.filename;
            file.path = path.join(uploadDir, file.filename);
            
            return file;
        })
    );

    next();
};

module.exports = { upload, resizeImages };
