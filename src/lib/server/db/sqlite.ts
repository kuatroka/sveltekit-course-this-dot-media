import { SQLITE_FULL_PATH } from '$env/static/private';
import Database from 'better-sqlite3';
import type { Cusip, Cik, Every_cik_qtr_cusip } from './types';

const db = new Database(SQLITE_FULL_PATH, { verbose: console.log }); // remove in prod

export function getCik(limit = 20000, q?: string): Cik[] {
	const sql = `
    SELECT
    l.cik AS cik,
    last_quarter,
    l.cik_name AS cik_name,
	cum_mean_twrr
    FROM 
    (SELECT cik, cik_name
    	FROM cik_md) l
    LEFT JOIN 
    (SELECT cik, MAX(quarter) AS last_quarter, cum_mean_twrr_per_cik_per_qtr_cons AS cum_mean_twrr
    FROM every_cik_qtr_twrr
    GROUP BY cik) r
    ON l.cik = r.cik
    WHERE ($q IS NULL OR l.cik_name LIKE '%' || '${q}' || '%')
    ORDER BY cum_mean_twrr DESC
    LIMIT $limit 
    `;
	const stmnt = db.prepare(sql);
	const rows = stmnt.all({ limit, q });
	return rows as Cik[];
	// console.log(rows.slice(0, 2))
}

export function getCusip(limit = 15000): Cusip[] {
	const sql = `
    SELECT
    DISTINCT cik,
	cum_mean_twrr_per_cik_per_qtr_cons AS cum_mean_twrr
    FROM every_cik_qtr_twrr
    GROUP BY cik
    LIMIT $limit 
    `;
	const stmnt = db.prepare(sql);
	const rows = stmnt.all({ limit });
	return rows as Cusip[];
	console.log(rows.slice(0, 2));
}

/////////////////
export function get_every_cik_qtr_sqlite(cik?: string): Every_cik_qtr_cusip[] {
	const sql = `
    SELECT
	cik,
	quarter,
	quarter_end_date
	num_assets_per_cik_per_qtr,
	ttl_value_per_cik_per_qtr,
	mean_curr_twrr_per_cik_per_qtr_cons,
	cum_mean_twrr_per_cik_per_qtr_cons,
	weight_of_all_value_per_quarter
    FROM every_cik_qtr_twrr
    WHERE cik = $cik`;

	const stmnt = db.prepare(sql);
	const rows = stmnt.all({ cik });
	console.log(rows.slice(0, 2));
	return rows as Every_cik_qtr_cusip[];
}

///////////////////////////////////////////////
// export function getInitialTracks(limit = 50): Track[] {
// 	const sql = `
//     select t.TrackId as trackId
//     , t.Name as trackName
//     , a.AlbumId as albumId
//     , a.Title as albumTitle
//     , at.ArtistId as artistId
//     , at.Name as artistName
//     , g.Name as genre
//     from Track t
//     join Album a
//     on t.AlbumId = a.AlbumId
//     join Artist as at
//     on a.ArtistId = at.ArtistId
//     join Genre as g
//     on t.GenreId = g.GenreId
//     LIMIT $limit
//     `;
// 	const stmnt = db.prepare(sql);
// 	const rows = stmnt.all({ limit });
// 	return rows as Track[];
// }

// export function getAlbumById(albumId: number): Album {
// 	const sql = `
//     select a.AlbumId as albumId,
//         a.Title as albumTitle,
//         at.ArtistId as artistId,
//         at.Name as artistName
//     from Album as a
//     join Artist as at on a.AlbumId = at.ArtistId
//     where a.AlbumId = $albumId;
//     `;
// 	const stmnt = db.prepare(sql);
// 	const row = stmnt.get({ albumId });
// 	return row as Album;
// }

// export function searchTracks(searchTerm: string, limit = 50): Track[] {
// 	const sql = `
//     select  t.TrackId as trackId,
//             t.Name as trackName,
//             a.AlbumId as albumId,
//             a.Title as albumTitle,
//             at.ArtistId as artistId,
//             at.Name as artistName,
//             g.Name as genre
//     from Track t
//     join Album a
//     on t.AlbumId = a.AlbumId
//     join Artist at
//     on a.ArtistId = at.ArtistId
//     join Genre g
//     on t.GenreId = g.GenreId
//     where lower(t.Name) like lower('%' || $searchTerm || '%')
//     limit $limit
//   `;
// 	const stmnt = db.prepare(sql);
// 	const rows = stmnt.all({ searchTerm, limit });
// 	return rows as Track[];
// }

// export function getAlbumTracks(albumId: number): AlbumTrack[] {
// 	const sql = `
//   select t.TrackId as trackId,
//         t.Name as trackName,
//         t.Milliseconds as trackMs
//   from Track as t
//   where t.AlbumId = $albumId
//   order by t.TrackId
// `;
// 	const stmnt = db.prepare(sql);
// 	const rows = stmnt.all({ albumId });
// 	return rows as AlbumTrack[];
// }

// export function updateAlbumTitle(albumId: number, albumTitle: string): void {
// 	const sql = `
//   update Album
//   set Title = $albumTitle
//   where AlbumId = $albumId
// `;
// 	const stmnt = db.prepare(sql);
// 	stmnt.run({ albumId, albumTitle });
// }
