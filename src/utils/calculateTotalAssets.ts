import api from "../apis/axiosCustom";
import { appUrls } from "../apis/contants";
import { Portfolio } from "../apis/users.api";

export async function calculateTotalAssets(data: Portfolio[]): Promise<number> {
    let total = 0;
    for (const item of data) {
        const tickerVal = await getTickerVal(item.ticker);
        total += Number(item.amount) * tickerVal;
    }
    return total;
}

const getTickerVal = async (ticker: string) => {
    try {
        const response = await api.get(`${appUrls.stockURL}/ticker/price-board/${ticker}`);
        return response.data[0]?.["('match', 'match_price')"];
    } catch (error) {
        console.log(error);
        return 0;
    }
};
