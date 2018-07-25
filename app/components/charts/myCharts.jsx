//React Specific
import React from "react";
import Paper from 'material-ui/Paper';
import {Col} from 'react-bootstrap';
import PropTypes from "prop-types";

import CandleSticks from "./candlestick/candlesticks";

import {TypeChooser} from "react-stockcharts/lib/helper";

import {getData, getGDAXData} from "./candlestick/testdata";
import Utils from "../utils/gdaxparsing";
import Http from "../containers/app.service";
import Websock from "../containers/app.websocket";

import styles from './myCharts.css';

/*External components */
import Price from "../price/component.price";

export default class MyCharts extends React.Component {
  
    constructor(props){
        super(props);
        this.state = {};
        this.state.chartData = null;
    }

    componentDidMount () {
       
        Http.getGDAXData()
        .then(res => {
            let temp = Utils.ParseGDaxHistoricalRate(res);
            this.setState({chartData: temp});
            console.log('Finished fetching & parsing and GDAX data...');
        })
        .catch(err => console.log(err));

        let options = {};
        options.products = ['BTC-USD'];
        options.url  = 'wss://ws-feed.pro.coinbase.com';
        options.channels = {channels : ['ticker']};
        options.key = {};

        this.GDAX = new Gdax.WebsocketClient(options.products, options.url, null, options.channels);

        this.GDAX.on('message', data => {
            
            if(data.type == 'ticker'){
                this.setState({
                    price: data.price,
                    side: data.side,
                    product: data.product_id,
                    date: data.time
                }) 
            }
        });
        
        this.GDAX.on('error', err => {
            console.error(err);
        })

        this.GDAX.on('close', () => {
            console.warn('Websocket closed');
        });
        
    }

    componentWillUnmount(){
        clearInterval(this.currenPriceCall);
        
    }

    render() {
        if (this.state == null || !this.state.chartData){
            return <div>Loading..</div>
        }

        return (
            <Col xs={12} md={12}>
                <Paper zDepth={5}>
                    <div className={styles.greyBackground}>
                        <Price {...this.state}/>
                        {/* <TypeChooser>
                            {type => <CandleSticks type={type} data={this.state.chartData} />}
                        </TypeChooser> */}
                        <CandleSticks type={'hybrid'} data={this.state.chartData} />
                    </div>
                </Paper>
            </Col>
        );
    }
}
