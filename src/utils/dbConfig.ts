/**
 * Database Configuration Utility (Shipowl-style)
 * Reads individual environment variables (DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME)
 * and dynamically builds the MySQL connection string.
 */

export interface DatabaseConfig {
  connection: string;
  host: string;
  port: number;
  database: string;
  user: string;
  password?: string;
}

export const dbConfig: DatabaseConfig = {
  connection: process.env.DB_CONNECTION || "mysql",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "3306", 10),
  database: process.env.DB_NAME || process.env.DB_DATABASE || "akshay_portfolio",
  user: process.env.DB_USER || process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || "",
};

/**
 * Dynamically constructs the MySQL database connection URL from environment variables.
 * Format: mysql://USER:PASSWORD@HOST:PORT/DATABASE
 */
export function buildDatabaseUrl(): string {
  const { user, password, host, port, database } = dbConfig;
  const encodedUser = encodeURIComponent(user);
  const encodedPass = password ? `:${encodeURIComponent(password)}` : "";

  return `mysql://${encodedUser}${encodedPass}@${host}:${port}/${database}`;
}

/**
 * Returns active database connection URL
 */
export function getActiveDatabaseUrl(): string {
  if (process.env.DB_HOST && (process.env.DB_USER || process.env.DB_USERNAME)) {
    return buildDatabaseUrl();
  }
  return process.env.DATABASE_URL || buildDatabaseUrl();
}
