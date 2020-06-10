module.exports = function() {
    const getSession = function(req, res) {
        return res.send(req.session);
    };
    return { getSession };
};