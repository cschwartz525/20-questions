import express, { Request, Response } from 'express';

const app = express();

const { PORT = 3000 } = process.env;

app.use(express.static('build'));

app.get('/hello', (req: Request, res: Response) => {
    res.send({ message: 'hello world' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});