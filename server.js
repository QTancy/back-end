import 'dotenv/config'
import  express  from 'express';
import  cors  from 'cors';
import { router } from './routes/authRoutes.js';

const app = express();
const PORT = 3000;


app.use(cors());
app.use(express.json());

app.use(router);

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`)
})