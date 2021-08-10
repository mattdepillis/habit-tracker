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
// const Header = styled.h1`
//   color: #343a40;
//   margin: 0 auto;
// `

const ready = ['ready1', 'ready2', 'ready3']
const inprogress = ['inprogress1', 'inprogress2', 'inprogress3', 'inprogress4']
const done = ['done1', 'done2', 'done3']

const arr = [ ready, inprogress, done ]

const BoardContainer = () => {
  arr.reduce((arr1, arr2) => {
    const arr1Length = typeof arr1 === 'number' ? arr1 : arr1.length
    return arr1Length > arr2.length ? arr1Length : arr2.length
  }, 0)

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