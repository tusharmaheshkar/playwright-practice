import { faker } from '@faker-js/faker';

export type UserData = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
};

export function buildUser(overrides: Partial<UserData> = {}): UserData {
  const firstName = overrides.firstName ?? faker.person.firstName();
  const lastName = overrides.lastName ?? faker.person.lastName();

  return {
    firstName,
    lastName,
    email: overrides.email ?? faker.internet.email({ firstName, lastName }),
    username: overrides.username ?? faker.internet.username(),
    password: overrides.password ?? faker.internet.password({ length: 12 }),
  };
}
