import * as React from 'react';

const defaultStyle = {
  flex: '1 0 auto',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#FFF',
  padding: '0 1rem 1rem 1rem',
  overflow: 'auto',
  background: 'white',
};

export default function ContentBox({ children, style }) {
  return (
    <div style={{...defaultStyle, ...style}}>
      {children}
    </div>
  );
}

ContentBox.defaultProps = {
  style: {}
}
