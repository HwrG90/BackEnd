const { validationResult }  = require('express-validator');

const validateResult = (req,res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.json(errors)
    }
    else {
        res.send("Successfully validated")
    }
}

module.exports = validateResult;