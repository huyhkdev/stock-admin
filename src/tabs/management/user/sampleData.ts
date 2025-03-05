import { Ticker, User } from "./type";

export const users: User[] = [
    {
        id: "user123",
        fullName: "Jane Doe",
        email: "jane.doe@example.com",
        role: "student",
        cic: "123231231231",
        gender: "Female",
        dob: new Date("1995-05-15"),
        campus: "Ho Chi Minh",
        state: "active",
        createdAt: new Date("2023-01-01T09:00:00Z"),
        updatedAt: new Date("2023-02-01T10:00:00Z"),
        balance: 3600
    },
    {
        id: "user456",
        fullName: "John Smith",
        email: "john.smith@example.com",
        role: "admin",
        cic: "123231231231",
        gender: "Male",
        dob: new Date("1988-11-23"),
        campus: "Da Nang",
        state: "active",
        createdAt: new Date("2022-06-15T08:30:00Z"),
        updatedAt: new Date("2022-12-20T14:45:00Z"),
        balance: 3600
    },
    {
        id: "user789",
        fullName: "Alice Nguyen",
        email: "alice.nguyen@example.com",
        role: "teacher",
        cic: "123231231231",
        gender: "Female",
        dob: new Date("1990-03-20"),
        campus: "Ha Noi",
        state: "active",
        createdAt: new Date("2023-03-10T11:00:00Z"),
        updatedAt: new Date("2023-03-15T09:30:00Z"),
        balance: 3600
    },
    {
        id: "user101",
        fullName: "Bob Tran",
        email: "bob.tran@example.com",
        role: "student",
        cic: "123231231231",
        gender: "Male",
        dob: new Date("2000-07-08"),
        campus: "Da Nang",
        state: "inactive",
        createdAt: new Date("2023-04-05T12:45:00Z"),
        updatedAt: new Date("2023-04-10T08:00:00Z"),
        balance: 3600
    },
    {
        id: "user102",
        fullName: "Clara Le",
        email: "clara.le@example.com",
        role: "staff",
        cic: "123231231231",
        gender: "Female",
        dob: new Date("1993-09-17"),
        campus: "Da Nang",
        state: "active",
        createdAt: new Date("2023-05-01T07:20:00Z"),
        updatedAt: new Date("2023-05-05T10:15:00Z"),
        balance: 3600
    }
];

export const tickers: Ticker[] = [
    {
        id: "ticker1",
        uid: "user101",
        ticker: "FPT",
        amount: 3600,
        createdAt: new Date("2025-02-12 11:09:26"),
        updatedAt: new Date("2025-03-01 11:01:16"),
    },
    {
        id: "ticker2",
        uid: "user101",
        ticker: "VNM",
        amount: 4500,
        createdAt: new Date("2025-02-12 11:14:56"),
        updatedAt: new Date("2025-03-01 10:58:30"),
    },
    {
        id: "ticker3",
        uid: "user102",
        ticker: "VNM",
        amount: 2700,
        createdAt: new Date("2025-02-12 11:14:56"),
        updatedAt: new Date("2025-03-01 10:58:30"),
    },
    {
        id: "ticker4",
        uid: "user102",
        ticker: "VNM",
        amount: 2300,
        createdAt: new Date("2025-02-12 11:14:56"),
        updatedAt: new Date("2025-03-01 10:58:30"),
    },
    {
        id: "ticker5",
        uid: "user102",
        ticker: "VNM",
        amount: 2700,
        createdAt: new Date("2025-02-12 11:14:56"),
        updatedAt: new Date("2025-03-01 10:58:30"),
    },
    {
        id: "ticker6",
        uid: "user102",
        ticker: "VNM",
        amount: 2300,
        createdAt: new Date("2025-02-12 11:14:56"),
        updatedAt: new Date("2025-03-01 10:58:30"),
    }
];
