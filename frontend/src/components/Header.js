import React from 'react'
import styled from 'styled-components'
import { Navbar, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const KanbanNavbar = styled(Navbar)`
  margin: auto;
  padding-left: 5%;
`

const Header = () => {
  return (
    <KanbanNavbar bg="dark" variant="dark">
      <LinkContainer to="/">
        <Navbar.Brand>Kanban Board</Navbar.Brand>
      </LinkContainer>
      <Nav className="mr-auto">
        <LinkContainer to="/about">
          <Nav.Link>/about</Nav.Link>
        </LinkContainer>
      </Nav>
    </KanbanNavbar>
  )
}

export default Header