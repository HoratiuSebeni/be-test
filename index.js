const express = require('express');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const authenticate = require('./authenticate');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const prisma = new PrismaClient();

// Creates user with name & email
app.post('/users', async (req, res) => {
    const { name, email } = req.body;
    try {
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
            },
        });
        res.json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create user.' });
    }
});

// Returns JWT for user __id__
app.post('/users/login/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await prisma.user.findUnique({ where: { id: parseInt(id) } });
        if (!user) {
            res.status(404).json({ message: 'User not found.' });
        } else {
            const token = jwt.sign({ userId: user.id }, 'secret-key');
            await prisma.user.update({
                where: { id: parseInt(id) },
                data: { jwt: token },
            });
            res.json({ token });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to log in user.' });
    }
});

// Gets all users
// Returns also the company data linked to the user
// To increase the security JWT is not returned
app.get('/users', authenticate, async (_, res) => {
    try {
        const allUsers = await prisma.user.findMany({
            include: {
                companies: true,
            },
        });
        for (user of allUsers) {
            delete user['jwt'];
          }
        res.json(allUsers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve users.' });
    }
});

// Invalidate JWT
// JWT is invalidated when it is deleted from the database
app.post('/users/invalidateToken/:id', authenticate, async (req, res) => {
    const { id } = req.params;
    try { 
        await prisma.user.update({
            where: { id : parseInt(id) },
            data: { jwt: null },
        });
        res.json({ message: 'The user token has been invalidated.' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to invalidate user token.' });
    }
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
