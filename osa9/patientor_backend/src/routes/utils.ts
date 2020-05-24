import express from "express";

const utilsRouter = express.Router();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
utilsRouter.get('/', (_req: any, res: { send: (arg0: string) => void; }) => { 
  console.log('someone pinged here');
  res.send('pong');
});

export default utilsRouter;