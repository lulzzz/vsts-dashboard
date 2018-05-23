import BuildData from '../../services/build-data';

export default interface IMainState {
  Builds: BuildData[];
  Loading: boolean;
}
