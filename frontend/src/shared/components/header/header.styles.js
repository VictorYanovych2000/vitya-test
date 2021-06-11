import styled from 'styled-components';
import {Link} from 'react-router-dom';

export const Header = styled.header`
  height: 80px;
  background: #f7f7fc;
  box-shadow: 0 8px 16px 0 #1111110a;

  & > div {
    height: 100%;
  }
`;


export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;

  nav {
    margin-left: auto;

    ul {
      display: flex;

      li {
        margin-left: 50px;
      }
    }

    & ~ div {
      margin-left: 100px;
    }
  }
`;

export const StyledLink = styled(Link)` && {
  font-size: 18px;
  line-height: 27px;
  letter-spacing: 0.75px;
  color: #4E4B66;
  text-decoration: none;
  
  &:hover {
    color: #14142B;
  }
}`

export const Avatar = styled.div`
  display: flex;
  align-items: center;

  & > div {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 15px;
    border: ${props =>
            props.role === 'admin' ? '1.5px solid #00ba88' : '1.5px solid #ccc'};

    img {
      display: block;
      width: 100%;
      max-width: 100%;
    }
  }

  & > span {
    font-weight: 600;
    font-size: 18px;
  }
`;
