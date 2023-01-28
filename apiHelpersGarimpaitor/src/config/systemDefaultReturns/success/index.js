const RETURN_DEFAULT = data => (
    { error: false, success: true, codeSuccess: 'RETURN_DEFAULT', ...data }
);

const RETURN_DEFAULT_ARRAY = data => (
    { error: false, success: true, codeSuccess: 'RETURN_DEFAULT_ARRAY', dataArray: (Array.isArray(data) ? data : []) }
);

const RETURN_DEFAULT_REGISTER_DB = data => (
    { error: false, success: true, codeSuccess: 'RETURN_DEFAULT_REGISTER_DB', registerDB: data }
);

module.exports = { RETURN_DEFAULT, RETURN_DEFAULT_ARRAY, RETURN_DEFAULT_REGISTER_DB };