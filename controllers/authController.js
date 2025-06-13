import { pool } from "../db.js";
import  bcrypt  from 'bcryptjs';
import  jwt  from 'jsonwebtoken';
import  joi  from 'joi';

const registerSchema = joi.object({
    name  : joi.string().min(3).required(),
    email : joi.string().email().required(),
    password : joi.string().min(8).required()
});

// fungsi sign Up
export const signUp = async(req,res) => {
    try {
        const { error } = registerSchema.validate(req.body);
        if ( error ) return res.status(400).json({message : error.details[0].message });

        const { name, email, password } = req.body;

        const existingUser = await pool.query('SELECT * FROM users WHERE email = $1',[email]);
        if(existingUser.rows.length > 0) {
            return res.status(409).json({message : 'Email sudah terdaftar!'});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = await pool.query(
            'INSERT INTO users (name, email, password) VALUES ($1,$2,$3) RETURNING id, email',
            [name,email,hashedPassword]
        );

        return res.status(201).json({message : 'Akun berhasil terdaftar', user : newUser.rows[0]});
    } catch ( error ) { 
        console.log('SignUp error :',error.message);
        res.status(500).send('Server Error');
    }
}

export const signIn = async(req,res) => {
    try { 
        const { email, password } = req.body;

        const userResult = await pool.query('SELECT * FROM users WHERE email = $1',[email]);
        if(userResult.rows.length === 0){
            return res.status(401).json({message : 'Email yang salah!'});
        }

        const user = userResult.rows[0];

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({message : 'Salah Password!'});
        }

        const payload = { user : { id : user.id } };
        const token = jwt.sign(payload,process.env.JWT_SECRET, {expiresIn : '1h'});
        // res.cookie('authToken', token, {
        //     httpOnly: false, 
        //     secure: true, 
        //     sameSite: 'None', 
        //     maxAge: 3600000, 
        //     path: '/' 
        // });

        res.status(200).json({ message: 'Login berhasil!', user: { id: user.id, email: user.email, name: user.name, token:token } });
    } catch ( error ) { 
        console.log('SignIn error:',error.message);
        res.status(500).send('Server Error');
    }
}