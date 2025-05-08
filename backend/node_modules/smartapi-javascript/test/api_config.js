const request = {
    generatingSession: {
        client_code: "user11",
        password: "1234",
        totp: "122234"
    },
    placeOrder: {
        "variety": "NORMAL",
        "tradingsymbol": "SBIN-EQ",
        "symboltoken": "3045",
        "transactiontype": "BUY",
        "exchange": "NSE",
        "ordertype": "LIMIT",
        "producttype": "INTRADAY",
        "duration": "DAY",
        "price": "19500",
        "squareoff": "0",
        "stoploss": "0",
        "quantity": "1"
    },
    modifyOrder: {
        "variety": "NORMAL",
        "orderid": "201020000000080",
        "ordertype": "LIMIT",
        "producttype": "INTRADAY",
        "duration": "DAY",
        "price": "194.00",
        "quantity": "1",
        "tradingsymbol": "SBIN-EQ",
        "symboltoken": "3045",
        "exchange": "NSE"
    },
    cancelOrder: {
        "variety": "NORMAL",
        "orderid": "201020000000080",
    },
    convertPosition: {
        "exchange": "NSE",
        "oldproducttype": "DELIVERY",
        "newproducttype": "MARGIN",
        "tradingsymbol": "SBIN-EQ",
        "transactiontype": "BUY",
        "quantity": 1,
        "type": "DAY"
    },
    createRule: {
        "tradingsymbol": "SBIN-EQ",
        "symboltoken": "3045",
        "exchange": "NSE",
        "transactiontype": "BUY",
        "producttype": "DELIVERY",
        "price": "195",
        "qty": "1",
        "triggerprice": "196",
        "disclosedqty": "10",
        "timeperiod": "20"
    },
    modifyRule: {
        "id": "1",
        "symboltoken": "3045",
        "exchange": "NSE",
        "price": "195",
        "qty": "1",
        "triggerprice": "196",
        "disclosedqty": "10",
        "timeperiod": "20"
    },
    cancelRule: {
        "id": "1",
        "symboltoken": "3045",
        "exchange": "NSE"
    },
    ruleDetails: {
        "id": "1"
    },
    ruleList: {
        "status": [
            "NEW",
            "CANCELLED",
            "ACTIVE",
            "SENTTOEXCHANGE",
            "FORALL"
        ],
        "page": 1,
        "count": 10
    },
    marketData: {
        "mode": "FULL",
        "exchangeTokens": {
            "NSE": [
                "3045"
            ]
        }
    },
    getCandleData: {
        "exchange": "NSE",
        "symboltoken": "99926000",
        "interval": "ONE_HOUR",
        "fromdate": "2023-09-06 11:15",
        "todate": "2023-09-06 12:00"
    },
    marginApi: {
        "positions": [
            {
                "exchange": "NFO",
                "qty": 50,
                "price": 0,
                "productType": "INTRADAY",
                "token": "67300",
                "tradeType": "BUY"
            },
            {
                "exchange": "NFO",
                "qty": 50,
                "price": 0,
                "productType": "INTRADAY",
                "token": "67308",
                "tradeType": "SELL"
            }
        ]
    },
    searchScrip: {
        "exchange": "BSE",
        "searchscrip": "Titan"
    },
    generateToken: {
        refreshToken: "refresh-token"
    },
    logout: {
        client_code: "user_client_code"
    },
    indOrderDetails : "GuiOrderID"
}

const response = {
    generatingSession: {
        status: false,
        data: {
            jwtToken: "jwt-token",
            refreshToken: "refresh-token",
            feedToken: "feed-token"
        }
    },
    getProfile: {
        status: true,
        data: {
            name: "user",
            mob_no: "9952207684"
        }
    },
    placeOrder: {
        status: true,
        data: {
            orderId: "SA12900"
        }
    },
    modifyOrder: {
        "status": true,
        "message": "SUCCESS",
        "errorcode": "",
        "data": {
            "orderid": "201020000000080"
        }
    },
    cancelOrder: {
        "status": true,
        "message": "SUCCESS",
        "errorcode": "",
        "data": {
            "orderid": "201020000000080"
        }
    },
    orderBook: {
        "status": true,
        "message": "SUCCESS",
        "errorcode": "",
        "data": [{
            "variety": "NORMAL",
            "ordertype": "LIMIT",
            "producttype": "INTRADAY",
            "duration": "DAY",
            "price": "194.00",
            "triggerprice": "0",
            "quantity": "1",
            "disclosedquantity": "0",
            "squareoff": "0",
            "stoploss": "0",
            "trailingstoploss": "0",
            "tradingsymbol": "SBIN-EQ",
            "transactiontype": "BUY",
            "exchange": "NSE",
            "symboltoken": null,
            "instrumenttype": "",
            "strikeprice": "-1",
            "optiontype": "",
            "expirydate": "",
            "lotsize": "1",
            "cancelsize": "1",
            "averageprice": "0",
            "filledshares": "0",
            "unfilledshares": "1",
            "orderid": 201020000000080,
            "text": "",
            "status": "cancelled",
            "orderstatus": "cancelled",
            "updatetime": "20-Oct-2020 13:10:59",
            "exchtime": "20-Oct-2020 13:10:59",
            "exchorderupdatetime": "20-Oct-2020 13:10:59",
            "fillid": "",
            "filltime": "",
            "parentorderid": ""
        }]
    },
    tradeBook: {
        "status": true,
        "message": "SUCCESS",
        "errorcode": "",
        "data": [{
            "exchange": "NSE",
            "producttype": "DELIVERY",
            "tradingsymbol": "ITC-EQ",
            "instrumenttype": "",
            "symbolgroup": "EQ",
            "strikeprice": "-1",
            "optiontype": "",
            "expirydate": "",
            "marketlot": "1",
            "precision": "2",
            "multiplier": "-1",
            "tradevalue": "175.00",
            "transactiontype": "BUY",
            "fillprice": "175.00",
            "fillsize": "1",
            "orderid": "201020000000095",
            "fillid": "50005750",
            "filltime": "13:27:53",
        }]
    },
    getHolding: {
        "tradingsymbol": "TATASTEEL-EQ",
        "exchange": "NSE",
        "isin": "INE081A01020",
        "t1quantity": 0,
        "realisedquantity": 2,
        "quantity": 2,
        "authorisedquantity": 0,
        "product": "DELIVERY",
        "collateralquantity": null,
        "collateraltype": null,
        "haircut": 0,
        "averageprice": 111.87,
        "ltp": 130.15,
        "symboltoken": "3499",
        "close": 129.6,
        "profitandloss": 37,
        "pnlpercentage": 16.34
    },
    getPosition: {
        "status": true,
        "message": "SUCCESS",
        "errorcode": "",
        "data": [
            {
                "exchange": "NSE",
                "symboltoken": "2885",
                "producttype": "DELIVERY",
                "tradingsymbol": "RELIANCE-EQ",
                "symbolname": "RELIANCE",
                "instrumenttype": "",
                "priceden": "1",
                "pricenum": "1",
                "genden": "1",
                "gennum": "1",
                "precision": "2",
                "multiplier": "-1",
                "boardlotsize": "1",
                "buyqty": "1",
                "sellqty": "0",
                "buyamount": "2235.80",
                "sellamount": "0",
                "symbolgroup": "EQ",
                "strikeprice": "-1",
                "optiontype": "",
                "expirydate": "",
                "lotsize": "1",
                "cfbuyqty": "0",
                "cfsellqty": "0",
                "cfbuyamount": "0",
                "cfsellamount": "0",
                "buyavgprice": "2235.80",
                "sellavgprice": "0",
                "avgnetprice": "2235.80",
                "netvalue": "- 2235.80",
                "netqty": "1",
                "totalbuyvalue": "2235.80",
                "totalsellvalue": "0",
                "cfbuyavgprice": "0",
                "cfsellavgprice": "0",
                "totalbuyavgprice": "2235.80",
                "totalsellavgprice": "0",
                "netprice": "2235.80"
            }
        ]
    },
    convertPosition: {
        "status": true,
        "message": "SUCCESS",
        "errorcode": "",
        "data": null
    },
    getRMS: {
        status: true,
        message: 'SUCCESS',
        errorcode: '',
        data: {
            net: '0.0000',
            availablecash: '0.0000',
            availableintradaypayin: '0.0000',
            availablelimitmargin: '0.0000',
            collateral: '0.0000',
            m2munrealized: '0.0000',
            m2mrealized: '0.0000',
            utiliseddebits: '0.0000',
            utilisedspan: null,
            utilisedoptionpremium: null,
            utilisedholdingsales: null,
            utilisedexposure: null,
            utilisedturnover: null,
            utilisedpayout: '0.0000'
        }
    },
    createRule: {
        "status": true,
        "message": "SUCCESS",
        "errorcode": "",
        "data": {
            "id": "1"
        }
    },
    modifyRule: {
        "status": true,
        "message": "SUCCESS",
        "errorcode": "",
        "data": {
            "id": "1"
        }
    },
    cancelRule: {
        "status": true,
        "message": "SUCCESS",
        "errorcode": "",
        "data": {
            "id": "1"
        }
    },
    ruleDetails: {
        "status": true,
        "message": "SUCCESS",
        "errorcode": "",
        "data": {
            "status": "NEW",
            "createddate": "2020-11-16T14:19:51Z",
            "updateddate": "2020-11-16T14:28:01Z",
            "expirydate": "2021-11-16T14:19:51Z",
            "clientid": "100",
            "tradingsymbol": "SBIN-EQ",
            "symboltoken": "3045",
            "exchange": "NSE",
            "transactiontype": "BUY",
            "producttype": "DELIVERY",
            "price": "195",
            "qty": "1",
            "triggerprice": "196",
            "disclosedqty": "10"
        }
    },
    ruleList: {
        "status": true,
        "message": "SUCCESS",
        "errorcode": "",
        "data": {
            "clientid": "100",
            "createddate": "2020-11-16T14:19:51Z",
            "exchange": "NSE",
            "producttype": "DELIVERY",
            "transactiontype": "BUY",
            "expirydate": "2021-11-16T14:19:51Z",
            "id": "1",
            "qty": "1",
            "price": "195",
            "status": "NEW",
            "symboltoken": "3045",
            "tradingsymbol": "SBIN-EQ",
            "triggerprice": "196",
            "updateddate": "2020-11-16T14:28:01Z"
        }
    },
    marketData: {
        full: {
            "status": true,
            "message": "SUCCESS",
            "errorcode": "",
            "data": {
                "fetched": [
                    {
                        "exchange": "NSE",
                        "tradingSymbol": "SBIN-EQ",
                        "symbolToken": "3045",
                        "ltp": 568.2,
                        "open": 567.4,
                        "high": 569.35,
                        "low": 566.1,
                        "close": 567.4,
                        "lastTradeQty": 1,
                        "exchFeedTime": "21-Jun-2023 10:46:10",
                        "exchTradeTime": "21-Jun-2023 10:46:09",
                        "netChange": 0.8,
                        "percentChange": 0.14,
                        "avgPrice": 567.83,
                        "tradeVolume": 3556150,
                        "opnInterest": 0,
                        "lowerCircuit": 510.7,
                        "upperCircuit": 624.1,
                        "totBuyQuan": 839549,
                        "totSellQuan": 1284767,
                        "52WeekLow": 430.7,
                        "52WeekHigh": 629.55,
                        "depth": {
                            "buy": [
                                {
                                    "price": 568.2,
                                    "quantity": 511,
                                    "orders": 2
                                },
                                {
                                    "price": 568.15,
                                    "quantity": 411,
                                    "orders": 2
                                },
                                {
                                    "price": 568.1,
                                    "quantity": 31,
                                    "orders": 2
                                },
                                {
                                    "price": 568.05,
                                    "quantity": 1020,
                                    "orders": 8
                                },
                                {
                                    "price": 568,
                                    "quantity": 1704,
                                    "orders": 28
                                }
                            ],
                            "sell": [
                                {
                                    "price": 568.25,
                                    "quantity": 3348,
                                    "orders": 5
                                },
                                {
                                    "price": 568.3,
                                    "quantity": 4447,
                                    "orders": 13
                                },
                                {
                                    "price": 568.35,
                                    "quantity": 3768,
                                    "orders": 11
                                },
                                {
                                    "price": 568.4,
                                    "quantity": 8500,
                                    "orders": 40
                                },
                                {
                                    "price": 568.45,
                                    "quantity": 4814,
                                    "orders": 17
                                }
                            ]
                        }
                    }
                ],
                "unfetched": []
            }
        },
        OHLC: {
            "status": true,
            "message": "SUCCESS",
            "errorcode": "",
            "data": {
                "fetched": [
                    {
                        "exchange": "NSE",
                        "tradingSymbol": "SBIN-EQ",
                        "symbolToken": "3045",
                        "ltp": 571.8,
                        "open": 568.75,
                        "high": 568.75,
                        "low": 567.05,
                        "close": 566.5
                    }
                ],
                "unfetched": []
            }
        },
        LTP: {
            "status": true,
            "message": "SUCCESS",
            "errorcode": "",
            "data": {
                "fetched": [
                    {
                        "exchange": "NSE",
                        "tradingSymbol": "SBIN-EQ",
                        "symbolToken": "3045",
                        "ltp": 571.75
                    }
                ],
                "unfetched": []
            }
        }
    },
    getCandleData: {
        "status": true,
        "message": "SUCCESS",
        "errorcode": "",
        "data": [
            [
                "2023-09-06T11:15:00+05:30",
                19571.2,
                19573.35,
                19534.4,
                19552.05,
                0
            ]
        ]
    },
    marginApi: {
        "status": true,
        "message": "SUCCESS",
        "errorcode": "",
        "data": {
            "totalMarginRequired": 29612.35,
            "marginComponents": {
                "netPremium": 5060,
                "spanMargin": 0,
                "marginBenefit": 79876.5,
                "deliveryMargin": 0,
                "nonNFOMargin": 0,
                "totOptionsPremium": 10100
            },
            "marginBreakup": [
                {
                    "exchange": "NFO",
                    "productType": "INTRADAY",
                    "totalMarginRequired": 19512.35
                }
            ],
            "optionsBuy": {
                "totOptionsPremium": 10100,
                "optionDetails": [
                    {
                        "exchange": "NFO",
                        "productType": "INTRADAY",
                        "token": "67300",
                        "lotMultiplier": 50,
                        "optionPremium": 10100
                    }
                ]
            }
        }
    },
    searchScrip: {
        "status": true,
        "message": 'SUCCESS',
        "errorcode": '',
        "data": [
            { exchange: 'BSE', tradingsymbol: 'TITAN', symboltoken: '500114' },
            {
                exchange: 'BSE',
                tradingsymbol: 'TITANBIO',
                symboltoken: '524717'
            },
            {
                exchange: 'BSE',
                tradingsymbol: 'TITANIN',
                symboltoken: '521005'
            },
            {
                exchange: 'BSE',
                tradingsymbol: 'TITANSEC',
                symboltoken: '530045'
            }
        ]
    },
    generateToken: {
        "status": true,
        "message": 'SUCCESS',
        "errorcode": '',
        "data": {
            jwtToken: "example-jwt-token",
            refreshToken: "refresh-jwt-token"
        }
    },
    logout: {
        "status": true,
        "message": 'SUCCESS',
        "errorcode": '',
        "data": null
    },
    getAllHolding: {
        "status": true,
        "message": "SUCCESS",
        "errorcode": "",
        "data": {
            "holdings": [
                {
                    "tradingsymbol": "TATASTEEL-EQ",
                    "exchange": "NSE",
                    "isin": "INE081A01020",
                    "t1quantity": 0,
                    "realisedquantity": 2,
                    "quantity": 2,
                    "authorisedquantity": 0,
                    "product": "DELIVERY",
                    "collateralquantity": null,
                    "collateraltype": null,
                    "haircut": 0,
                    "averageprice": 111.87,
                    "ltp": 130.15,
                    "symboltoken": "3499",
                    "close": 129.6,
                    "profitandloss": 37,
                    "pnlpercentage": 16.34
                },
                {
                    "tradingsymbol": "PARAGMILK-EQ",
                    "exchange": "NSE",
                    "isin": "INE883N01014",
                    "t1quantity": 0,
                    "realisedquantity": 2,
                    "quantity": 2,
                    "authorisedquantity": 0,
                    "product": "DELIVERY",
                    "collateralquantity": null,
                    "collateraltype": null,
                    "haircut": 0,
                    "averageprice": 154.03,
                    "ltp": 201,
                    "symboltoken": "17130",
                    "close": 192.1,
                    "profitandloss": 94,
                    "pnlpercentage": 30.49
                },
                {
                    "tradingsymbol": "SBIN-EQ",
                    "exchange": "NSE",
                    "isin": "INE062A01020",
                    "t1quantity": 0,
                    "realisedquantity": 8,
                    "quantity": 8,
                    "authorisedquantity": 0,
                    "product": "DELIVERY",
                    "collateralquantity": null,
                    "collateraltype": null,
                    "haircut": 0,
                    "averageprice": 573.1,
                    "ltp": 579.05,
                    "symboltoken": "3045",
                    "close": 570.5,
                    "profitandloss": 48,
                    "pnlpercentage": 1.04
                }
            ],
            "totalholding": {
                "totalholdingvalue": 5294,
                "totalinvvalue": 5116,
                "totalprofitandloss": 178.14,
                "totalpnlpercentage": 3.48
            }
        }
    },
    indOrderDetails: {
        "status": true,
        "message": "SUCCESS",
        "errorcode": "",
        "data": {
            "variety": "NORMAL",
            "ordertype": "LIMIT",
            "producttype": "DELIVERY",
            "duration": "DAY",
            "price": 2298.25,
            "triggerprice": 0,
            "quantity": "1",
            "disclosedquantity": "0",
            "squareoff": 0,
            "stoploss": 0,
            "trailingstoploss": 0,
            "tradingsymbol": "RELIANCE-EQ",
            "transactiontype": "BUY",
            "exchange": "NSE",
            "symboltoken": "2885",
            "instrumenttype": "",
            "strikeprice": -1,
            "optiontype": "",
            "expirydate": "",
            "lotsize": "1",
            "cancelsize": "0",
            "averageprice": 0,
            "filledshares": "0",
            "unfilledshares": "1",
            "orderid": "231010000000970",
            "text": "Your order has been rejected due to Insufficient Funds. Available funds - Rs. 937.00 . You require Rs. 2298.25 funds to execute this order.",
            "status": "rejected",
            "orderstatus": "rejected",
            "updatetime": "10-Oct-2023 09:00:16",
            "exchtime": "",
            "exchorderupdatetime": "",
            "fillid": "",
            "filltime": "",
            "parentorderid": "",
            "ordertag": "",
            "uniqueorderid": "05ebf91b-bea4-4a1d-b0f2-4259606570e3"
        }
    }
}

const errorResponse = {
    status: false,
    message: "",
    errorcode: "",
    data: null
}

module.exports = {
    response: response,
    request: request,
    errorResponse: errorResponse
};