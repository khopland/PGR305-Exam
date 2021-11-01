import abstractContext from './abstractContext';

type ansatte = {
  name: string;
};

const [context, provider] = abstractContext<ansatte[]>();

export const AnsatteContext = context;
export const AnsatteProvider = provider;
