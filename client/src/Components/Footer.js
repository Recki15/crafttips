import React from 'react';
import { MDBFooter, MDBContainer } from 'mdb-react-ui-kit';

export const Footer = () => {
  return (
    <MDBFooter className='footer' style={{ backgroundColor: '#222831' }}>
      <MDBContainer className='p-4'></MDBContainer>

      <div className='text-center p-3' style={{ backgroundColor: 'black' }}>
        © 2023 Copyright:
        <a className='text-white' href='https://mdbootstrap.com/'>
          Crafttips.com
        </a>
      </div>
    </MDBFooter>
  )
}
