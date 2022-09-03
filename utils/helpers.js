const moment = require('moment');

// It is used to simply identify true or false
const isOrganiser = (roleType, options) => {
    if (roleType?.toLoserCase() === "organiser") {
        return options.fn(this);
    }
    else {
        return options.inverse(this);
    }
};

// It is used to simply identify true or false
const isStallholder = (roleType, options) => {
    if (roleType?.toLowerCase() === "stallholder") {
        return options.fn(this);
    }
    else {
        return options.inverse(this);
    }
};

const isResultAProduct = (result, options) => {
    if (result === "product") {
        return options.fn(this);
    }
    else {
        return options.inverse(this);
    }
};

const isResultAMarket = (result, options) => {
    if (result === "market") {
        return options.fn(this);
    }
    else {
        return options.inverse(this);
    }
};

const isResultAStallholder = (result, options) => {
    if (result === "stallholder") {
        return options.fn(this);
    }
    else {
        return options.inverse(this);
    }
};

const generateMarketLogoUrl = (filename) => {
    return `/images/logos/${filename}`;
}

const generateMarketByIdUrl = (id) => {
    return `/market/${id}`;
}

const formatDate = (date) => {
    const dateObj = moment().format('Do MMM YYYY, h:mm a');
    
    return dateObj;
    
    //return `${new Date(date).getMonth()}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
}

const generateMarketLink = (marketId) => {
    return `/market/${marketId}`;
}

module.exports = {
    isOrganiser,
    isStallholder,
    formatDate,
    generateMarketLink,
    isResultAProduct,
    isResultAMarket,
    isResultAStallholder,
    generateMarketLogoUrl,
    generateMarketByIdUrl };