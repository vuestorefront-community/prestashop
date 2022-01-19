import { UserGetters } from '@vue-storefront/core';
import type { User } from '@vue-storefront/prestashop-api';

// eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/explicit-module-boundary-types
function getFirstName(user: any): string {
  return user.firstname;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/explicit-module-boundary-types
function getLastName(user: any): string {
  return user.lastname;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getFullName(user: User): string {
  return '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/explicit-module-boundary-types
function getEmailAddress(user: any): string {
  return user.email;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function getGender(user:any):number {
  return user.id_gender;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function getBirthday(user:any):string {
  return user.birthday;
}

export const userGetters: UserGetters<User> = {
  getFirstName,
  getLastName,
  getFullName,
  getEmailAddress,
  getGender,
  getBirthday
};
