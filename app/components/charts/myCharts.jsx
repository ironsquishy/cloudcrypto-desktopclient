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

import styles from './myCharts.css';

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

        

        this.currenPriceCall = setInterval(() => {
            Http.getCBProLatest()
            .then(res => this.setState({currentPrice: res.asks[0][0]}))
            .catch(err => console.log(err));
        }, 5000);

    }

    componentWillUnmount(){
        clearInterval(this.currenPriceCall);
    }

    render() {
        if (this.state == null || !this.state.chartData || !this.state.currentPrice){
            return <div>Loading..</div>
        }

        return (
            <Col xs={12} md={12}>
                <Paper zDepth={5}>
                    <div className={styles.greyBackground}>
                        <h2>BTC-USD ${this.state.currentPrice}</h2>
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
