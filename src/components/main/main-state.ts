import BuildData from '../../services/build-data';

export default interface IMainState {
  builds: BuildData[];
  loading: boolean;
  lastUpdated: Date;
}
