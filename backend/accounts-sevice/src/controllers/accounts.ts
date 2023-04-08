import { Request, Response } from "express";
import { IAccount } from "../models/accounts";
import { hashPassword, comparePassword, sign } from "../auth";
import repository from "../models/accountRepository";

async function getAccounts(req: Request, res: Response, next: any) {
  const accounts : IAccount[] = await repository.findAll()
  res.json(accounts.map(item => {
    item.password = ''
    return item
  }))
}

async function getAccount(req: Request, res: Response, next: any) {
  try {
    const accountId = +req.params.id
    const account = await repository.findById(accountId)
    if(!account) return res.status(404).end()

    account.password = ''
    return res.json(account)
  } catch (error) {
    console.log(error)
    res.status(400).end()
  }
}

async function addAccount(req: Request, res: Response, next: any) {
  try {
    const newAcount: IAccount = req.body as IAccount

    newAcount.password = hashPassword(newAcount.password)
    const result = await repository.createAccount(newAcount)

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
    const accountParams: IAccount = req.body as IAccount
    if(accountParams.password) accountParams.password = hashPassword(accountParams.password)

    const updatedAccount = await repository.updateAccount(accountId, accountParams)
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
    const account = await repository.findByEmail(loginParams.email)
    if(!account) return res.status(401).end()

    const isValid = comparePassword(loginParams.password, account.password)
    if(!isValid) return res.status(401).end()

    const token = sign(account.id!)
    res.json({auth: true, token})
  } catch (error) {
    console.log(`loginAccount: ${error}`)
    res.status(400).end()
  }
}

function logout(req: Request, res: Response, next: any){
  res.json({auth: false, token: null})
}

async function deleteAccounts(req: Request, res: Response, next: any) {
  try {
    const accountId = +req.params.id
    await repository.deleteAccount(accountId)
    res.status(200).end()
  } catch (error) {
    console.log(`logoutAccount: ${error}`)
    res.status(400).end()
  }  
}

export default { getAccounts, getAccount, addAccount, setAccount, loginAccount, logout, deleteAccounts}