import React from "react";
import {Alignment, Button, Navbar} from "@blueprintjs/core";

function PlantyNavbar() {
    return (
        <Navbar>
            <Navbar.Group align={Alignment.LEFT}>
                <Navbar.Heading>Planty</Navbar.Heading>
                <Navbar.Divider/>
                <Button className="bp4-minimal" text="Sign in"/>
                <Button className="bp4-minimal" text="Sign out"/>
            </Navbar.Group>
        </Navbar>
        /*<header>
            <div className={"plantyNavbar"}>
                <a>PLANTY</a>
            </div>
            <div className={"singButton secBut"}>Sing in</div>
            <div className={"singButton fisBut"}>Sing up</div>



            <div className={"ghost"}/>
        </header>*/
    )
}

export default PlantyNavbar;