'use client';

import { useAppStore } from '@/store/store';
import axios from 'axios';
import { useEffect, useState } from 'react';

type Coin = {
  symbol: string;
  baseAsset: string;
  quoteAsset: string;
};
type CoinPair = {
  symbol: string;
  pair: string;
};

export const useGetPairs = () => {
  const { setCurrentPair, tradingPair } = useAppStore((state) => state);
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
  const [tradingPairData, setTradingPairData] = useState<CoinPair[]>([]);
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTradingPairs = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          'https://api.binance.com/api/v3/exchangeInfo'
        );
        const data = response.data;

        // Filter and map trading pairs based on baseCurrency
        const filteredPairs = data.symbols
          .filter(
            (symbol: Coin) =>
              symbol.baseAsset === baseCurrency ||
              symbol.quoteAsset === baseCurrency
          )
          .map((symbol: Coin) => ({
            symbol: symbol.symbol,
            pair: `${symbol.baseAsset}/${symbol.quoteAsset}`,
          }));

        // Set trading pairs (limit to first 10 for display)
        const pairsToShow = filteredPairs.slice(0, 10);
        setTradingPairData(pairsToShow);

        // Set initial selected value
        if (pairsToShow.length > 0) {
          setValue(pairsToShow[0].pair);
          setCurrentPair({
            symbol: pairsToShow[0].symbol,
            pair: pairsToShow[0].pair,
          });
        }
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTradingPairs();
  }, [baseCurrency, setCurrentPair]);
  return {
    baseCoins,
    setBaseCurrency,
    baseCurrency,
    setBaseCoins,
    setValue,
    value,
    loading,
    tradingPairData,
    tradingPair,
  };
};
