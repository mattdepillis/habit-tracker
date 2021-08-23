import React from 'react'
import styled from 'styled-components'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const StyledContainer = styled(Container)`
  background-color: white;
  margin: auto;
  margin-top: 10px;
  border-bottom: 3px solid #343a40;
`

const BoardContainer = () => {
  return (
    <StyledContainer fluid>
      <Row>
        <Col>Ready</Col>
        <Col>In Progress</Col>
        <Col>Done</Col>
      </Row>
      {}
    </StyledContainer>
  )
}

export default BoardContainer