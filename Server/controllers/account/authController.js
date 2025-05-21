const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../user/user');

// Función de login
const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Encuentra el usuario por username
        const user = await User.findOne({ username, deleted: false }).populate({
            path: 'roles'
        });
        
        if (!user) {
            return res.status(401).json({ error: 'Authentication failed, invalid username' });
        }
        
        // Compara la contraseña proporcionada con la almacenada en la BD
        const passwordMatch = await bcrypt.compare(password, user.password);
        
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Authentication failed, password does not match' });
        }
        
        // Crea un token JWT
        const token = jwt.sign({ userId: user._id }, 'secret_key', { expiresIn: '1d' });
        
        res.status(200).setHeader('Authorization', `Bearer${token}`).json({ token: token, user });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
};

module.exports = { login };