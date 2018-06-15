//React Specific
import React from "react";
import Paper from 'material-ui/Paper';
import {Col} from 'react-bootstrap';
import PropTypes from "prop-types";

import CandleSticks from "./candlestick/candlesticks";

import {TypeChooser} from "react-stockcharts/lib/helper";

import {getData, getGDAXData} from "./candlestick/testdata";
import Utils from "../utils/gdaxparsing";

import styles from './myCharts.css';

export default class MyCharts extends React.Component {
  
    constructor(props){
        super(props);
        this.state = {};
        this.state.chartData = null;
    }
    componentDidMount () {
        // getData()
        // .then(data => {
        //     console.log(data);
        //     this.setState({chartData: data});
        // });

        getGDAXData()
        .then(res => {
            let temp = Utils.ParseGDaxHistoricalRate(res);
            this.setState({chartData: temp});
        })
        .catch(err => console.log(err));
    }

    render() {
        if (this.state == null){
            return <div>Loading..</div>
        }

        if(!this.state.chartData) {
            return <div>Loading...</div>
        }

        return (
            <Col xs={12} md={12}>
                <Paper zDepth={5}>
                    <div className={styles.greyBackground}>
                        <TypeChooser>
                            {type => <CandleSticks type={type} data={this.state.chartData} />}
                        </TypeChooser>
                    </div>
                </Paper>
            </Col>
        );
    }
}
