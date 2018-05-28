import { ConfigService } from './config-service';
import '../mocks/local-storage';

test('that storing the project is successful', () => {
  const configService: ConfigService = new ConfigService();
  configService.ProjectName = 'Test';
  expect(configService.ProjectName).toBe('Test');
});

test('that storing the token is successful', () => {
  const configService: ConfigService = new ConfigService();
  configService.Token = 'Token';
  expect(configService.Token).toBe('Token');
});

test('that storing the account name is successful', () => {
  const configService: ConfigService = new ConfigService();
  configService.AccountURL = 'testaccount';
  expect(configService.AccountURL).toBe('testaccount');
});

test('that clearing the project is successful', () => {
  const configService: ConfigService = new ConfigService();
  configService.ProjectName = 'Test';
  configService.ProjectName = '';
  expect(configService.ProjectName).toBe(undefined);
});

test('that clearing the token is successful', () => {
  const configService: ConfigService = new ConfigService();
  configService.Token = 'Token';
  configService.Token = '';
  expect(configService.Token).toBe(undefined);
});

test('that clearing the account name is successful', () => {
  const configService: ConfigService = new ConfigService();
  configService.AccountURL = 'testaccount';
  configService.AccountURL = '';
  expect(configService.AccountURL).toBe(undefined);
});
