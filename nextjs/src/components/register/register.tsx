"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image'
import { Button, Form } from 'react-bootstrap';
import { signIn } from "next-auth/react"
import Alert from 'react-bootstrap/Alert';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { fetchGetAccounts } from '@/services/apiServiceServer';
import { fetchPostAccount, fetchPostCart } from '@/services/apiServiceClient';
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
const Register = () => {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [rePassword, setRePassword] = useState<string>("")
    const [validation, setValidation] = useState<boolean[]>([false, false])
    const [valRePassword, setValRePassword] = useState<boolean>(true)
    const router = useRouter()

    const handleEmail = (e: string) => {
        const regex: RegExp = /^(?=.{1,64}@)[A-Za-z0-9_-]+(\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,})$/;
        if (regex.test(e)) {
            validation[0] = true
        } else {
            validation[0] = false
        }
        setEmail(e);
    }

    const handlePassword = (e: string) => {
        const regex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,20}$/;
        if (regex.test(e)) {
            validation[1] = true
        } else {
            validation[1] = false
        }
        setPassword(e);
    }

    const handleRegister = async () => {

        let flag: boolean = false
        if (password !== rePassword) {
            flag = false

        } else {
            flag = true
        }
        setValRePassword(flag)

        if (!validation.some(v => v === false) && flag === true) {
            const accountExists: User[] = await fetchGetAccounts()
            console.log(accountExists)
            const check = accountExists.find(a => a.email === email);
            console.log("check >>> ", check)
            if (check) {
                toast.error("Email đã tồn tại")
            } else {

                const cartNew:CartResponse = {
                    id:email,
                    item:[]
                }
                const resCart: UserLogin = await fetchPostCart(cartNew)

                const userNew: UserLogin = {
                    email: email,
                    password: password
                }
                const resUser: UserLogin = await fetchPostAccount(userNew)
                toast.success("Đăng ký thành công")
                router.push(`/login`)

            }
        }






    }






    return (
        <>
            {console.log(validation[2])}
            <div className='container-login__div'>
                {/* Background Image */}
                {/* Foreground Form */}
                <Form className="shadow p-4 bg-white rounded container-login__Form">
                    <div className="h4 mb-2 text-center">
                        <Image className='user-image__Image'
                            src="/img/user-login.png"
                            alt="Picture of the author"
                            width={70}
                            height={70}
                        />
                    </div>
                    <div className="h4 mb-2 text-center">Register</div>

                    <Form.Group className="ctn-item-register__Form-Group" >
                        <Form.Label> <span className='obligatory__Form-Label' >*</span> Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => { handleEmail(e.target.value) }}
                            isValid={validation[0]}
                            isInvalid={email != '' && !validation[0]}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            {"Vui lòng nhập đúng định dạng Email"}
                        </Form.Control.Feedback>
                    </Form.Group>


                    <Form.Group className='mt-4 ctn-item-register__Form-Group' >
                        <Form.Label><span className='obligatory__Form-Label' >*</span> Password</Form.Label>
                        <Form.Control
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => { handlePassword(e.target.value) }}
                            isValid={validation[1]}
                            isInvalid={password != '' && !validation[1]}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            {"Mật khẩu từ 8 đến 20 ký tự, chứa ít nhất một số, chữ thường, hoa,ký tự đặc biệt"}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className='mt-4 ctn-item-register__Form-Group' >
                        <Form.Label><span className='obligatory__Form-Label' >*</span> RePassword</Form.Label>
                        <Form.Control
                            name="rePassword"
                            type="password"
                            placeholder="RePassword"
                            value={rePassword}
                            onChange={(e) => { setRePassword(e.target.value); setValRePassword(true) }}
                            isInvalid={!valRePassword}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            {"Mật khẩu không khớp"}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className='mt-4 text-center' >
                        <Button variant="primary" className='btn-login__Button'
                            type='button'
                            onClick={() => { handleRegister() }}
                        >Register</Button>
                    </Form.Group>

                    <Form.Group className='mt-4 text-center' >
                        <Button variant="primary" className='btn-login__Button' >
                            <Link href={"/login"} type='button' className='btn-login__Button'>Login</Link>
                        </Button>
                    </Form.Group>
                </Form>
            </div>

        </>
    )
}

export default Register