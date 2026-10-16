import pg from 'pg';

export const DATABASE = Symbol('DATABASE');

/** Connexions à Postgres ; la table des factures est créée au démarrage, avec trois factures d'exemple. */
export async function connect(url = process.env['DATABASE_URL']): Promise<pg.Pool> {
  if (!url) throw new Error('DATABASE_URL est requise (voir .env.example).');
  const pool = new pg.Pool({ connectionString: url });
  await pool.query(`
    create table if not exists invoice (
      id serial primary key,
      customer text not null,
      amount_cents integer not null,
      issued_at timestamptz not null default now()
    )
  `);
  const { rows } = await pool.query<{ count: string }>('select count(*) from invoice');
  if (rows[0]?.count === '0') {
    await pool.query(`
      insert into invoice (customer, amount_cents) values
        ('Atelier Moreau', 120000), ('Boulangerie Faure', 48650), ('Diallo Conseil', 315000)
    `);
  }
  return pool;
}
