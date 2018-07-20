
class Http {
    constructor (){
        this.defaultURL = 'https://api.gdax.com/products/BTC-USD/candles?granularity=3600';
        this.tickerDefaultURL = "https://api-public.sandbox.pro.coinbase.com/products/BTC-USD/ticker";
        this.bookDefaultURL = "https://api-public.sandbox.pro.coinbase.com/products/BTC-USD/book?level=2";
    }
    getGDAXData(url = this.defaultURL){
	    return fetch(url).then(response => response.json());
    }

    getCBProLatest(url = this.bookDefaultURL){
        return fetch(url).then(response => response.json());
    }
}

export default new Http();

