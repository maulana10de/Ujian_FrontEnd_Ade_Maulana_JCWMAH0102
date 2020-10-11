import React from 'react';
import { Navbar } from 'reactstrap';

function Footer(props) {
  return (
    <>
      <hr />
      <Navbar
        className='d-flex fle-row justify-content-end align-items-center'
        style={{ backgroundColor: '#363738' }}>
        <h4 style={{ fontSize: '12px', color: '#c8c8cc', paddingTop: '10px' }}>
          @ 2020 adisport Indonesia
        </h4>
      </Navbar>
    </>
  );
}

export default Footer;
