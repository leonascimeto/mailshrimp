import { Response } from "express";
import { Token } from "../auth";

function getToken(res: Response) {
  const payload = res.locals.payload as Token;

  if(!payload || !payload.accountID) return res.status(401).end()
  return payload;
}

export default { getToken };