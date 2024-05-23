import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type State = {
  tradingPair: {
    symbol: string;
    pair: string;
  };
};

type Action = {
  setCurrentPair: (symbol: State['tradingPair']) => void;
};

export const useAppStore = create<State & Action>()(
  devtools(
    persist(
      (set) => ({
        tradingPair: {
          symbol: '',
          pair: '',
        },
        setCurrentPair: ({ symbol, pair }) =>
          set(() => ({ tradingPair: { pair: pair, symbol: symbol } })),
      }),
      { name: 'AppStore' }
    )
  )
);
