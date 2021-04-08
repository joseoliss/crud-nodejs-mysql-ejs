const controller = {};

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM customer', (err, customers) => {
            if (err) {
                res.json(err);
            }
            res.render('customer', {
                data: customers
            });
        });
    });
};

controller.add = (req, res) => {
    req.getConnection((err, conn) => {

        //se puede validar si hay error en la conexion con err antes de.

        conn.query('INSERT INTO customer set ?', [
            req.body
        ], (err, rows) => {
            //se manejan errores
            res.redirect('/');
        });
    });
};

controller.edit = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM customer WHERE id = ?', [id], (err, rows) => {
            res.render('customer_edit', {
                data: rows[0]
            })
        });
    });
}

controller.editPost = (req, res) => {
    const { id } = req.params;
    const newCustomer = req.body;
    req.getConnection((err, conn) => {
        conn.query('UPDATE customer set ? WHERE id = ?', [newCustomer, id], (err, rows) => {
            res.redirect('/');
        });
    });
};

controller.delete = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        conn.query('DELETE FROM customer WHERE id = ?', [id], (err, rows => {
            res.redirect('/');
        }));
    });
};

module.exports = controller;