const FATAL_ERROR_APP = error => (
    { error: true, success: false, codeError: 'FATAL_ERROR_APP', msgError: error.message }
);

const AUTH_ERROR_APP = error => (
    { error: true, success: false, codeError: 'AUTH_ERROR_APP', msgError: error.message }
);

const NOT_SYSTEM_TOKEN_ERROR = error => (
    { error: true, success: false, codeError: 'AUTH_ERROR_API_SYSTEM', msgError: error.message }
);

module.exports = { FATAL_ERROR_APP, AUTH_ERROR_APP, NOT_SYSTEM_TOKEN_ERROR };