
/**
 * Utility function to send server error response
 * @param {*} res 
 * @param {*} error 
 * @param {*} message 
 * @returns 
 */
const sendServerError = (res, error, message = 'Internal server error') => {
    console.error(error);
    return res.status(500).send({
        message
    });
};

module.exports = {
    sendServerError
};