import { RegistrationData } from './types';

export const registerData: RegistrationData = {
  firstName: process.env.FIRST_NAME ?? 'Tushar',
  lastName: process.env.LAST_NAME ?? 'Maheshkar',
  mobile: process.env.MOBILE ?? '9074849489',
  email: process.env.EMAIL ?? 'tusharmaheshkar@gmail.com',
  organization: process.env.ORGANIZATION ?? 'test org',
  username: process.env.USERNAME ?? 'zztusharzz',
  password: process.env.PASSWORD ?? 'HelloWorld123',
  confirmPassword: process.env.CONFIRM_PASSWORD ?? 'HelloWorld123',
};
