import { Request, Response } from "express";
import { IAccount } from "../models/accounts";

const accounts: IAccount[] = []

function getAccounts(req: Request, res: Response, next: any) {
  res.json(accounts)
}

function getAccount(req: Request, res: Response, next: any) {
  try {
    const id = +req.params.id

    if(!id) throw new Error('Invalid ID')

    const account = accounts.find(account => account.id === id)
    
    if (account) 
      return res.json(account)
    else
      return res.status(404).json({message: 'Account not found'})

  } catch (error) {
    console.log(error)
    res.status(400).end()
  }
}

function addAccount(req: Request, res: Response, next: any) {
  try {
    const newAcount: IAccount = req.body as IAccount
    accounts.push(newAcount)
    res.status(201).json(newAcount)
    
  } catch (error) {
    console.log(error)
    res.status(400).end()
  }
}

function setAccount(req: Request, res: Response, next: any) {
  try {
    const accountId = +req.params.id
    if(!accountId) throw new Error('Invalid ID')


    const accountParams: IAccount = req.body as IAccount

    const index = accounts.findIndex(account => account.id === accountId)

    if (index === -1) return res.status(404).end()

    const selectedAccount = accounts[index]

    if(accountParams.name) selectedAccount.name = accountParams.name
    if(accountParams.password) selectedAccount.password = accountParams.password

    accounts[index] = selectedAccount

    res.status(200).json(selectedAccount)

  } catch (error) {
    console.log(error)
    res.status(400).end()
  }
}

function loginAccount(req: Request, res: Response, next: any){
  try {
    const loginParams = req.body as IAccount;
  
    const index = accounts.findIndex(
      account => account.email === loginParams.email && 
      account.password === loginParams.password
    )
  
    if (index === -1) return res.status(401).end()

    res.json({auth: true, token: {}})
    
  } catch (error) {
    
  }
}

function logout(req: Request, res: Response, next: any){
  res.json({auth: false, token: null})
}

export { getAccounts, getAccount, addAccount, setAccount, loginAccount, logout}