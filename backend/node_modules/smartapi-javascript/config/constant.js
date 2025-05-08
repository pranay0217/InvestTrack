const CONSTANTS = {
	websocketURL: 'wss://smartapisocket.angelone.in/smart-stream',
	wsclientupdatesURL : 'wss://tns.angelone.in/smart-order-update',
	Interval: 10000,
};

const ACTION = {
	Subscribe: 1,
	Unsubscribe: 0,
};

const MODE = {
	LTP: 1,
	Quote: 2,
	SnapQuote: 3,
	Depth: 4,
};

const EXCHANGES = {
	nse_cm: 1,
	nse_fo: 2,
	bse_cm: 3,
	bse_fo: 4,
	mcx_fo: 5,
	ncx_fo: 7,
	cde_fo: 13,
};

module.exports = { CONSTANTS, ACTION, MODE, EXCHANGES };
