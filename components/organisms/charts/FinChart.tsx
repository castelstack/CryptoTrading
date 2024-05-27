'use client';

import { format } from 'd3-format';
import { timeFormat } from 'd3-time-format';
import { useEffect, useState } from 'react';
import {
  BarSeries,
  CandlestickSeries,
  Chart,
  ChartCanvas,
  discontinuousTimeScaleProviderBuilder,
  ema,
  HoverTooltip,
  LineSeries,
  OHLCTooltip,
  withDeviceRatio,
  withSize,
  XAxis,
  YAxis,
} from 'react-financial-charts';

const FinChart = ({
  axisAt = 'right',
  height = 350,
  ratio = 1,
  width = 400,
}) => {
  const [initialData, setInitialData] = useState<any[]>([]);

  const dateFormat = timeFormat('%Y-%m-%d');
  // const margin = { left: 0, right: 48, top: 0, bottom: 24 };
  const numberFormat = format('.2f');
  const xScaleProvider =
    discontinuousTimeScaleProviderBuilder().inputDateAccessor((d) => d.date);

  useEffect(() => {
    const fetchInitialData = async () => {
      const response = await fetch(
        'https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1m&limit=100'
      );
      const initialData = await response.json();
      const formattedData = initialData.map((item: any) => ({
        date: new Date(item[0]),
        open: parseFloat(item[1]),
        high: parseFloat(item[2]),
        low: parseFloat(item[3]),
        close: parseFloat(item[4]),
        volume: parseFloat(item[5]),
      }));
      setInitialData(formattedData);
    };

    fetchInitialData();

    const ws = new WebSocket(
      'wss://stream.binance.com:9443/ws/btcusdt@kline_1m'
    );

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.k) {
        const newCandle = {
          date: new Date(message.k.t),
          open: parseFloat(message.k.o),
          high: parseFloat(message.k.h),
          low: parseFloat(message.k.l),
          close: parseFloat(message.k.c),
          volume: parseFloat(message.k.v),
        };

        setInitialData((prevData) => {
          const lastCandle = prevData[prevData.length - 1];
          if (lastCandle.date.getTime() === newCandle.date.getTime()) {
            return [...prevData.slice(0, -1), newCandle];
          } else {
            return [...prevData, newCandle];
          }
        });
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  const ema12 = ema()
    .id(1)
    .options({ windowSize: 12 })
    .merge((d: any, c: any) => {
      d.ema12 = c;
    })
    .accessor((d: any) => d.ema12);

  const calculatedData = ema12(initialData);

  const { data, xScale, xAccessor, displayXAccessor } =
    xScaleProvider(calculatedData);

  const max = xAccessor(data[data.length - 1]);
  const min = xAccessor(data[Math.max(0, data.length - 100)]);
  const xExtents = [min, max];

  const yExtents = (data: any) => [data.high, data.low];
  const margin = {
    bottom: 24,
    left: axisAt === 'left' ? 48 : 0,
    right: axisAt === 'right' ? 48 : 0,
    top: 0,
  };
  return (
    <ChartCanvas
      height={height}
      ratio={ratio}
      width={width}
      margin={margin}
      data={data}
      displayXAccessor={displayXAccessor}
      seriesName='Data'
      xScale={xScale}
      xAccessor={xAccessor}
      xExtents={xExtents}
      disableInteraction={false}
      disablePan={false}
      disableZoom={false}
    >
      <Chart id={1} yExtents={yExtents}>
        <XAxis />
        <YAxis />
        <CandlestickSeries />
        <LineSeries yAccessor={ema12.accessor()} strokeStyle={ema12.stroke()} />

        <OHLCTooltip
          origin={[8, 16]}
          textFill={(d) => (true ? '#26a69a' : '#ef5350')}
        />
        <HoverTooltip
          yAccessor={ema12.accessor()}
          tooltip={{
            content: ({ currentItem, xAccessor }) => ({
              x: dateFormat(xAccessor(currentItem)),
              y: [
                {
                  label: 'open',
                  value: currentItem.open && numberFormat(currentItem.open),
                },
                {
                  label: 'high',
                  value: currentItem.high && numberFormat(currentItem.high),
                },
                {
                  label: 'low',
                  value: currentItem.low && numberFormat(currentItem.low),
                },
                {
                  label: 'close',
                  value: currentItem.close && numberFormat(currentItem.close),
                },
              ],
            }),
          }}
        />
      </Chart>
      <Chart
        id={2}
        yExtents={yExtents}
        height={100}
        origin={(w, h) => [0, h - 100]}
      >
        <YAxis
          axisAt='right'
          orient='right'
          ticks={3}
          tickFormat={(d: any) => `${d / 1000}K`}
        />
        <BarSeries
          yAccessor={ema12.accessor()}
          // fill={volumeColor}
          // widthRatio={0.5}
        />
      </Chart>
    </ChartCanvas>
  );
};

export default withSize({ style: { minHeight: 600 } })(
  withDeviceRatio()(FinChart as any) as any
);
