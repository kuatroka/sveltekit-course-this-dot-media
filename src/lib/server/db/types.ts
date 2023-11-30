export type Charachter = {
	id: number;
	name: string;
	image: string;
	occupation: string;
};

export type Cik = {
	cik: number;
	cik_name: string;
	cik_ticker: string;
	cik_ticker_name: string;
	cum_mean_twrr: number;
};

export type Cusip = {
	cusip: string;
	name_of_issuer: string;
	cusip_ticker: string;
	quarter: string;
	value: number;
};

export type Overview_per_quarter = {
	id: number;
	cik: string;
	quarter: string;
	quarter_end_date: Date;
	ttl_num_ciks_per_qtr: number;
	ttl_num_ciks_per_qtr_prc_chg: number;
	ttl_num_assets_all_ciks_per_qtr: number;
	ttl_num_assets_all_ciks_per_qtr_prc_chg: number;
	ttl_value_all_ciks_per_qtr: number;
	ttl_value_all_ciks_per_qtr_prc_chg: number;
	mean_curr_twrr_all_ciks_per_qtr_cons: number;
	cum_mean_twrr_all_ciks_per_qtr_cons: number;
	// is_quarter_completed: string;
	// num_ciks_per_quarter_num0: number;
	// num_cusip_per_quarter_num0: number;
	// total_cusip_num0: number;
	// total_value_per_quarter_usd: number;
	// total_ciks_num0: number;
	// total_years: number;
	// total_quarters: number;
	// prc_change_cik: number;
	// prc_change_cusip: number;
	// prc_change_total_value: number;
	// year_as_date: Date;
	// year_as_number: number;
	// year_as_string: string;
	// mean_twrr_all_cik_quarter: number;
	// mean_twrr_all_cik_quarter_pct_chg: number;
};

export type Overview_per_cik_quarter = {
	cik: string;
	quarter: string;
	quarter_end_date: Date;
	num_assets_per_cik_per_qtr: string;
	ttl_value_per_cik_per_qtr: string;
	mean_curr_twrr_per_cik_per_qtr_cons: string;
	cum_mean_twrr_per_cik_per_qtr_cons: string;
	weight_of_all_value_per_quarter: string;
};

export type Every_cik_qtr_cusip = {
	cik: string;
	quarter: string;
	quarter_end_date: Date;
	num_assets_per_cik_per_qtr: string;
	ttl_value_per_cik_per_qtr: string;
	mean_curr_twrr_per_cik_per_qtr_cons: string;
	cum_mean_twrr_per_cik_per_qtr_cons: string;
	weight_of_all_value_per_quarter: string;
};

export type Quarters_per_cik = {
	cik: number;
	quarter: string;
};

export type Overview_tr_closed = {
	cik: number;
	quarter: string;
	num_closed_tr_per_qtr: number;
	qtr_open_closed_tr_ratio: number;
	qtr_mean_tr_twr: number;
	qtr_avg_tr_duration_qtr: number;
};

export type Tr_per_cik = {
	tr_id: string;
	cik: number;
	tr_id_link: string;
	tr_open: string;
	tr_number: number;
	tr_close: string;
	tr_open_value: number;
	tr_open_shares: number;
	tr_close_value: number;
	tr_close_shares: number;
	num_tr2: number;
	name_of_issuer: string;
	cik_name: string;
	cusip: string;
	tr_duration_qtr: number;
	tr_twrr: number;
};
