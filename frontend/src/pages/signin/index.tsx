import { Button, Form, Container, Row, Col, Alert } from 'react-bootstrap'
import Logo from '../../assets/logo.png'
import Image from 'next/image'
import { FormEvent, useState } from 'react'
import { BoxContent, BoxForm} from './styles'
import Link from 'next/link'
import api from '@/services/api'
import { login } from '@/services/auth'
import { useRouter } from 'next/router'

export default function Signin(){
   const router = useRouter();
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [error, setError] = useState('')
   const [isLoading, setIsLoading] = useState(false)


   async function handleSignin(event: FormEvent){
      event.preventDefault()

      if(!email || !password) {
         setError('Preencha todos os campos')
         return
      }

      try {
         const response = await api.post('accounts/login', {
            email, password
         })
         login(response.data.token)
         setError('')
         router.push('/contacts')
      } catch (error) {
         console.log(error)
         setError('Erro ao realizar login')
      }

   }

   function renderError() {
      return <Alert variant='danger'>{error}</Alert>
   }

   return (
      <Container>
         <Row className='justify-content-md-center'>
            <Col xs={12} md={6}>
               <BoxContent>
                  <Image src={Logo} alt="Logo" />
               </BoxContent>
               <BoxForm>
                  <h2>Login</h2>
                  <p>Informe seu dados para autenticar</p>
                  <Form onSubmit={handleSignin}>
                     {error && renderError()}
                     <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                           type="email" 
                           placeholder="Informe seu email"
                           onChange={e => setEmail(e.target.value)}    
                        />
                     </Form.Group>
                     <Form.Group controlId="formBasicPassword">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control 
                           type="password" 
                           placeholder="Informe sua senha"
                           onChange={e => setPassword(e.target.value)}   
                        />
                     </Form.Group>
                     <Button className='w-100 mt-2' variant="secondary" type="submit">
                        Fazer Login
                     </Button>
                  </Form>
               </BoxForm>
               <BoxContent>
                  <p>Novo na plataforma?</p>
                  <Link href='/signup'>Crie sua conta agora</Link>
               </BoxContent>
            </Col>
         </Row>
      </Container>
   )
}