"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diacriticSensitiveRegex = exports.arrayToArrayObject = void 0;
const arrayToArrayObject = (array, expression) => {
    const searchIn = [];
    let search = [];
    const white_list = [];
    for (let i = 0; i < array.length; ++i) {
        let rv = {};
        if (array[i] !== undefined) {
            search = array[i].split('.');
            if (search.length > 1 && white_list.includes(search[0].toString())) {
                rv[search[0].toString()] = { $elemMatch: { [search[1].toString()]: expression, status: true } };
            }
            else {
                rv[array[i].toString()] = expression;
            }
            searchIn.push(rv);
        }
    }
    return searchIn;
};
exports.arrayToArrayObject = arrayToArrayObject;
const diacriticSensitiveRegex = async (string = '') => {
    return string.toLowerCase()
        .replace(/[aâäàåá]/g, '[a,â,ä,à,å,á]')
        .replace(/[eêëèé]/g, '[e,ê,ë,è,é]')
        .replace(/[iïîìí]/g, '[i,ï,î,ì,í]')
        .replace(/[oôöòó]/g, '[o,ô,ö,ò,ó]')
        .replace(/[uüûùú]/g, '[u,ü,û,ù,ú]')
        .replace(/[nñ]/g, '[n]');
};
exports.diacriticSensitiveRegex = diacriticSensitiveRegex;
//# sourceMappingURL=conversors.js.map