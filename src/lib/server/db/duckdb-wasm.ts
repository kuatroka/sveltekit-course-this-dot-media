// import * as duckdb from '@duckdb/duckdb-wasm';
// import type { AsyncDuckDBConnection, AsyncDuckDB } from '@duckdb/duckdb-wasm';
// import duckdb_wasm from '@duckdb/duckdb-wasm/dist/duckdb-mvp.wasm?url';
// import mvp_worker from '@duckdb/duckdb-wasm/dist/duckdb-browser-mvp.worker.js?url';
// import duckdb_wasm_eh from '@duckdb/duckdb-wasm/dist/duckdb-eh.wasm?url';
// import eh_worker from '@duckdb/duckdb-wasm/dist/duckdb-browser-eh.worker.js?url';

// const MANUAL_BUNDLES: duckdb.DuckDBBundles = {
// 	mvp: {
// 		mainModule: duckdb_wasm,
// 		mainWorker: mvp_worker
// 	},
// 	eh: {
// 		mainModule: duckdb_wasm_eh,
// 		mainWorker: eh_worker
// 	}
// };
// const bundle = await duckdb.selectBundle(MANUAL_BUNDLES);
// let db: AsyncDuckDB | null = null;

// const initDB = async () => {
// 	if (db) {
// 		return db; // Return existing database, if any
// 	}
// 	// Instantiate worker
// 	const worker = new Worker(bundle.mainWorker!);
// 	const logger = new duckdb.ConsoleLogger();
// 	// and asynchronous database
// 	db = new duckdb.AsyncDuckDB(logger, worker);
// 	await db.instantiate(bundle.mainModule, bundle.pthreadWorker);
// 	return db;
// };

// export { initDB }; // so we can import this elsewhere

// const parquetUrl = new URL('/part-0.parquet', import.meta.url).href;

// console.log('parquetUrl', parquetUrl);

// ////////////
// let conn_prom: Promise<AsyncDuckDBConnection> | null; // Declare globally so promise can be awaited anywhere
// const load_db = async () => {
// 	if (conn_prom) {
// 		return conn_prom; // Return existing promise, if any
// 	}
// 	// Initialize database
// 	const db = await initDB();
// 	await db.registerFileURL('part-0.parquet', parquetUrl, 4, false); // From: https://voltrondata-labs-datasets.s3.us-east-2.amazonaws.com/nyc-taxi-tiny/year=2009/month=1/part-0.parquet

// 	conn_prom = db.connect(); // Open a connection (promise)
// 	return conn_prom;
// };

// // SQL to send to DuckDB-Wasm
// const sql = `
// SELECT date_trunc('day', pickup_datetime) as pickup_date, AVG(total_amount) as total_amount
// FROM parquet_scan('part-0.parquet') -- Use same filename as passed in registerFileUrl
// GROUP BY pickup_date
// `;

// // Send query and await results from DuckDB
// const get_query = async (q: string) => {
// 	const conn = await conn_prom!;
// 	const results = await conn.query(q);
// 	return results;
// };

// // Where all the stuff happens
// const main = async () => {
// 	await load_db(); // Wait until DuckDB ready

// 	// Query the taxi parquet file
// 	const table = await get_query(sql);
// 	const table_arr = table.toArray(); // list of objects, compatible with OJS

// 	console.log(table_arr);
// };

// export { main };
