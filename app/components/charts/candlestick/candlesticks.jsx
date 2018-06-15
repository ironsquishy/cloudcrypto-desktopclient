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

import {Label} from "react-stockcharts/lib/annotation";

//Styles
import styles from './candlesticks.css';

class CandleSticks extends React.Component{

    render(){
        const { type, width, data, ratio } = this.props;

        const margin = { left: 50, right: 30, top: 10, bottom: 25 };

        const xAccessor = d => d.date;
        const xExtents = [ xAccessor(last(data)), xAccessor(data[Math.max(0, data.length - 150)])];
        //timeIntervalBarWidth(utcDay)
        return (
            <ChartCanvas height={500}
				ratio={ratio}
				width={width}
				margin={margin}
				type={type}
				seriesName="BTC-USDT"
				data={data}
				xAccessor={xAccessor}
				xScale={scaleTime()}
				xExtents={xExtents}>
                <Label x={(width - margin.left - margin.right) / 2} y={30}
                fontSize={30} text="BTC-USD" />
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
};

CandleSticks.defaultProps = {
    type: "svg"
};

CandleSticks = fitWidth(CandleSticks);

export default CandleSticks;