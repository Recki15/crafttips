import React from 'react';
import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBIcon,
  MDBBtn
} from 'mdb-react-ui-kit';

export function Footer() {
  return (
    <MDBFooter className='footer--pin' style={{ backgroundColor: '#393E46', color: '#00ADB5' }}>
      <MDBContainer className='pt-4'>
        <section data-testid='test2' className='mb-4'>
          <MDBBtn
            rippleColor="dark"
            color='link'
            floating
            size="sm"
            className=' m-1'
            href='https://www.facebook.com/adam.badari'
            role='button'
            noRipple='true'
          >
            <MDBIcon fab className='fab fa-facebook-f' />
          </MDBBtn>

          <MDBBtn
            rippleColor="dark"
            color='link'
            floating
            size="sm"
            className=' m-1'
            href='https://l.facebook.com/l.php?u=https%3A%2F%2Finstagram.com%2Fadambadari%3Figshid%3DMGNiNDI5ZTU%253D%26fbclid%3DIwAR1Uj8-EIdpmtbV_kxKu1Az42G5O76ClLpxao1dOUfRoQv_-PCqR6yA2ZEk&h=AT2Dzshsw4VFmQTLW-LKEAAVYrkxshJ1mG-LBNdY0GxegKwWrsX149VifoYZcENRWWWEG0CGTWYvYBkPY-AxxllPYr0fZ_u_N7ZuKCIrVJqxsp-FAwmE0IR9Unp0U7EgO3GKOQ'
            role='button'
            noRipple='true'
          >
            <MDBIcon fab className='fa-instagram' />
          </MDBBtn>

          <MDBBtn
            rippleColor="dark"
            color='link'
            floating
            size="sm"
            className=' m-1'
            href='https://www.linkedin.com/in/%C3%A1d%C3%A1m-badari-711638263'
            role='button'
            noRipple='true'
          >
            <MDBIcon fab className='fa-linkedin' />
          </MDBBtn>

          <MDBBtn
            rippleColor="dark"
            color='link'
            floating
            size="sm"
            className='m-1'
            href='https://github.com/Recki15/crafttips'
            role='button'
            noRipple='true'
          >
            <MDBIcon fab className='fa-github' />
          </MDBBtn>
        </section>
      </MDBContainer>

      <div data-testid='test1' className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', color: '#00ADB5' }}>
        © 2023 Copyright:
          Crafttips
        
      </div>
    </MDBFooter>
  );
}