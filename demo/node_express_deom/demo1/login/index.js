const { app, pool, Result } = require('../connect')

router.get('/', (req, res) => {
  pool.getConnection((err, conn) => {
    // 从连接池中哪一个链接
    conn.query('SELECT * FROM  students', (e, r) => res.json(new Result({ data: r })))
    conn.release()
  })
})

module.exports = router
