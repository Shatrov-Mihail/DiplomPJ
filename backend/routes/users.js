const express = require('express');
const router = express.Router();
const { getUsers, getRoles, updateUser, deleteUser } = require('../controllers/user');
const mapUser = require('../helpers/mapUser');
const authenticated = require('../middlewares/authenticated');
const hasRole = require('../middlewares/hasRole');
const ROLES = require('../constants/roles');

// Добавляем authenticated middleware для всех роутов
router.use(authenticated);

router.get('/', hasRole([ROLES.ADMIN]), async (req, res) => {
    try {
        const users = await getUsers();
        res.send({ data: users.map(mapUser) });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.get('/roles', hasRole([ROLES.ADMIN]), async (req, res) => {
    try {
        const roles = await getRoles();
        res.send({ data: roles });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.patch('/:id', hasRole([ROLES.ADMIN]), async (req, res) => {
    try {
        const newUser = await updateUser(req.params.id, {
            role: req.body.roleId
        });
        res.send({ data: mapUser(newUser) });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.delete('/:id', hasRole([ROLES.ADMIN]), async (req, res) => {
    try {
        await deleteUser(req.params.id);
        res.send({ error: null });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

module.exports = router; 