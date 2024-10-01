interface TopCoinsResponse {
    result?: TopCoinsResult[];
    success?: boolean;
}
interface TopCoinsResult {
    oi_change_usd_6h?: number;
    oi_usd?: number;
    price?: string;
    price_change?: number;
    product_id?: number;
    settlement_time?: Date;
    symbol?: string;
    turnover_usd?: number;
}

export type { TopCoinsResponse, TopCoinsResult }