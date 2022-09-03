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
    const dateObj = moment(date).format('Do MMM YYYY, h:mm a');
    
    return dateObj;
    
    //return `${new Date(date).getMonth()}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
}


https://stackoverflow.com/questions/18580495/format-a-date-from-inside-a-handlebars-template-in-meteor
var DateFormats = {
    short: "DD/MM/YYYY",
    long:'Do MMM YYYY, h:mm a',
    dayLong:'ddd Do MMM YYYY, h:mm a',
    timeOnly:'hh:mm a',
};

const formatDateMulti = (datetime,format) => {
    if (moment) {
        // can use other formats like 'lll' too
        format = DateFormats[format] || format;
        return moment(datetime).format(format);
      }
      else {
        return datetime;
      }
}
 

const generateMarketLink = (marketId) => {
    return `/market/${marketId}`;
}

// This will help handlebars start an index at 1 insteadmof 0
  const incremented = (index)=>{
    index++;
    return index;
  }




module.exports = {
    isOrganiser,
    isStallholder,
    formatDate,
    formatDateMulti,
    incremented,
    generateMarketLink,
    isResultAProduct,
    isResultAMarket,
    isResultAStallholder,
    generateMarketLogoUrl,
    generateMarketByIdUrl };



