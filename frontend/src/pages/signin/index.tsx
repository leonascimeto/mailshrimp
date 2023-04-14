import { Button, Form, Container, Row, Col } from 'react-bootstrap'
import Logo from '../../assets/logo.png'
import Image from 'next/image'
export default function Signin(){
   return (
      <Container>
         <Row>
            <Col>
               <div>
                  <Image src={Logo} alt="Logo" />
               </div>
               <h2>Login</h2>
               <p>Informe seu dados para autenticar:</p>
            </Col>
         </Row>
      </Container>
   )
}