import express  from 'express';
import { Router } from 'express';


const router = new (Router as any)()


router.get('/', (req: express.Request, res: express.Response) => {
    res.status(200).json("From router")
})

export default router