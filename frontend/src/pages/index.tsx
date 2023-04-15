import { Button, Form, Container, Row, Col } from 'react-bootstrap'
import Logo from '../assets/logo.png'
import Image from 'next/image'
import { FormEvent } from 'react'
import { BoxContent, BoxForm} from './styles'
import Link from 'next/link'

export default function Signin(){
   async function handleSignin(event: FormEvent){
      event.preventDefault()
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
                     <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Informe seu email" />
                     </Form.Group>
                     <Form.Group controlId="formBasicPassword">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control type="password" placeholder="Informe sua senha" />
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