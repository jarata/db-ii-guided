const router = require('express').Router();
const knex = require('knex');

const knexConfig = {
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: './data/rolex.db3'
  }
};

const db = knex(knexConfig);

router.get('/', (req, res) => {
  // get the roles from the database
  db('roles')
      .then(roles => {
        res.status(200).json(roles)
      })
      .catch(err => {
        res.status(500).json(err)
      })
});

router.get('/:id', (req, res) => {
  // retrieve a role by id
  db('roles')
      .where({id: req.params.id})
      .then(role => {
          res.status(200).json(role)
      })
      .catch(err => {
          res.status(500).json(err)
      })
});

// Student Solution
// router.get('/:id', async (req, res) => {
//     const id = req.params.id
//     try {
//         const role = await db('roles')
//             .where({id})
//         return res.status(200).json(role)
//     } catch(error) {
//         console.log(error)
//         res.status(500).json(error)
//     }
//     // db('roles')
//     //   .where({id})
//     //   .then(role => {
//     //     res.status(200).json(role)
//     //   })
//     //   .catch(error => {
//     //     res.status(500).json(error)
//     //   })
// });

router.post('/', (req, res) => {
  // add a role to the database
  db('roles')
      .insert(req.body)
      .then(ids => {
          const [id] = ids;
          db('roles')
              .where({ id })
              .first()
              .then(role => {
                  res.status(200).json(role);
              })
      })
      .catch(err => {
          res.status(500).json(err)
      })
});

router.put('/:id', (req, res) => {
  // update roles
  res.send('Write code to modify a role');
});

router.delete('/:id', (req, res) => {
  // remove roles (inactivate the role)
  res.send('Write code to remove a role');
});

module.exports = router;
