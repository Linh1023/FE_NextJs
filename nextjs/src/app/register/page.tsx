import Register from "@/components/register/register"
import "@/styles/login.css"
import { auth } from "@/auth"
import { redirect } from 'next/navigation'
const RegisterPage = async () => {
    const session = await auth()
    if (session?.user) return (
        redirect('/tour')
    )
    return (<>
       <Register/>
    
    </>)
}

export default RegisterPage