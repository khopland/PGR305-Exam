import { createContext, Dispatch, FC, SetStateAction, useState } from 'react';

type abstractContext<T> = {
  value: T | null;
  setContext: Dispatch<SetStateAction<T | null>>;
};
export default function abstractContext<T>(
  initialContext: T | null = null
): [React.Context<abstractContext<T>>, FC] {
  const context = createContext<abstractContext<T>>({
    value: initialContext,
    setContext: (): void => {
      throw new Error('setContext function must be overridden');
    },
  });

  const componet: FC = ({ children }) => {
    const [value, setContext] = useState<T | null>(null);
    return (
      <context.Provider value={{ value, setContext }}>
        {children}
      </context.Provider>
    );
  };

  return [context, componet];
}
