import React from 'react'
import styled from 'styled-components'
import { Navbar, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const KanbanNavbar = styled(Navbar)`
  width: 95%;
  margin: auto;
  border-radius: 10px;
  margin-top: 1%;
`

const Header = () => {
  return (
    <KanbanNavbar bg="dark" variant="dark">
      <LinkContainer to="/">
        <Navbar.Brand>Navbar</Navbar.Brand>
      </LinkContainer>
      <Nav className="mr-auto">
        <LinkContainer to="/about">
          <Nav.Link>About this project</Nav.Link>
        </LinkContainer>
      </Nav>
    </KanbanNavbar>
  )
}

export default Header