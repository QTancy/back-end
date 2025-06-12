
import  express  from 'express';
import  cors  from 'cors';
import { router } from './routes/authRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;


const allowedOrigins = [
    'https://qtancy.netlify.app/', // Ganti dengan URL Netlify FRONTEND Anda
    'http://localhost:3000',                 // Untuk pengembangan frontend lokal
    
];


app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
    credentials: true, 
    optionsSuccessStatus: 200 
}));

app.use(express.json());
app.use(router);

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`)
})