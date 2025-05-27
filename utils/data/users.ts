export interface UserDataType {
  username: string;
  password: string;
  file: string;
  firstName: string;
  lastName: string;
  postalCode: string;
}

export const STANDARD_USER: UserDataType = {
  username: "standard_user",
  password: "secret_sauce",
  file: ".auth/standard_user.json",
  firstName: "Tester",
  lastName: "Testerski",
  postalCode: "00-001",
};

export const USERS = [STANDARD_USER];
