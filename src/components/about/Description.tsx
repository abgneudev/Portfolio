import React from 'react'

const Description: React.FC<{ text?: string }> = ({ text }) => {
  return (
    <div>
      <p style={{ margin: 0 }}>{text ?? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}</p>
    </div>
  )
}

export default Description
