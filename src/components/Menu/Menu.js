import React,{useLayoutEffect } from 'react';
import { bool } from 'prop-types';
import { StyledMenu } from './Menu.styled';
import { Link } from 'gatsby'

const Menu = ({ open, ...props }) => {
  
  const isHidden = open ? true : false;
  const tabIndex = isHidden ? 0 : -1;
  useLockBodyScroll();

  return (
    <StyledMenu open={open} aria-hidden={!isHidden} {...props}>
      <Link to="/" tabIndex={tabIndex}>
      <span aria-hidden="true">🏠</span>
        Home
      </Link>
      <Link to="/contact" tabIndex={tabIndex}>
      <span aria-hidden="true">📩</span>
        Contact
      </Link>
    </StyledMenu>
  )
}

function useLockBodyScroll() {

  useLayoutEffect(() => {

   // Get original body overflow

   const originalStyle = window.getComputedStyle(document.body).overflow;  

   // Prevent scrolling on mount

   document.body.style.overflow = 'hidden';

   // Re-enable scrolling when component unmounts

   return () => document.body.style.overflow = originalStyle;

   }, []); // Empty array ensures effect is only run on mount and unmount

}

Menu.propTypes = {
  open: bool.isRequired,
}

export default Menu;