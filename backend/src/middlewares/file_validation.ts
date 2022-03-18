import { Request, Response } from 'express';
// Files validators
export const fileValidation = (req: any, res: Response, next: any) => {
    console.log(req.files);
    // Conditional for the type of files and if there is an uploaded file
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
        return res.status(400).json({ // Error message
            param: "file",
            location: "body",
            msg: 'There are no files to upload - validate upload file',
            msg_es: 'No hay archivos que subir - validar archivo subir'
        });
    }

    next();
}

export default fileValidation;
