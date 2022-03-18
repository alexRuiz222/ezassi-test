const arrayToArrayObject = (array: any, expression: RegExp) => {
    const searchIn: any[] = [];
    let search: any[] = [];
    const white_list: any[] = [];
    for (let i = 0; i < array.length; ++i) {
        let rv: any = {};
        if (array[i] !== undefined) {
            search = array[i].split('.');

            if (search.length > 1 && white_list.includes(search[0].toString())) {
                rv[search[0].toString()] = { $elemMatch: { [search[1].toString()]: expression, status: true } };

            } else {
                rv[array[i].toString()] = expression;
            }
            searchIn.push(rv);
        }

    }

    return searchIn;
}

const diacriticSensitiveRegex = async (string = '') => {
    return string.toLowerCase()
        .replace(/[aâäàåá]/g, '[a,â,ä,à,å,á]')
        .replace(/[eêëèé]/g, '[e,ê,ë,è,é]')
        .replace(/[iïîìí]/g, '[i,ï,î,ì,í]')
        .replace(/[oôöòó]/g, '[o,ô,ö,ò,ó]')
        .replace(/[uüûùú]/g, '[u,ü,û,ù,ú]')
        .replace(/[nñ]/g, '[n]');
}

export { arrayToArrayObject, diacriticSensitiveRegex };