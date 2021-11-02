import abstractContext from './abstractContext';

type shop = {
  name: string;
};

const [context, provider] = abstractContext<shop[]>();

export const ShopContext = context;
export const ShopProvider = provider;
