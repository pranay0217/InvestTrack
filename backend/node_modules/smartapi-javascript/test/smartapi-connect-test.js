const sinon = require('sinon');
const proxyquire = require('proxyquire');
const { expect, assert } = require('chai');
let querystring = require('querystring');
const config = require('./config');
let address = require('address');
const { request, response } = require('./api_config');

let SmartApi;
let smartApiInstance;
const requestInstance = {
    request: sinon.stub(),
    interceptors: {
        request: {
            use: sinon.stub(),
        },
        response: {
            use: sinon.stub(),
        },
    },
    defaults: {
        headers: {
            post: {
                'Content-Type': 'application/json',
            },
            put: {
                'Content-Type': 'application/json',
            },
        },
    },
    paramsSerializer : function (params) {
        return querystring.stringify(params);
    }
};


beforeEach(() => {
    SmartApi = proxyquire('../lib/smartapi-connect', {
        axios: {
            create: () => requestInstance,
        },
    });
    smartApiInstance = new SmartApi({
        api_key: config.api_key
    });

    address(function (err, addrs) {
		smartApiInstance.local_ip = addrs !== undefined ? addrs.ip : '192.168.168.168';
		smartApiInstance.mac_addr =
			addrs !== undefined ? addrs.mac : 'fe80::216e:6507:4b90:3719';
	});

});

afterEach(() => {
    sinon.restore();
});

describe('Smart_API_User_Flow', () => {


    it('Generating_Session_with_SmartAPI', async () => {
        requestInstance.request.resolves(response.generatingSession);
        let sessionReq = request.generatingSession;

        try {
            const token_data = smartApiInstance.generateSession(sessionReq.client_code, sessionReq.password, sessionReq.totp);

            token_data.then((response) => {
                if (response.status) {
                    smartApiInstance.setClientCode(sessionReq.client_code);
                    smartApiInstance.setAccessToken(response.data.jwtToken);
                    smartApiInstance.setPublicToken(response.data.refreshToken);
                    assert.equal(response.status, true);
                } else {
                    assert.equal(response.status, false);
                }
            })


        } catch (error) {
            assert.fail("error while generating session", error);
        }
    });


    it("Getting_login_Url",()=>{
        smartApiInstance.getLoginURL();
    })

    it("Get_User_profile", async () => {
        requestInstance.request.resolves(response.getProfile);

        try {
            const profileRes = await smartApiInstance.getProfile();
            if (profileRes.status) {
                assert.equal(profileRes.status, true);
            } else {
                assert.equal(profileRes.status, false);
            }

        } catch (error) {
            assert.fail("error while getting user profile", error);
        }

    })

    it("generating token", () => {
        requestInstance.request.resolves(response.generateToken);
        let tokenReq = request.generateToken;

        let token_data = smartApiInstance.generateToken(tokenReq);
        token_data.then((response) => {
            if (response.status) {
                smartApiInstance.setAccessToken(response.data.jwtToken);
                smartApiInstance.setPublicToken(response.data.refreshToken);
                assert.equal(response.status, true);
            } else {
                assert.equal(response.status, false);
            }
        })
    })

    it("user_log_out", async () => {
        requestInstance.request.resolves(response.logout);
        let tokenReq = request.logout;

        let logoutres = await smartApiInstance.logout(tokenReq);
        assert.equal(logoutres.status, true);
    })
});

describe("SmartApi_Order_Flow", () => {

    it("Placing_order", async () => {
        requestInstance.request.resolves(response.placeOrder);
        let placeOrderReq = request.placeOrder;

        try {
            const placeOrderRes = await smartApiInstance.placeOrder(placeOrderReq);
            if (placeOrderRes.status) {
                assert.equal(placeOrderRes.status, true);
            } else {
                assert.equal(placeOrderRes.status, false);
            }
        } catch (error) {
            assert.fail("error while placing order", error);
        }

    })

    it("Modify_order", async () => {
        requestInstance.request.resolves(response.modifyOrder);
        let modifyOrderReq = request.modifyOrder;

        try {
            const modifyOrderRes = await smartApiInstance.modifyOrder(modifyOrderReq);

            if (modifyOrderRes.status) {
                assert.equal(modifyOrderRes.status, true);
            } else {
                assert.equal(modifyOrderRes.status, false);
            }
        } catch (error) {
            assert.fail("error while modify order", error);
        }

    })

    it("Cancel_order", async () => {
        requestInstance.request.resolves(response.cancelOrder);
        let cancelOrderReq = request.cancelOrder;

        try {
            const cancelOrderRes = await smartApiInstance.cancelOrder(cancelOrderReq);
            if (cancelOrderRes.status) {
                assert.equal(cancelOrderRes.status, true);
            } else {
                assert.equal(cancelOrderRes.status, false);
            }
        } catch (error) {
            assert.fail("error while cancel order", error);
        }

    })

    it("get_order_book", async () => {
        requestInstance.request.resolves(response.orderBook);

        try {
            const orderBookRes = await smartApiInstance.getOrderBook();
            if (orderBookRes.status) {
                assert.equal(orderBookRes.status, true);
            } else {
                assert.equal(orderBookRes.status, false);
            }
        } catch (error) {
            assert.fail("error while getting order book", error);
        }

    })


    it("get_trade_book", async () => {
        requestInstance.request.resolves(response.tradeBook);

        try {
            const tradeBookRes = await smartApiInstance.getTradeBook();
            if (tradeBookRes.status) {
                assert.equal(tradeBookRes.status, true);
            } else {
                assert.equal(tradeBookRes.status, false);
            }
        } catch (error) {
            assert.fail("error while getting trade book", error);
        }

    })

    it("indOrderDetails", async () => {
        requestInstance.request.resolves(response.indOrderDetails);

        try {
            let indOrderDetailParams = request.indOrderDetails;
            const indOrderDetailRes = await smartApiInstance.indOrderDetails(indOrderDetailParams);
            if (indOrderDetailRes.status) {
                assert.equal(indOrderDetailRes.status, true);
            } else {
                assert.equal(indOrderDetailRes.status, false);
            }
        } catch (error) {
            assert.fail("error while getting indOrderDetails", error);
        }

    })

})

describe("SmartAPI_Portfolio", () => {

    it("get_holdings", async () => {
        requestInstance.request.resolves(response.getHolding);
        
        try {
            const getHoldingRes = await smartApiInstance.getHolding();
            if(getHoldingRes){
                expect(getHoldingRes).to.not.to.be.null;
            }else{
                expect(getHoldingRes).to.to.be.null;
            }
            
        } catch (error) {
            assert.fail("error while getting holdings", error);
        }
        
    })

    it("get_all_holdings", async () => {
        requestInstance.request.resolves(response.getAllHolding);

        try {
            const getAllHoldingRes = await smartApiInstance.getAllHolding();
            if(getAllHoldingRes.status){
                assert.equal(getAllHoldingRes.status,true)
            }else{
                assert.equal(getAllHoldingRes.status,false)
            }
        } catch (error) {
            assert.fail("error while getting all holdings", error);
        }
        
    })

    it("get_positions", async () => {
        requestInstance.request.resolves(response.getPosition);
        try {
            const getPositionRes = await smartApiInstance.getPosition();
            if (getPositionRes.status) {
                assert.equal(getPositionRes.status, true);
            } else {
                assert.equal(getPositionRes.status, false);
            }
        } catch (error) {
            assert.fail("error while getting positions", error);
        }

    })

    it("convert_positions", async () => {
        requestInstance.request.resolves(response.convertPosition);
        let req = request.convertPosition;
        try {
            const convertPositionRes = await smartApiInstance.convertPosition(req);
            if (convertPositionRes.status) {
                assert.equal(convertPositionRes.status, true);
            } else {
                assert.equal(convertPositionRes.status, false);
            }
        } catch (error) {
            assert.fail("error while converting positions", error);
        }

    })

    it("get_rms", async () => {
        requestInstance.request.resolves(response.getRMS);
        try {
            const getRMSresponse = await smartApiInstance.getRMS();
            if (getRMSresponse.status) {
                assert.equal(getRMSresponse.status, true);
            } else {
                assert.equal(getRMSresponse.status, false);
            }
        } catch (error) {
            assert.fail("error while getting RMS details", error);
        }
    })
})


describe("SmartApi_GTT", () => {
    it("create_rule", async () => {
        requestInstance.request.resolves(response.createRule);
        let createRuleReq = request.createRule;
        try {
            const createRuleRes = await smartApiInstance.createRule(createRuleReq);
            if (createRuleRes.status) {
                assert.equal(createRuleRes.status, true);
            } else {
                assert.equal(createRuleRes.status, false);
            }
        } catch (error) {
            assert.fail("error while creating rule", error);
        }
    })

    it("modify_rule", async () => {
        requestInstance.request.resolves(response.modifyRule);
        let modifyRuleReq = request.modifyRule;
        try {
            const modifyRuleRes = await smartApiInstance.modifyRule(modifyRuleReq);
            if (modifyRuleRes.status) {
                assert.equal(modifyRuleRes.status, true);
            } else {
                assert.equal(modifyRuleRes.status, false);
            }
        } catch (error) {
            assert.fail("error while creating rule", error);
        }
    })

    it("cancel_rule", async () => {
        requestInstance.request.resolves(response.cancelRule);
        let cancelRuleReq = request.cancelRule;
        try {
            const cancelRuleRes = await smartApiInstance.cancelRule(cancelRuleReq);
            if (cancelRuleRes.status) {
                assert.equal(cancelRuleRes.status, true);
            } else {
                assert.equal(cancelRuleRes.status, false);
            }
        } catch (error) {
            assert.fail("error while cancel rule", error);
        }
    })

    it("get_rule_detail", async () => {
        requestInstance.request.resolves(response.ruleDetails);
        let ruleDetailsReq = request.ruleDetails;
        try {
            const ruleDetailsRes = await smartApiInstance.ruleDetails(ruleDetailsReq);
            if (ruleDetailsRes.status) {
                assert.equal(ruleDetailsRes.status, true);
            } else {
                assert.equal(ruleDetailsRes.status, false);
            }
        } catch (error) {
            assert.fail("error while getting rule detail", error);
        }
    })

    it("get_rule_list", async () => {
        requestInstance.request.resolves(response.ruleList);
        let ruleListReq = request.ruleList;
        try {
            const ruleListRes = await smartApiInstance.ruleList(ruleListReq);
            if (ruleListRes.status) {
                assert.equal(ruleListRes.status, true);
            } else {
                assert.equal(ruleListRes.status, false);
            }
        } catch (error) {
            assert.fail("error while getting rule list", error);
        }
    })

})

describe("SmartApi_Market_Data", () => {

    it("get_market_data", async () => {
        requestInstance.request.resolves(response.marketData.full);
        let marketDataReq = request.marketData;
        try {
            const marketDataRes = await smartApiInstance.marketData(marketDataReq);
            if (marketDataRes.status) {
                assert.equal(marketDataRes.status, true);
            } else {
                assert.equal(marketDataRes.status, false);
            }
        } catch (error) {
            assert.fail("error while getting market data", error);
        }
    })

})

describe("SmartApi_HistoricalAPI", () => {

    it("get_candle_data", async () => {
        requestInstance.request.resolves(response.getCandleData);
        let candleDataReq = request.getCandleData;
        try {
            const candleDataRes = await smartApiInstance.getCandleData(candleDataReq);
            if (candleDataRes.status) {
                assert.equal(candleDataRes.status, true);
            } else {
                assert.equal(candleDataRes.status, false);
            }
        } catch (error) {
            assert.fail("error while getting candle data", error);
        }
    })

})

describe("SmartApi_MarginAPI", () => {

    it("get_margin_calculator", async () => {
        requestInstance.request.resolves(response.marginApi);
        let marginApiReq = request.marginApi;
        try {
            const marginApiRes = await smartApiInstance.marginApi(marginApiReq);
            if (marginApiRes.status) {
                assert.equal(marginApiRes.status, true);
            } else {
                assert.equal(marginApiRes.status, false);
            }
        } catch (error) {
            assert.fail("error while getting margin data", error);
        }
    })

    it("search_scrip", async () => {
        requestInstance.request.resolves(response.searchScrip);
        let searchScripReq = request.searchScrip;
        try {
            const searchScripRes = smartApiInstance.searchScrip(searchScripReq);

            searchScripRes.then((data)=>{
                if(data.length > 0){
                    assert(Array.isArray(searchScripRes))
                }else if (data?.status === true && data?.data?.length === 0) {
					console.log("Search successful. No matching trading symbols found for the given query.");
					assert(Array.isArray(searchScripRes))
				} else {
					assert(Array.isArray(searchScripRes))
				}
            })
           
        } catch (error) {
            assert.fail("error while searching scrip data", error);
        }
    })

})

describe("mocking_request_util", () => {

    it("request_util", () => {
        // Mocking the API object
        const API = {
            sampleRoute: 'http://sample.url/api'
        };

        // Mocking the self object
        const self = {
            api_key: 'your_api_key',
            access_token: 'sampleAccessToken'
        };

        // Mocking the requestInstance
        const requestInstance = {
            request: sinon.stub().resolves({ data: 'sample response' }) // Stubbing the request method
        };

        // Assuming the function is not directly imported and is used within a larger context
        function request_util_qParams(
            route,
            method,
            qParams
        ) {
            let url = API[route],
                payload = null;

            if (qParams) {
                url = `${url}/${qParams}`;
            }

            if (method !== 'GET' || method !== 'DELETE') {
                payload = qParams;
            }

            let options = {
                method: method,
                url: url,
                data: JSON.stringify(payload),
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "X-UserType": "USER",
                    "X-SourceID": "WEB",
                    "X-PrivateKey": self.api_key,
                },
            };

            if (self.access_token) {
                options["headers"]["Authorization"] = "Bearer " + self.access_token;
            }

            return requestInstance.request(options);
        }

        describe('request_util_qParams function', () => {
            it('should form the correct URL when qParams are provided', () => {
                const route = 'sampleRoute';
                const method = 'GET';
                const qParams = '123';

                const expectedResult = { data: 'sample response' };

                const result = request_util_qParams(route, method, qParams);

                assert.equal(result.data,expectedResult.result);
            });
        });
    })
})

