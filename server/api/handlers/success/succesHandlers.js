exports.successfullResponse = function(res, data, message) {
    return res.status(200).json({
        success: true,
        status: 200,
        message,
        error: null,
        result: data
    });
};

exports.successfullResponseWithToken = function(res, token, message) {
    return res.header('x-jwt-token', token).status(200).json({
        success: true,
        status: 200,
        message,
        error: null,
        result: { 'xjt': token }
    });
}