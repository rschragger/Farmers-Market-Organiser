
// This is not a helper as it does not have a next()

// It is used to simply identify true or false
const isOrganiser = (roleType, options) => {
    if (roleType?.toLoserCase() === "organiser") {
        return options.fn(this);
    }
    else {
        return options.inverse(this);
    }
};

// This is not a helper as it does not have a next()
// It is used to simply identify true or false
const isStallholder = (roleType, options) => {
    if (roleType?.toLowerCase() === "stallholder") {
        return options.fn(this);
    }
    else {
        return options.inverse(this);
    }
};

const formatDate = (date) => {
    return `${new Date(date).getMonth()}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
}

const generateMarketLink = (marketId) => {
    return `/market/${marketId}`;
}

module.exports = { isOrganiser, isStallholder, formatDate, generateMarketLink };