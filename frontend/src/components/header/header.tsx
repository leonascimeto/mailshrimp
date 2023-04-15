import Link from "next/link";

export default function Header() {
   return (
      <header>    
         <section>
            <div>
               <h1>Logo</h1>
            </div>
            <nav>
               <ul>
                  <li>
                     <Link href="/contacts">Contatos</Link>
                  </li>
                  <li>
                     <Link href="/messages">Mensagens</Link>
                  </li>
                  <li>
                     <Link href="/">Sair</Link>
                  </li>
               </ul>
            </nav>
         </section>  
      </header>
   )
}