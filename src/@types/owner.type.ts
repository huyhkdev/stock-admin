
export interface Fee {
  FNAME: string;
  FPRICE: number;
  FUNIT: string;
}

export interface House {
  HNAME: string;
  GPRICE: number;
  GAREA: number;
  HAMEN: string[];
  HIMAGE: string[];
  PROVINCE: string;
  DISTRICT: string;
  WARD: string;
  DETAIL: string;
  ADDRESSURL: string;
  HTYPE: number; // houseType
  HOTYPE: number; // houseOwnerType
  FEES: Fee[];
  HDESC: string;
}

export interface HousePropsCreate {
  HNAME: string;
  GPRICE: number;
  GAREA: number;
  HAMEN: string[];
  HIMAGE: string[];
  PROVINCE: number;
  DISTRICT: number;
  WARD: number;
  DETAIL: string;
  ADDRESSURL: string;
  HTYPE: number; // houseType
  HOTYPE: number; // houseOwnerType
  FEES: Fee[];
  HDESC: string;
}

export const houseKeys: (keyof House)[] = [
  "HNAME",
  "GPRICE",
  "GAREA",
  "HAMEN",
  "HIMAGE",
  "DETAIL",
  "ADDRESSURL",
  "HOTYPE",
  "FEES",
  "HDESC",
];

export interface Province {
  code: number;
  name: string;
  districts: District[];
}

export interface District {
  code: number;
  name: string;
  wards: Ward[];
}

export interface Ward {
  code: number;
  name: string;
}
