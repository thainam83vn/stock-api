const service = require("./mock/mock-api");
const Quotes = require("./libs/quotes");

const quotes = new Quotes(service);

console.log(quotes.quote("MSTF"));
