const stock = {};
const stocksAutocomplete = [];

const searchInput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

stock.key = "JA9OLHR835O1ITHO";
stock.key1 = "UYPIKHB4XXWK9KU4";
stock.key2 = "SA55F80KKKKUH2DO";
stock.baseUrl = "https://www.alphavantage.co/query?function=";

stock.key3 = "pk_7e9c23ddd08d4c55a62b94bc26f7c699"
stock.baseUrl2 = "https://cloud.iexapis.com/"

stock.getStock = function (stockQuery) {
    const stockPromise =
        $.ajax({
            url: `${stock.baseUrl}`,
            method: "GET",
            dataType: 'json',
            data: {
                apikey: stock.key,
                function: "GLOBAL_QUOTE",
                symbol: stockQuery
            }
        })
    return stockPromise
}
// create another key to bypass the 5 API calls - tried doing this but doesn't seem to work if I have different keys
stock.getStock1 = function (stockQuery) {
    const stockPromise =
        $.ajax({
            url: `${stock.baseUrl}`,
            method: "GET",
            dataType: 'json',
            data: {
                apikey: stock.key1,
                function: "GLOBAL_QUOTE",
                symbol: stockQuery
            }
        })
    return stockPromise
}

stock.getStockTechnical = function (stockQuery, func, interval) {
    const stockPromise =
        $.ajax({
            url: `${stock.baseUrl}`,
            method: "GET",
            dataType: 'json',
            data: {
                apikey: stock.key2,
                function: func,
                symbol: stockQuery,
                interval: interval,
                time_period: "14",
                series_type: "close"
            }
        })
    return stockPromise
}

stock.getStock2 = function (stockQuery) {
    const stockPromise =
        $.ajax({
            url: `${stock.baseUrl2}stable/stock/${stockQuery}/news/last/quote?token=${stock.key3}`,
            method: "GET",
            dataType: 'jsonp',
        })
    return stockPromise
}

stock.getStockStats = function (stockQuery) {
    const stockPromise =
        $.ajax({
            url: `${stock.baseUrl2}stable/stock/${stockQuery}/stats/quote?token=${stock.key3}`,
            method: "GET",
            dataType: 'jsonp',
        })
    return stockPromise
}

// header section
$("#webticker").webTicker()

// is there anyway I could have done this more efficiently???
stock.getStockTickerScroll = function (stock1, stock2, stock3, stock4, stock5, stock6, stock7) {
    stock.getStock(stock1).then(function (result) {
        x = Object.values(result)
        const data = x[0]
        const htmlToAppend = `
            <li class = "webticker-info"> Dow Jones: ${data["01. symbol"]} ${data["05. price"]} ${data["09. change"]} ${data["10. change percent"]}</li>`;
        $("#item1").html(htmlToAppend);
    }).fail(function (error) {
        console.log(error);
    });
    stock.getStock(stock2).then(function (result) {
        x = Object.values(result)
        const data = x[0]
        const htmlToAppend2 = `
            <li class = "webticker-info"> S&P 500: ${data["01. symbol"]} ${data["05. price"]} ${data["09. change"]} ${data["10. change percent"]}</li>`;
        $("#item2").html(htmlToAppend2);
    }).fail(function (error) {
        console.log(error);
    });
    stock.getStock(stock3).then(function (result) {
        x = Object.values(result)
        const data = x[0]
        const htmlToAppend3 = `
            <li class = "webticker-info"> Russell 2000: ${data["01. symbol"]} ${data["05. price"]} ${data["09. change"]} ${data["10. change percent"]}</li>`;
        $("#item3").html(htmlToAppend3);
    }).fail(function (error) {
        console.log(error);
    });
    stock.getStock(stock4).then(function (result) {
        x = Object.values(result)
        const data = x[0]
        const htmlToAppend4 = `
            <li class = "webticker-info"> Crude Oil: ${data["01. symbol"]} ${data["05. price"]} ${data["09. change"]} ${data["10. change percent"]}</li>`;
        $("#item4").html(htmlToAppend4);
    }).fail(function (error) {
        console.log(error);
    });
    stock.getStock(stock5).then(function (result) {
        x = Object.values(result)
        const data = x[0]
        const htmlToAppend5 = `
            <li class = "webticker-info"> Gold: ${data["01. symbol"]} ${data["05. price"]} ${data["09. change"]} ${data["10. change percent"]}</li>`;
        $("#item5").html(htmlToAppend5);
    }).fail(function (error) {
        console.log(error);
    });
    stock.getStock(stock6).then(function (result) {
        x = Object.values(result)
        const data = x[0]
        const htmlToAppend6 = `
            <li class = "webticker-info"> USD/CAD: ${data["01. symbol"]} ${data["05. price"]} ${data["09. change"]} ${data["10. change percent"]}</li>`;
        $("#item6").html(htmlToAppend6);
    }).fail(function (error) {
        console.log(error);
    });
    stock.getStock(stock7).then(function (result) {
        x = Object.values(result)
        const data = x[0]
        const htmlToAppend7 = `
            <li class = "webticker-info"> FTSE 100: ${data["01. symbol"]} ${data["05. price"]} ${data["09. change"]} ${data["10. change percent"]}</li>`;
        $("#item7").html(htmlToAppend7);
    }).fail(function (error) {
        console.log(error);
    });
}

stock.displayStock = function (stock1) {
    stock.getStock1(stock1).then(function (result) {
        w = Object.values(result)
        const data = w[0];
        x = data["01. symbol"];
        if ($('input').val().toUpperCase() == x) {
            $('.stockInfo').append(`<li> Symbol: ${data["01. symbol"]} </li> 
            <li class = "over under"> Price: ${data["05. price"]} </li>
            <li class = "colorIndicator"> Change: ${data["09. change"]}  </li>
            <li class = "colorIndicator"> Change Percent: ${data["10. change percent"]} </li>
            <li class = "highest"> High: ${data["03. high"]} </li>
            <li class = "lowest"> Low: ${data["04. low"]} </li>
            <li> Open: ${data["02. open"]} </li>
            <li> Previous Close: ${data["08. previous close"]}  </li>
            <li> Volume: ${data["06. volume"]} </li>
            <li> Latest Trading Day: ${data["07. latest trading day"]}  </li>`);
        }
        if (data["09. change"] > 0) {
            $('.colorIndicator').addClass('green')
        } else {
            $('.colorIndicator').addClass('red')
        }
    }).fail(function (error) {
        console.log(error);
    })
};
stock.displayStockStats = function (stock1) {
    stock.getStockStats(stock1).then(function (result) {
        a = Math.round(result.dividendYield * 1000000) / 10000
        $(".stockAdvanced").html(`<li> Company Name: ${result.companyName} </li> 
        <li> Dividend Yield: ${a} </li>
        <li> Ex Dividend Date: ${result.exDividendDate} </li>
        <li class = "peRatio"> PE Ratio: ${result.peRatio}</li>
        <li> Week 52 High: ${result.week52high} </li>
        <li> Week 52 Low: ${result.week52low} </li>
        <li> YTD Change Percent: ${result.ytdChangePercent} </li>
        <li> 1 Year Change Percent: ${result.year1ChangePercent} </li>
        <li> 5 Year Change Percent: ${result.year5ChangePercent} </li>
        <li> Next Earnings Date: ${result.nextEarningsDate} </li>`);
        if (result.peRatio > 30 || result.peRatio < 0 || result.peRatio == null) {
            $('.peRatio').addClass('red')
        }
    }).fail(function (error) {
        console.log(error);
    })
};

stock.displayStockMA = function (stock1) {
    stock.getStockStats(stock1).then(function (result) {
        $(".stockTechnical").append(`<li class = "MA"> 50 MA: ${result.day50MovingAvg} </li> <li class = "MA"> 200 MA: ${result.day200MovingAvg} </li>`);
        if (result.day50MovingAvg < result.day200MovingAvg) {
            $('.MA').addClass('red')
        }

    }).fail(function (error) {
        console.log(error);
    })
};

stock.displayStockBB = function (stock1) {
    stock.getStockTechnical(stock1, "BBANDS", "weekly").then(function (result) {
        data = Object.values(result)
        s = data[1]
        t = Object.values(s)
        $(".stockTechnical").append(`<li> Lower Band (Weekly): ${t[0]["Real Lower Band"]} </li> <li> Middle Band (Weekly): ${t[0]["Real Middle Band"]} </li> <li> Upper Band (Weekly): ${t[0]["Real Upper Band"]} </li>`);
    }).fail(function (error) {
        console.log(error);
    })
};

stock.displayStockRSI = function (stock1) {
    stock.getStockTechnical(stock1, "RSI", "daily").then(function (result) {
        data = Object.values(result)
        s = data[1]
        t = Object.values(s)
        $(".stockTechnical").append(`<li class = "rsi"> RSI (14): ${Object.values(t[0])} </li>`);
        if (Object.values(t[0]) > 70) {
            $('.rsi').addClass('red')
        } else if ((Object.values(t[0]) < 30)) {
            $('.rsi').addClass('green')
        }
    }).fail(function (error) {
        console.log(error);
    })
};

stock.displayNews = function (stock1) {
    stock.getStock2(stock1).then(function (result) {
        data = Object.values(result)
        for (let i = 0; i < 5; i++) {
            s = data[i]
            $('.stockNews').append(`<li> ${new Date(s.datetime)} </li> <li> ${s.headline} </li> <li> ${s.source} </li> <li> <a href=${s.url}> ${s.url} </a> </li> <br>`);
        }
    }).fail(function (error) {
        console.log(error);
    })
};


stock.compareStockHigh = function (stock1) {
    Promise.all([stock.getStock1(stock1), stock.getStockStats(stock1)]).then(function (result) {
        a = result[0]["Global Quote"]["03. high"]
        b = result[1].week52high
        if (a > b) {
            $('.highest').addClass('blue');
        }
    })
}

stock.compareStockLow = function (stock1) {
    Promise.all([stock.getStock1(stock1), stock.getStockStats(stock1)]).then(function (result) {
        a = result[0]["Global Quote"]["04. low"]
        b = result[1].week52low
        if (a < b) {
            $('.lowest').addClass('blue');
        }
    })
}

stock.compareStockUpperBand = function (stock1) {
    Promise.all([stock.getStock1(stock1), stock.getStockTechnical(stock1, "BBANDS", "weekly")]).then(function (result) {
        a = result[0]["Global Quote"]["05. price"]
        data = Object.values(result[1])
        s = data[1]
        t = Object.values(s)
        b = t[0]["Real Upper Band"]
        if (a > b) {
            $('.over').addClass('purple');
        }
    })
}

stock.compareStockLowerBand = function (stock1) {
    Promise.all([stock.getStock1(stock1), stock.getStockTechnical(stock1, "BBANDS", "weekly")]).then(function (result) {
        a = result[0]["Global Quote"]["05. price"]
        data = Object.values(result[1])
        s = data[1]
        t = Object.values(s)
        b = t[0]["Real Lower Band"]
        if (a < b) {
            $('.under').addClass('purple');
        }
    })
}

stock.init = function () {
    $('form').on('submit', function (event) {
        event.preventDefault();
        const searchTerm = $('input').val().toUpperCase();
        if (searchTerm !== '') {
            $('.stockInfo').empty();
            $('.stockAdvanced').empty();
            $('.stockTechnical').empty();
            $('.stockNews').empty();
            $('body').removeClass();
            stock.displayStock(searchTerm);
            stock.displayNews(searchTerm);
            stock.displayStockRSI(searchTerm);
            stock.displayStockStats(searchTerm);
            stock.displayStockMA(searchTerm);
            stock.displayStockBB(searchTerm);
            stock.compareStockHigh(searchTerm)
            stock.compareStockLow(searchTerm)
            stock.compareStockUpperBand(searchTerm)
            stock.compareStockLowerBand(searchTerm)
            time = new Date().toLocaleString();
            stock.compareStockUpperBand
            $('.nowTime').html(`${time}`)
        }
    })
}

stock.autocomplete = function () {
    const endpoint = 'https://financialmodelingprep.com/api/v3/company/stock/list';

    fetch(endpoint)
        .then(blob => blob.json())
        .then(data => stocksAutocomplete.push(data.symbolsList))

}

stock.findMatches = function (wordToMatch, stocks) {
    return stocks[0].filter(stockData => {
        // here we need to figure out if the stock matches the search

        const regex = new RegExp(wordToMatch, 'gi');

        return stockData.symbol.match(regex) || stockData.name.match(regex)
    })
}

function displayMatches() {
    const matchArray = stock.findMatches(this.value, stocksAutocomplete);
    const html = matchArray.map(stockData => {
        const regex = new RegExp(this.value, "gi");
        const stockSymbol =
            stockData.symbol.replace(regex, `<span class = "hl"> ${this.value}</span>`)
        const stockName =
            stockData.name.replace(regex, `<span class = "hl"> ${this.value}</span>`)
        return `<li> ${stockSymbol}, ${stockName} </li>`
    }).join("")
    suggestions.innerHTML = html;
}

$(function () {
    stock.init();
    stock.getStockTickerScroll("DJIA", "SPX", "^RUT", "CL=F", "GC=F", "CAD=X", "^FTSE");

    stock.autocomplete();

    searchInput.addEventListener('change', displayMatches);
    searchInput.addEventListener('keyup', displayMatches)
})
