import mysql from "mysql2/promise";

export class DBClient {
  private static pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
  });

  static async getRow<T = any>(query: string, params: any[] = []): Promise<T | null> {
    const [rows] = await this.pool.execute(query, params);
    return Array.isArray(rows) && rows.length ? (rows[0] as T) : null;
  }

  static async getRows<T = any>(query: string, params: any[] = []): Promise<T[]> {
    const [rows] = await this.pool.execute(query, params);
    return Array.isArray(rows) ? (rows as T[]) : [];
  }
}
