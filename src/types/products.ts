enum ContractType {
    CALL_OPTIONS = 'call_options',
    PUT_OPTIONS = 'put_options',
    FUTURES = 'futures',
    PERPETUAL_FUTURES = 'perpetual_futures',
}

interface TickerProductsResponse {
    result: TickerProduct[];
    success: boolean;
}
interface TickerProduct {
    close: number | null;
    contract_type: ContractType;
    description: null | string;
    mark_change_24h: string;
    mark_price: string;
    oi: string;
    oi_change_usd_6h: string;
    oi_value_usd: string;
    product_id: string;
    symbol: string;
    tags: string[];
    turnover: null | string;
    turnover_usd: string;
    underlying_asset_symbol: string;
}

export type { TickerProductsResponse, TickerProduct };

export { ContractType };
