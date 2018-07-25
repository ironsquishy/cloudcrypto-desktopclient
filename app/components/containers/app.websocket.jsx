
class GdaxWebsock extends Gdax.WebsocketClient {

    constructor(){ 
        let options = {};
        options.products = ['BTC-USD'];
        options.url  = 'wss://ws-feed.pro.coinbase.com';
        options.channels = {channels : ['ticker']};
        options.key = {};
        super (options.products, options.url, null, options.channels);   
    }
}

export default GdaxWebsock;