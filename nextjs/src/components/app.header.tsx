'use client'
import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useSession } from "next-auth/react"
import cookie from "js-cookie";
import { signOut } from "next-auth/react"
import { toast } from 'react-toastify';

function NavBar() {
  const { data: session } = useSession()

  const handleLogout = () => {
    signOut()
    toast.success("Đăng xuất thành công")
  }


  return (
    <Navbar expand="lg" className="bg-body-tertiary container-header__Navbar">
      <Container>
        <Navbar.Brand href="/tour">Tour</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link className='nav-link' href="/tour">Home</Link>
            <Link className='nav-link' href="/blog">Blog</Link>
          </Nav>
          <Nav className="ms-auto">
        
          <Link className="nav-link" href="/contact"> <i className="fa-solid fa-heart"></i></Link>

          {session?.user ? <p className="nav-link" style={{marginBottom:"0px"}}><i className="fa-solid fa-user"  ></i></p> :  
          <Link className="nav-link" href="/login" style={{marginBottom:"0px"}} ><i className="fa-solid fa-user" ></i></Link>}

            <p className="nav-link" style={{marginBottom:"0px"}} > {session?.user ? session.user.email:""}</p>

            {session?.user ?<button className="nav-link"
            onClick={() => handleLogout()}><i className="fa-solid fa-right-from-bracket" ></i></button>:""}
          

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;