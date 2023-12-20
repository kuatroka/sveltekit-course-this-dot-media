import { SQLITE_FULL_PATH } from '$env/static/private';
import Database from 'better-sqlite3';
import type { Cik } from './types';

const db = new Database(SQLITE_FULL_PATH, { verbose: console.log }); // remove in prod

export function getCik(
	limit: number,
	q: string = '',
	skip: number,
	order_by: string,
	order_dir: string
): Cik[] {
	const sql = `
		SELECT
		COUNT(*) OVER () AS num_entries,
		id,
		cik,
		cik_name,
		cum_mean_twrr_per_cik_per_qtr_cons AS cum_twrr_cons,
		(select count(*) from cik_md) AS initial_num_entries
		FROM every_cik_latest_qtr_stats
		WHERE UPPER(cik_name) LIKE UPPER('%${q}%')
		ORDER BY ${order_by ? order_by : 'cik'} ${order_dir ? order_dir : 'ASC'}
		LIMIT $limit OFFSET $skip
	`;
	const stmnt = db.prepare(sql);
	const rows = stmnt.all({ limit, q, skip });
	console.log(rows.slice(0, 2));
	console.log(rows.length);
	return rows as Cik[];
}

export function getCikDetails(cik?: string, quarter?: string): Cik[] {
	const sql = `
    SELECT
        cik,
        quarter,
        ttl_value_per_cik_per_qtr AS value,
        num_assets_per_cik_per_qtr AS num_assets,
        mean_curr_twrr_per_cik_per_qtr_cons AS curr_twrr,
        cum_mean_twrr_per_cik_per_qtr_cons AS cum_twrr
    FROM every_cik_qtr_twrr
    WHERE ($cik IS NULL OR cik = $cik) AND quarter = ${
			quarter ? '$quarter' : '(SELECT MAX(quarter) FROM every_cik_qtr_twrr)'
		}
`;
	const stmnt = db.prepare(sql);
	const rows = stmnt.all({ cik, quarter });
	console.log(rows.slice(0, 2));
	console.log(rows.length);
	return rows as Cik[];
}

// const sql = `
// SELECT
// l.cik AS cik,
// last_quarter,
// l.cik_name AS cik_name,
// cum_twrr,
// '/superinvestors/' || l.cik  || '/' || last_quarter as link
// FROM
// (SELECT cik, cik_name
// 	FROM cik_md) l
// LEFT JOIN
// (SELECT cik, MAX(quarter) AS last_quarter, cum_mean_twrr_per_cik_per_qtr_cons AS cum_twrr
// FROM every_cik_qtr_twrr
// GROUP BY cik) r
// ON l.cik = r.cik
// WHERE ($q IS NULL OR l.cik_name LIKE '%' || '${q}' || '%')
// LIMIT $limit OFFSET $skip
// `;
