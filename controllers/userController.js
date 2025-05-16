const getProfile = (req, res) => {

    res.json(req.user);
}

module.exports = {
    getProfile
}