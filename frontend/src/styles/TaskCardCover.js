import styled from 'styled-components'
import { Badge, Card } from 'react-bootstrap'

export const StyledBadge = styled(Badge)`
  background-color: ${props => props.backgroundColor || '#36454f'};
  color: white;
  font-size: .85em;
  font-weight: normal;
  margin: 1px;
  display: inline-block;
`

export const CardTitle = styled(Card.Title)`
  font-size: 1em;
  display: flex;
  justify-content: space-between;
`
