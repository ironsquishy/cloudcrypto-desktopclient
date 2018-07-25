//React Specific
import React from "react";
import PropTypes from "prop-types";
//D3 dep.
import { scaleTime } from "d3-scale";
import { utcDay } from "d3-time";
//Component dep.
import { ChartCanvas, Chart } from "react-stockcharts";
import { CandlestickSeries } from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last, timeIntervalBarWidth } from "react-stockcharts/lib/utils";
import {discontinuousTimeScaleProvider} from 'react-stockcharts/lib/scale';

import {Label} from "react-stockcharts/lib/annotation";

//Styles
import styles from './candlesticks.css';

class CandleSticks extends React.Component{

    componentDidMount(){
       this.setState({itemPrice: 'BTC-USD $10,000'});
    }
    render(){
        if (this.state == null || this.state.itemPrice == null){
            return <div> Loading...</div>
        }

        const { type, width, data: initialData, ratio } = this.props;
        const { itemPrice } = this.state;
        const margin = { left: 50, right: 30, top: 10, bottom: 25 };

        const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(d => d.date);
        const {data, xScale, xAccessor, displayxAccessor } = xScaleProvider(initialData);

        const xExtents = [ xAccessor(last(data)), xAccessor(data[Math.max(0, data.length - 150)])];

        //timeIntervalBarWidth(utcDay)
        //const xAccessor = d => d.date;
        return (
            <ChartCanvas height={500}
				ratio={ratio}
				width={width}
				margin={margin}
				type={type}
				seriesName={itemPrice}
				data={data}
				xAccessor={xAccessor}
                xScale={xScale}
                displayxAccessor={displayxAccessor}
				xExtents={xExtents}>
                {/* <Label x={(width - margin.left - margin.right) / 2} y={30}
                fontSize={30} text={itemPrice} /> */}
                <Chart id={1} yExtents={d => [d.high, d.low]}>
                    <XAxis axisAt="bottom" orient="bottom" ticks={8}/>
                    <YAxis axisAt="left" orient="left" ticks={7} />
                    <CandlestickSeries width={3.7}/>
                </Chart>
		    </ChartCanvas> 
        );
    }
}

CandleSticks.propTypes = {
    data: PropTypes.array.isRequired,
	width: PropTypes.number.isRequired,
	ratio: PropTypes.number.isRequired,
    type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
    itemPrice : PropTypes.string
};

CandleSticks.defaultProps = {
    type: "svg",
    itemPrice : "BTC-USD $10,000"
};

CandleSticks = fitWidth(CandleSticks);

export default CandleSticks;