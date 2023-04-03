import { Request, Response } from "express";
import { IAccount } from "../models/accounts";
import {AccountModel, findAll, findById, createAccount, updateAccount, findByEmail} from '../models/accountModel'
import { hashPassword, comparePassword, sign } from "../auth";

async function getAccounts(req: Request, res: Response, next: any) {
  const accounts = await findAll()
  res.json(accounts.map(item => {
    item.password = ''
    return item
  }))
}

async function getAccount(req: Request, res: Response, next: any) {
  try {
    const id = +req.params.id

    if(!id) throw new Error('Invalid ID')

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
    if(!accountId) throw new Error('Invalid ID')
    const accountParams: IAccount = req.body as IAccount
    const updatedAccount = await updateAccount(accountId, accountParams)
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