import SignUp from "@/components/templates/Registeration";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Register = () => {

  const {status} = useSession()
  const router = useRouter()
   if(status == "authenticated"){
     router.push('/Profile')
   }
    return (
        <div>
      <SignUp/>
        </div>
      
    );
};

export default Register;