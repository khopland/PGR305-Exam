import { prosjekt } from '../interfaces/prosjekt';

export type ProsjektContextType = {
  prosjekter: prosjekt[];
  updateProsjekt: (prosjekt: prosjekt) => boolean;
  saveProsjekt: (prosjekt: prosjekt) => boolean;
};
