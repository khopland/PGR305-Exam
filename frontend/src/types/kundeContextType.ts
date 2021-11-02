import { kunde } from '../interfaces/kunde';

export type KundeContextType = {
  kunder: kunde[];
  saveKunde: (kunde: kunde) => boolean;
};
