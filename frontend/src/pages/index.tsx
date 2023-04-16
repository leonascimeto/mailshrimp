import { getToken } from "@/services/auth";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

export default function Index() {
   const [isLoading, setIsLoading] = useState(true);
   const router = useRouter();
   const handleRedirect = useCallback(() => {
      setIsLoading(true)
      const urlRedirect = getToken() ? '/contacts' : '/signin'
      router.push(urlRedirect)
      setIsLoading(false)
   },[router])

   useEffect(() => {
      handleRedirect()
   }, [handleRedirect])

   return (
      <>
         {
            isLoading ? 
            <h1>Carregando...</h1> 
            : 
            <div>
               <h1>Index</h1>
            </div>
         }
      </>
   );
}