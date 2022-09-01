
// This is not a helper as it does not have a next()
// It is used to simply identify true or false
const isOrganiser = () => {
    if (!req.session.role_type) {
        return false
    }
    else if (req.session.role_type === "organiser") {
        return true
    }
    else {
        return false
    }
};

// This is not a helper as it does not have a next()
// It is used to simply identify true or false
const isStallholder = () => {
    if (req.session.role_type === undefined) {
        return false
    }
    else if (req.session.role_type === "stallholder") {
        return true
    }
    else {
        return false
    }
};

const formatDate = (date) => {
    return `${new Date(date).getMonth()}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
}

const generateMarketLink = (marketId) => {
    return `/market/${marketId}`;
}

module.exports = { isOrganiser, isStallholder, formatDate, generateMarketLink };