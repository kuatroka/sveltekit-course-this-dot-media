export type Charachter = {
	id: number;
	name: string;
	image: string;
	occupation: string;
};

export type Cik = {
	num_entries: number;
	id: number;
	cik: string;
	cik_name: string;
	cum_twrr_cons: number;
	value: number;
	quarter: string;
};

export type CikDetails = {
	cik: string;
	cik_name: string;
	cik_ticker: string;
	cik_ticker_name: string;
	cum_twrr: number;
	curr_twrr: number;
	num_assets: number;
	value: number;
	quarter: string;
	link: string;
};
