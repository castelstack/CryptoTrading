'use client';

import React, { useEffect, useState } from 'react';
import { PairSelect } from '../molecules/PairSelect';
import { PairsDailyTicker } from '../molecules/PairsDailyTicker';
import { BaseCurrencySelect } from '../molecules/BaseCurrencySelect';
import axios from 'axios';

type Coin = {
  symbol: string;
  baseAsset: string;
  quoteAsset: string;
};
type CoinPairs = {
  symbol: string;
  pairs: string;
};
export const PairsFullDetails = () => {
  const [baseCurrency, setBaseCurrency] = useState('USDT');
  const [baseCoins, setBaseCoins] = useState([
    'USDT',
    'BTC',
    'ETH',
    'BNB',
    'ADA',
    'XRP',
    'DOGE',
    'SOL',
    'DOT',
    'LTC',
  ]);
  const [tradingPairs, setTradingPairs] = useState<CoinPairs[]>([]);
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dailyTicker, setDailyTicker] = useState(null);

  useEffect(() => {
    const fetchTradingPairs = async () => {
      setLoading(true);
      await axios
        .get('https://api.binance.com/api/v3/exchangeInfo')
        .then((response) => {
          const data = response.data;
          console.log(data, 'tradingPairs');
          const pairs = data.symbols
            .filter(
              (symbol: Coin) =>
                symbol.baseAsset === baseCurrency ||
                symbol.quoteAsset === baseCurrency
            )
            .map((symbol: Coin) => ({
              symbol: symbol.symbol,
              pairs: `${symbol.baseAsset}/${symbol.quoteAsset}`,
            }));
          setTradingPairs(pairs.splice(0, 10));
          setValue(pairs[0].pairs);
        })
        .catch((error: any) => {
          setError(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchTradingPairs();
  }, [baseCurrency]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `https://api.binance.com/api/v3/ticker/24hr?symbol=${value.split('/').join('')}`
      );
      const data = await res.data;
      console.log(data, 'op');
      setDailyTicker(data);
    };
    if (value) {
      fetchData();
    }
  }, [value]);

  return (
    <div className='flex flex-col gap-2'>
      <BaseCurrencySelect
        baseCoins={baseCoins}
        setBaseCurrency={setBaseCurrency}
        baseCurrency={baseCurrency}
        setBaseCoins={setBaseCoins}
      />
      <div className='flex gap-6 '>
        <PairSelect
          baseCurrency={baseCurrency}
          setValue={setValue}
          value={value}
          loading={loading}
          tradingPairs={tradingPairs}
        />
        {dailyTicker && <PairsDailyTicker dailyTicker={dailyTicker} />}
      </div>
    </div>
  );
};
