import React from "react";
import {Button, Container, Navbar, Stack} from "react-bootstrap";
import './PlantyNavbar.css';
import cx from 'classnames';

function PlantyNavbar() {
    return (
        <Navbar className={cx('PlantyNavbar', 'mb-3', 'shadow-sm')}>
            <Container>
                <Navbar.Brand className={'PlantyNavbar-Brand'} href="#home">Planty</Navbar.Brand>
                <Navbar.Toggle/>
                {/* uncomment and link to login/register when it's done */}
                {/*<Navbar.Collapse className="justify-content-end">
                    <Stack direction={'horizontal'} gap={2}>
                        <Button variant={'outline-primary'}>Log in</Button>
                        <Button variant={'primary'}>Sign in</Button>
                    </Stack>
                </Navbar.Collapse>*/}
            </Container>
        </Navbar>
    );
}

export default PlantyNavbar;