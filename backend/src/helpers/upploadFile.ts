// External libreries
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
// Function for upload file
const upload_files = (files, valid_extensions = ['png', 'jpg', 'jpeg', 'gif'], folder = '', id = '') => {
    return new Promise((resolve, reject) => {
        // Recieve file send
        const { file } = files;
        const cut_name = file.name.split('.'); // Separate name from extension
        const extension = cut_name[cut_name.length - 1]; // Save extension

        // Validate the extension
        if (!valid_extensions.includes(extension)) { // Condition if image extension is not allowed
            return reject({
                msg: `The extension ${extension} not allowed - ${valid_extensions}`,
                msg_es: `La extension ${extension} no es permitida - ${valid_extensions} `
            });
        }

        // Give it a temporary name
        const name_temp = uuidv4() + '.' + extension;
        // folder, id,
        let upload_path = path.join('./data/cards/', name_temp);
        // Move file
        // console.log('UPLDAd: ' + upload_path);
        file.mv(upload_path, (err) => {
            console.log(err);
            if (err) {
                return reject(err);
            }

            resolve({
                name_temp
            });
        })
    });
}

export { upload_files }