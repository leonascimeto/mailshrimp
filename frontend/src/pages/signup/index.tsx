import Image from 'next/image'
import {Container, Button, Col, Row, Alert, Form} from 'react-bootstrap'
import Logo from '../../assets/logo.png'
import { BoxContent } from './styles'
import { BoxForm } from '../styles'
import { FormEvent, useEffect, useState } from 'react'

export default function Signup() {
   const [name, setName] = useState('')
   const [email, setEmail] = useState('')
   const [domain, setDomain] = useState('')
   const [password, setPassword] = useState('')
   const [passwordConfirm, setPasswordConfirm] = useState('')
   const [error, setError] = useState('')
   const [isLoading, setIsLoading] = useState(false)

   async function handleSignup(event: FormEvent) {
      event.preventDefault()
      setIsLoading(true)
      if (password !== passwordConfirm) {
         setError('As senhas não conferem')
         return
         
      }

      console.log({name, email, domain, password, passwordConfirm})
      
      setIsLoading(false)
   }

   function renderError() {
      return <Alert variant='danger'>{error}</Alert>
   }

   return (
      <Container>
         <Row className='justify-content-md-center'>
            <Col xs={12} md={8}>
               <BoxContent>
                  <Image src={Logo} alt="Logo" />
               </BoxContent>
               <BoxForm>
                  <h2>Cadastro</h2>
                  <p>Informe seus dados para realizar o cadastro.</p>
                  <Form>
                     {error && renderError()}
                     <Form.Group controlId="formBasicName">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control 
                           type="text" 
                           placeholder="Informe seu nome"
                           onChange={(e) => setName(e.target.value)}  
                        />
                     </Form.Group>
                     <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                           type="email" 
                           placeholder="Informe seu email"
                           onChange={(e) => setEmail(e.target.value)}
                        />
                     </Form.Group>
                     <Form.Group controlId="formBasicDomain">
                        <Form.Label>Domínio</Form.Label>
                        <Form.Control 
                           type="text" 
                           placeholder="Informe seu domínio"
                           onChange={(e) => setDomain(e.target.value)}
                        />
                     </Form.Group>
                     <Form.Group controlId="formBasicPassword">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control 
                           type="password" 
                           placeholder="Informe sua senha"
                           onChange={(e) => setPassword(e.target.value)} 
                        />
                     </Form.Group>
                     <Form.Group controlId="formBasicPasswordConfirm">
                        <Form.Label>Confirme sua senha</Form.Label>
                        <Form.Control 
                           type="password" 
                           placeholder="Confirme sua senha"
                           onChange={(e) => setPasswordConfirm(e.target.value)} 
                        />
                     </Form.Group>
                     <Button className='w-100 mt-2' variant="primary" onClick={handleSignup}>
                        Cadastrar
                     </Button>
                  </Form>
               </BoxForm>
            </Col>
         </Row>
      </Container>
   )
}