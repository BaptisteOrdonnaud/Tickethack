const checkBody = (body, keys) => {
    for (let i = 0; i < keys.length; i++) {
        if (!body[keys[i]]) {
            return false
        }
    }
    return true
};

module.exports = { checkBody }
