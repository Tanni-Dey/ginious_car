import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { signOut } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { Link } from 'react-router-dom';

const Header = () => {
    const [user, loading, error] = useAuthState(auth);
    return (
        <>
            {/* <Link to="/">Home</Link>
            <Link to="/about">About</Link> */}
            <Navbar bg="primary" sticky='top' expand="lg" >
                <Container>
                    <Navbar.Brand as={Link} to="/">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                            <Nav.Link href='/home#services'>Service</Nav.Link>
                            <Nav.Link as={Link} to="/about">About</Nav.Link>
                            {
                                user && <>
                                    <Nav.Link as={Link} to="/addservice">Add</Nav.Link>
                                    <Nav.Link as={Link} to="/manage">Manage</Nav.Link>
                                    <Nav.Link as={Link} to="/orders">Orders</Nav.Link>
                                </>
                            }
                            {
                                user ? <Nav.Link onClick={() => signOut(auth)} as={Link} to="/login">Logout</Nav.Link> : <Nav.Link as={Link} to="/login">Login</Nav.Link>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default Header;