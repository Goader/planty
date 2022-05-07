import React from "react";
import {Button, Container, Navbar, Stack} from "react-bootstrap";
import './PlantyNavbar.scss';
import cx from 'classnames';
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../AuthContext";

function PlantyNavbar() {
    const {user, logout} = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <Navbar className={cx('PlantyNavbar', 'mb-3', 'shadow-sm')}>
            <Container>
                <Navbar.Brand className={'PlantyNavbar-Brand'} href="#home">Planty</Navbar.Brand>
                <Navbar.Toggle/>
                <Navbar.Collapse className="justify-content-end">
                    <Stack direction={'horizontal'} gap={3}>
                        {user != null ? <>
                                <Navbar.Text>Logged in as {user.username}</Navbar.Text>
                                <Button variant={'outline-primary'} onClick={handleLogout}>Logout</Button>
                            </>
                            : <>
                                <Link to={'/login'}><Button variant={'outline-primary'}>Log in</Button></Link>
                                <Link to={'/register'}><Button variant={'primary'}>Sign up</Button></Link>
                            </>}
                    </Stack>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default PlantyNavbar;