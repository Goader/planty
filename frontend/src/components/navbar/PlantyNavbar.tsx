import React from "react";
import {Button, Container, Navbar, Stack} from "react-bootstrap";

function PlantyNavbar() {
    return (
        <Navbar>
            <Container>
                <Navbar.Brand href="#home">Planty</Navbar.Brand>
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