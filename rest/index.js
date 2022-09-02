const express = require('express')
var https = require('https');
var http = require('http');
const ccxt = require('ccxt');
const fs = require('fs');

const port = 3001;
const app = express();
const bases = ["EUR", "BTC", "BUSD"]; //Those are the currencies from which will operate
const exchangeId = 'binance'
    , exchangeClass = ccxt[exchangeId]
    , exchange = new exchangeClass({
        'apiKey': 'vEKdamXpNZiNrQ0eKnlWmL1z4Crh7jYKguGNQfhjzUxolfze6rXRV77QzN9lVLW3',
        'secret': 'qkBq5bqXvN7yanuMHSRawDbXhko6ZmVngtB9W729hM2AhiMb0LsDNrIyEVCNOGGo',
    })

let markets = []

getMarkets();
async function getMarkets() {
    markets = await exchange.load_markets()
}
exchange.enableRateLimit = true

http.createServer(app)
    .listen(port, () => {
        console.log('server is runing at port ' + port)
    });

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:19006"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', async (req, res) => {
    let balance = await exchange.fetchBalance();
    let wallet = [];
    let openOrders = [];
    let closedOrders = [];
    let symbols = [];
    let result = [];

    //List all balance content with assets locked due to orders
    Object.keys(balance.info.balances).map(async (elementIndex) => {
        let asset = balance.info.balances[elementIndex]
        if (parseFloat(asset.locked) > 0) {
            wallet[asset.asset] = asset;
        }
    });

    //List all possible symbols
    Object.keys(wallet).map(async (asset) => {
        Object.keys(markets).filter((market, marketId) => {
            if(market.includes(asset + '/'))symbols[market] = markets[market]
        })
    })

    //List all open orders
    await Promise.all(Object.keys(symbols).map(async (symbol) => {
        let openOrder = await exchange.fetchOpenOrders(symbol);
        if(openOrder.length > 0) {
            //console.log(openOrder)
            openOrders.push(openOrder[0]);
            result.push({
                title: openOrder[0].symbol,
                sell: openOrder[0].price
            })
            //result[openOrder[0].symbol] = {}
            //result[openOrder[0].symbol].sell = openOrder[0].price;
        }
    }));
    
    //List all closed orders
    await Promise.all(Object.keys(openOrders).map(async (id) => {
        let closedOrder = await exchange.fetchClosedOrders(openOrders[id].symbol);
        closedOrder = closedOrder.sort( (a,b) => a.timestamp + b.timestamp)
        closedOrder = closedOrder.filter( a => a.side == "buy")
        
        console.log(closedOrder)
        let closeOrderId = 0;
        let higherTimestamp = 0;
        if(closedOrder.length > 0) {
            closedOrders.push(closedOrder[0]);
            let index = result.findIndex((elem) => elem.title == openOrders[id].symbol)
            result[index].buy = closedOrder[closedOrder.length - 1].price;
            /*closedOrder.forEach( (order) => {
                if(openOrders[id].amount == order.amount) {
                    let index = result.findIndex((elem) => elem.title == openOrders[id].symbol)
                    result[index].buy = order.price;
                }
            });*/
        }
    }));
    res.send(JSON.stringify(result));
})

app.get('/prices', async (req, res) => {
    let params = req.query.symbols.split(",")
    console.log('prices called', params)
    let symbols = await exchange.fetchTickers(params)
    console.log(typeof symbols)
    let result = []
    Object.keys(symbols).forEach( symbol => {
        console.log(symbols[symbol])
        result.push({
            "title": symbol, 
            "price": symbols[symbol].info.lastPrice
        })
    })
    res.send(JSON.stringify(result));
});