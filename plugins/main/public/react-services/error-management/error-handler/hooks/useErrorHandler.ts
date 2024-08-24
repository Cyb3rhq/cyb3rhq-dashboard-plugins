import { useEffect, useState } from 'react';
import Cyb3rhqError from '../../error-factory/errors/Cyb3rhqError';
import { ErrorHandler } from '../error-handler';

/**
 *
 * @param callback
 * @returns
 */
export const useErrorHandler = (callback: Function) => {
  const [res, setRes] = useState(null);
  const [error, setError] = useState<Error|Cyb3rhqError|null>(null);
  useEffect(() => {
    const handleCallback =  async () => {
      try {
        let res = await callback();
        setRes(res);
        setError(null);
      } catch (error) {
        if (error instanceof Error) {
          error = ErrorHandler.handleError(error);
        }
        setRes(null);
        setError(error as Error | Cyb3rhqError);
      }
    }

    handleCallback();
  }, [])
  
  return [res, error];
};
