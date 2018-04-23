import React from 'react';
import { Navbar, NavItem, Nav, Grid, Row, Col } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

// hacky footer solution, last minute

class Footer extends React.Component {
    render(){
        return (
            <Navbar fixedBottom>
                <Nav style={{paddingLeft:"38em"}}>
                    <NavItem>Made with <FontAwesome name="coffee" size="lg"/></NavItem>
                </Nav>
            </Navbar>
        )
    }
}
export default Footer;
