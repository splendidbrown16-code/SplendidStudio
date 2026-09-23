const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadDirectory =
    path.join(__dirname, "..", "uploads", "orders");

fs.mkdirSync(uploadDirectory, {
    recursive: true
});

const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, uploadDirectory);
    },

    filename: (req, file, cb) => {

        const extension =
            path.extname(file.originalname);

        const baseName =
            path.basename(
                file.originalname,
                extension
            )
            .replace(/[^a-zA-Z0-9-_]/g, "-")
            .slice(0, 60);

        const uniqueName =
            `${Date.now()}-${Math.round(
                Math.random() * 1e9
            )}-${baseName}${extension}`;

        cb(null, uniqueName);
    }
});

const upload = multer({
    storage,

    limits: {
        files: 10,
        fileSize: 20 * 1024 * 1024
    }
});

module.exports = upload;
