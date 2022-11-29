const { Pool } = require('pg')
const pool = new Pool({
    user: 'dbuser',
    host: '127.0.0.1',
    database: 'mydb',
    password: 'secretpassword',
    port: 3211,
  })
;(async () => {
  console.log('starting async query')
  const result = await pool.query('SELECT NOW()')
  console.log('async query finished')
  console.log('starting callback query')
  pool.query('SELECT NOW()', (err, res) => {
    console.log('callback query finished')
  })
  console.log('calling end')
  await pool.end()
  console.log('pool has drained')
})()