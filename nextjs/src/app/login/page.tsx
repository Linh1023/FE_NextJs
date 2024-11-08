
import LoginForm from "@/components/login/login"
import "@/styles/login.css"
import { auth } from "@/auth"
import { redirect } from 'next/navigation'
const LoginPage = async () => { 

    const session = await auth()
    if (session?.user) return (
        redirect('/tour')
    )


    return (
        <>

            <LoginForm />

          
        </>
    )
}

export default LoginPage