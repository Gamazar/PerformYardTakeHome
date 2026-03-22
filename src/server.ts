import express, {Application} from "express";
import artistRouter from './router/artistRouter';
const app: Application = express();
app.use(express.json());

app.use('/', artistRouter)
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`People Search API running on http://localhost:${PORT}`);
})