import { Request, Response } from "express";
import { IAccount } from "../models/accounts";
import { hashPassword, comparePassword, sign } from "../auth";
import { createAccount, findAll, findByEmail, findById, updateAccount } from "../models/accountRepository";

async function getAccounts(req: Request, res: Response, next: any) {
  const accounts : IAccount[] = await findAll()
  res.json(accounts.map(item => {
    item.password = ''
    return item
  }))
}

async function getAccount(req: Request, res: Response, next: any) {
  try {
    const id = +req.params.id

    if(!id) return res.status(400).end()

    const account = await findById(id)
    
    if (account){
      account.password = ''
      return res.json(account)
    } 
    else
      return res.status(404).json({message: 'Account not found'})

  } catch (error) {
    console.log(error)
    res.status(400).end()
  }
}

async function addAccount(req: Request, res: Response, next: any) {
  try {
    const newAcount: IAccount = req.body as IAccount

    newAcount.password = hashPassword(newAcount.password)
    const result = await createAccount(newAcount)

    newAcount.id = result.id
    newAcount.password = ''
    res.status(201).json(newAcount)
  } catch (error) {
    console.log(error)
    res.status(400).end()
  }
}

async function setAccount(req: Request, res: Response, next: any) {
  try {
    const accountId = +req.params.id
    if(!accountId) return res.status(400).end()

    const accountParams: IAccount = req.body as IAccount
    if(accountParams.password) 
      accountParams.password = hashPassword(accountParams.password)

    const updatedAccount = await updateAccount(accountId, accountParams)

    if(!updatedAccount) return res.status(404).end()

    updatedAccount.password = ''
    res.status(200).json(updatedAccount)
  } catch (error) {
    console.log(error)
    res.status(400).end()
  }
}

async function loginAccount(req: Request, res: Response, next: any){
  try {
    const loginParams = req.body as IAccount;
    const account = await findByEmail(loginParams.email)

    if(!account) return res.status(401).end()
    
    const isValid = comparePassword(loginParams.password, account.password)
    if(!isValid) return res.status(401).end()

    const token = sign(account.id!)
    
    res.json({auth: true, token})
    
  } catch (error) {
    
  }
}

function logout(req: Request, res: Response, next: any){
  res.json({auth: false, token: null})
}

export { getAccounts, getAccount, addAccount, setAccount, loginAccount, logout}