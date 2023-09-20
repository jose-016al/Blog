const validator = require('validator');

const validate = (parameters) => {
    let validar_title = !validator.isEmpty(parameters.title);
    let validar_content = !validator.isEmpty(parameters.content);

    if (!validar_title || !validar_content) {
        throw new Error("No se ha validado la informacion");
    }
}

module.exports = {
    validate
}