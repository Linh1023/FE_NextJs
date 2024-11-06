
import LoginForm from "@/components/login/login"
import { SessionProvider } from "next-auth/react"
import "@/styles/login.css"
// import { signIn } from "@/auth"
const LoginPage = () => {

    return (
        <>
            <SessionProvider>
            <LoginForm />
            </SessionProvider>
         
        </>
    )
}

export default LoginPage