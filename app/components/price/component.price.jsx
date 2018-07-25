import React from 'react';
import styles from './component.price.css';

export default class Price extends React.Component {
    render () {
       const {product, price, side, date } = this.props;
       const sideStyle = (side == 'buy') ? styles.buySideFont : styles.sellSideFont;
       return  (
        <span className={sideStyle} >{product} | {price} | {side} | {new Date(date).toLocaleTimeString()} | </span>
       );
    }
}