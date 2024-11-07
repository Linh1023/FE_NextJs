'use client'

import React, { useEffect, useState } from 'react';
import Image from 'next/image'
import { Button, Form } from 'react-bootstrap';
import { signIn } from "next-auth/react"
import Alert from 'react-bootstrap/Alert';
import { toast } from 'react-toastify';

const LoginForm = () => {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [validation, setValidation] = useState<boolean>(false)
    const [flag, setFlag] = useState<boolean>(true)

    const handleSubmit = async (event: any) => {
        const form = event.currentTarget;
        const formData = new FormData(form);
        event.preventDefault();
        const data = await signIn("credentials", {
            redirect: false,
            email: formData.get("email"),
            password: formData.get("password"),
        });

        if (data?.error === "Configuration") {
            console.log("Error")
            setFlag(false)
        } else {
            toast.success("Đăng nhập thành công")
            console.log("Success")
            setFlag(true)
            window.location.href = "http://localhost:3000/tour"; // Điều hướng đến URL mới
        }

    };

    const handleEmail = (e: string) => {
        const regex: RegExp = /^(?=.{1,64}@)[A-Za-z0-9_-]+(\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,})$/;
        if (regex.test(e)) {
            setValidation(true)
        } else {
            setValidation(false)
        }
        setEmail(e);
        setFlag(true)
    }



    return (
        <>
            <div className='container-login__div'>
                {/* Background Image */}
                {/* Foreground Form */}
                <Form className="shadow p-4 bg-white rounded container-login__Form" onSubmit={handleSubmit}>
                    <div className="h4 mb-2 text-center">
                        <Image className='user-image__Image'
                            src="/img/user-login.png"
                            alt="Picture of the author"
                            width={70}
                            height={70}
                        />
                    </div>
                    <div className="h4 mb-2 text-center">Sign In</div>

                    {flag == false && (<>
                        <Alert key={"danger"} variant={"danger"}>
                            Sai mật khẩu hoặc tài khoản
                        </Alert>
                    </>)}



                    <Form.Group className="ctn-email__Form-Group" >
                        <Form.Label> <span className='obligatory__Form-Label' >*</span> Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => { handleEmail(e.target.value) }}
                            isValid={validation}
                            isInvalid={email != '' && !validation}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            {"Vui lòng nhập đúng định dạng Email"}
                        </Form.Control.Feedback>
                    </Form.Group>


                    <Form.Group className='mt-4' >
                        <Form.Label><span className='obligatory__Form-Label' >*</span> Password</Form.Label>
                        <Form.Control
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value); setFlag(true) }}
                            required
                        />
                    </Form.Group>
                    <Form.Group className='mt-4 text-center' >
                        <Button variant="primary" className='btn-login__Button'
                            type='submit'
                        >Login</Button>
                    </Form.Group>
                </Form>
            </div>

        </>
    )
}

export default LoginForm