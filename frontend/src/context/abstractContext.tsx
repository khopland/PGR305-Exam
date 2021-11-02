import { createContext, Dispatch, FC, SetStateAction, useState } from 'react';

type abstractContext<T> = {
  value: T | null;
  setContext: Dispatch<SetStateAction<T | null>>;
};
export default function abstractContext<T>(): [
  React.Context<abstractContext<T>>,
  FC
] {
  const initialContext: abstractContext<T> = {
    value: null,
    setContext: (): void => {
      throw new Error('setContext function must be overridden');
    },
  };

  const context = createContext<abstractContext<T>>(initialContext);

  const [value, setContext] = useState<T | null>(null);

  const componet: FC = (children) => (
    <context.Provider value={{ value, setContext }}>
      {children}
    </context.Provider>
  );

  return [context, componet];
}
