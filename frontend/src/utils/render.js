import React from 'react'
import { StyledBadge } from '../styles/TaskCardCover'

export const renderBadges = (array) => (
  <div>
    {array.map((item, i) => (
      <StyledBadge
        key={i} 
        backgroundColor={item.color}
      >
        {item.name}
      </StyledBadge>
    ))}
  </div>
)