import React from 'react';
import Paper from 'material-ui/Paper';
import {Col} from 'react-bootstrap';

import styles from './tickers.css';

export default class Tickers extends React.Component{
    render(){
        return (
            <Col xs={4}>
                <Paper zDepth={5}>
                    <p className={styles.tickersPad}>Hello World</p>
                </Paper>
            </Col>
        );
    }
}