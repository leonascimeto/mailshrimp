import { useRouter } from "next/router";

export default function Contact() {
   const router = useRouter();
   const { id } = router.query;
   return (
      <div>
         <h1>Contact</h1>
         <h2>id: {id}</h2>
      </div>
   );
}
