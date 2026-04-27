import { useEffect } from 'react';
import { getSessionUserName } from '../utils/collaboration';

export const useStoreLifecycle = (
  bootstrap: () => void | Promise<void>,
  dispose?: () => void | Promise<void>,
) => {
  useEffect(() => {
    void bootstrap();
    return () => {
      void dispose?.();
    };
  }, [bootstrap, dispose]);
};

export const useUserStoreLifecycle = (
  bootstrap: (userName: string) => void | Promise<void>,
  dispose?: () => void | Promise<void>,
) => {
  useEffect(() => {
    void bootstrap(getSessionUserName());
    return () => {
      void dispose?.();
    };
  }, [bootstrap, dispose]);
};
