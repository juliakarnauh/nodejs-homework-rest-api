const messagesList = {
    401: "Not authorized",
}

const HttpError = (status, message = messagesList[status]) => {
    const error = new Error(message);
    error.status = status;
    return error;
}

module.exports = HttpError;