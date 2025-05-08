let WebSocket = require("ws");
const Parser = require("binary-parser").Parser;
let { CONSTANTS} = require("../config/constant");

let triggers = {
  connect: [],
  tick: [],
};

let WSOrderUpdates = function (params) {
  try {
    let { clientcode, jwttoken, apikey, feedtype } = params;
    let self = this;
    let ws = null;
    let headers = {
      "x-client-code": clientcode,
      Authorization: `Bearer ${jwttoken}`,
      "x-api-key": apikey,
      "x-feed-token": feedtype,
    };
    const url = CONSTANTS?.wsclientupdatesURL;
    let ping_Interval = CONSTANTS?.Interval;
    let timeStamp;
    let stopInterval;
    let reset;
    let open = 1;

    this.connect = function () {
      try {
        return new Promise((resolve, reject) => {
          if (
            headers?.["x-client-code"] === null ||
            headers?.["x-feed-token"] === null ||
            headers?.["x-api-key"] === null ||
            headers?.Authorization === null
          ) {
            return "client_code or jwt_token or api_key or feed_token is missing";
          }
          ws = new WebSocket(url, { headers });

          ws.onopen = function onOpen(evt) {
            reset = setInterval(function () {
              ws.send("ping");
            }, ping_Interval);
            resolve();
          };

          ws.onmessage = function (evt) {
            let result = evt.data;
            timeStamp = Math.floor(Date.now() / 1000);
            trigger("tick", [result]);
            resolve(result);
          };

          stopInterval = setInterval(function () {
            let currentTimeStamp = Math.floor(Date.now() / 1000);
            let lastMessageTimeStamp = currentTimeStamp - timeStamp;
            // Detecting the stale connection
            if (lastMessageTimeStamp > 20) {
              if (ws?._readyState === open) {
                ws.close();
              }
              clearInterval(reset);
              clearInterval(stopInterval);
              self.connect();
            }
          }, 5000);

          ws.onerror = function (evt) {
              if (evt?.message?.match(/\d{3}/)?.[0] == 404) {
                throw new Error(evt.message);
              }
              try {
                if (ws?._readyState === open) {
                  ws.close();
                }
                clearInterval(reset);
              } catch (error) {
                throw new Error(error);
              }
          };
          ws.onclose = function (evt) { };
        });
      } catch (error) {
        throw new Error(error);
      }
    };

    this.on = function (e, callback) {
      if (triggers.hasOwnProperty(e)) {
        triggers[e].push(callback);
      }
    };

    this.close = function () {
      clearInterval(stopInterval);
      ws.close();
    };

  } catch (error) {
    throw new Error(error);
  }
};

function trigger(e, args) {
  if (!triggers[e]) return;
  for (var n = 0; n < triggers[e].length; n++) {
    triggers[e][n].apply(triggers[e][n], args ? args : []);
  }
}

module.exports = WSOrderUpdates;
