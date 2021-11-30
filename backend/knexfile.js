module.exports = {
  development: {
    client: 'pg',
    // connection: 'postgres://localhost/kanban',
    connection: {
      host: process.env.NODE_ENV === 'development' ? process.env.HOST : 'host.docker.internal',
      port: process.env.DB_PORT || 5432,
      user: process.env.USER || 'postgres',
      password: process.env.PASSWORD,
      database: process.env.DATABASE || 'kanban',
      connectTimeout: 1000
    },
    pool: {
      min: 0,
      max: 10,
      acquireTimeoutMillis: 60000,
      idleTimeoutMillis: 600000
    }
  }
};
