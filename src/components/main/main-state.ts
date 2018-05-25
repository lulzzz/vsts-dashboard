import { BuildData } from '../../services/build-data';

export interface IMainState {
  builds: BuildData[];
  lastUpdated: Date;
  loading: boolean;
}
