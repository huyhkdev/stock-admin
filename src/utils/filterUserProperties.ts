import { UserInfo } from "../apis/users.api";

export const filterUsersByKey = (users: UserInfo[], key: keyof UserInfo, value: UserInfo[keyof UserInfo]): UserInfo[] => {
    return users.filter(user => user[key] === value);
  }
