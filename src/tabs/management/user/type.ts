export interface Ticker {
  id: string;
  uid: string;
  ticker: string;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface StatisticCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
}

export interface UserDetailContentProps {
  tickers: Ticker[];
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
