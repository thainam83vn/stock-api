const moment = require("moment");

class Quotes {
  constructor(service) {
    this.service = service;
  }

  quote(symbol) {
    const data = this.service.dailyQuotes(symbol);
    const days = data["Time Series (Daily)"];
    const date = moment();
    // console.log(date.toString("yyyy-MM-dd"));
    const sortedArr = Object.keys(days).map(date => ({ date, ...days[date] }));
    const quotes = sortedArr.map(quote => quote["4. close"]).slice(0, 7);
    let percent = [];
    for (let i = 0; i < quotes.length - 1; i++) {
      percent.push(((quotes[i] - quotes[i + 1]) * 100) / quotes[i + 1]);
    }
    let percentCont = [percent[percent.length - 1]];
    for (let i = percent.length - 2; i >= 0; i--) {
      percentCont = [percent[i] + percentCont[0], ...percentCont];
    }
    return {
      endDate: sortedArr[0].date,
      quotes: quotes,
      percent: percent,
      percentCont: percentCont
    };
  }
}

module.exports = Quotes;
