'use client';

import React, { useEffect, useState } from 'react';
import { PairSelect } from '../molecules/PairSelect';
import { PairDailyTicker } from '../molecules/PairDailyTicker';
import { BaseCurrencySelect } from '../molecules/BaseCurrencySelect';
import axios from 'axios';
import { useAppStore } from '@/store/store';

type Coin = {
  symbol: string;
  baseAsset: string;
  quoteAsset: string;
};
type CoinPair = {
  symbol: string;
  pair: string;
};
export const PairFullDetails = () => {
  const handleCurrentPair = useAppStore((state) => state.setCurrentPair);
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
  const [tradingPair, setTradingPair] = useState<CoinPair[]>([]);
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
          const pair = data.symbols
            .filter(
              (symbol: Coin) =>
                symbol.baseAsset === baseCurrency ||
                symbol.quoteAsset === baseCurrency
            )
            .map((symbol: Coin) => ({
              symbol: symbol.symbol,
              pair: `${symbol.baseAsset}/${symbol.quoteAsset}`,
            }));
          setTradingPair(pair.splice(0, 10));
          setValue(pair[0].pair);
          handleCurrentPair({ symbol: pair[0].symbol, pair: pair[0].pair });
        })
        .catch((error: any) => {
          setError(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchTradingPairs();
  }, [baseCurrency, handleCurrentPair]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `https://api.binance.com/api/v3/ticker/24hr?symbol=${value
          .split('/')
          .join('')}`
      );
      const data = await res.data;
      console.log(data, 'op');
      setDailyTicker(data);
    };
    if (value) {
      fetchData();
    }
    handleCurrentPair({ symbol: value.split('/').join(''), pair: value });
  }, [value, handleCurrentPair]);

  return (
    <div className='flex flex-col gap-2'>
      <BaseCurrencySelect
        baseCoins={baseCoins}
        setBaseCurrency={setBaseCurrency}
        baseCurrency={baseCurrency}
        setBaseCoins={setBaseCoins}
      />
      <div className='flex gap-6 items-center max-md:grid grid-cols-[1fr_max-content] w-full'>
        <PairSelect
          baseCurrency={baseCurrency}
          setValue={setValue}
          value={value}
          loading={loading}
          tradingPair={tradingPair}
        />
        {value && (
          <PairDailyTicker pair={value.split('/').join('').toLowerCase()} />
        )}
      </div>
    </div>
  );
};
