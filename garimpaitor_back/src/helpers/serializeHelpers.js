const serializeString = string => {
    if (string) {
        return string.trim().toUpperCase();
    }

    return '';
}

const serializeInteger = int => {
    newInt = parseInt(int);

    if (isNaN(newInt) || int == 0) {
        return ''
    }

    return Math.abs(parseInt(int));
}

const serializePassword = password => {
    if (password) {
        return password.trim();
    }

    return '';
}

const serializeCnpj = cnpj => {
    return cnpj.replace(/[^\d]+/g, '');
}

const serializeCep = cep => {
    return cep.replace(/\.|\-/g, '');
}

module.exports = { serializeString, serializeInteger, serializePassword, serializeCnpj, serializeCep };
