import { Assets } from "../../../apis/users.api";

export interface StatisticCardProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
}

export interface UserDetailContentProps {
  assets: Assets;
  isLoading: boolean;
  uid: string;
}
export interface SearchProps {
  onSearch: (
    value: string,
    event?:
      | React.ChangeEvent<HTMLInputElement>
      | React.MouseEvent<HTMLElement, MouseEvent>
      | React.KeyboardEvent<HTMLInputElement>,
    info?: { source?: "clear" | "input" }
  ) => void | undefined;
}
