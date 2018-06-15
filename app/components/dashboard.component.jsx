import React from 'react';

import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';

import {Row, Col, Grid} from 'react-bootstrap';

import MyCharts from './charts/myCharts';
import Tickers from './tickers/tickers';

import styles from './dashboard.css';


export default class Dashboard extends React.Component{
    
    render() {
        const myData = [];
        return (
        <div>
            <AppBar title="Cloud Crypto"/>
            <section>
                <Row className={styles.space}>
                    <MyCharts />
                </Row>
                <Row className={styles.space}>

                </Row>
            </section>
        </div>
        );
    }
}

