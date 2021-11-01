import { ansatte } from '../interfaces/ansatte';

export type AnsatteContextType = {
  ansatte: ansatte[];
  saveAnsatt: (ansatt: ansatte) => boolean;
};
