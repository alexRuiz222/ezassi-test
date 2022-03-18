"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileValidation = void 0;
// Files validators
const fileValidation = (req, res, next) => {
    console.log(req.files);
    // Conditional for the type of files and if there is an uploaded file
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
        return res.status(400).json({
            param: "file",
            location: "body",
            msg: 'There are no files to upload - validate upload file',
            msg_es: 'No hay archivos que subir - validar archivo subir'
        });
    }
    next();
};
exports.fileValidation = fileValidation;
exports.default = exports.fileValidation;
//# sourceMappingURL=file_validation.js.map