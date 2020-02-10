import React from 'react';
import styled from 'styled-components';

const Style = styled.div`
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Spinner = () => (
  <Style>
    <div className="spinner-border text-danger" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </Style>
)

export default Spinner;

