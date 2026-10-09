import postgres from "postgres";

// One shared connection to the database. DATABASE_URL is set in Vercel.
const globalForDb = globalThis;

export const sql =
  globalForDb.__sql ||
  postgres(process.env.DATABASE_URL, {
    ssl: "require",
    prepare: false, // needed for Supabase's pooled connection
    max: 3,
    // Keep dates as plain text like "2026-10-09" (avoids time zone surprises)
    types: {
      date: { to: 1082, from: [1082], serialize: (x) => x, parse: (x) => x },
    },
  });

if (process.env.NODE_ENV !== "production") globalForDb.__sql = sql;
