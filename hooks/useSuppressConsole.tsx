// hooks/useSuppressConsole.js
import { useEffect } from 'react';

const useSuppressConsole = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log = () => {};
      console.warn = () => {};
      console.error = () => {};
    }
  }, []);
};

export default useSuppressConsole;
