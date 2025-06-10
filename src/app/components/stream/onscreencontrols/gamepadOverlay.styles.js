import { styled } from "styled-components";

const ButtonClass = styled.button`
  border-radius: 50%;
  opacity: 50%;
  position: absolute;
  color: black;
  transform: translate(-50%, -50%);
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`

export const Button = styled(ButtonClass)`
  ${props => props.disableAnimation ? `transition: none;-o-transition: none;-moz-transition: none;-webkit-transition: none;` : null}
  ${props => props.left? `left: ${props.left};`:null}
  ${props => props.right? `right: ${props.right};`:null}
  ${props => props.top? `top: ${props.top};`:null}
  ${props => props.bottom? `bottom: ${props.bottom};`:null}
  ${props => props.color? `color: white;`:null}
  ${props => props.height? `height: ${props.height}px;`:`height: 10%;`}
  ${props => props.width? `width: ${props.width}px;`:`width: 5%;`}
  ${props => props.backgroundcolor? `background-color: ${props.backgroundcolor};`:`background-color: grey;`}
`;

export const JoystickDiv = styled.div`
  position: absolute;
  height: 25%;
  width: 12%;
  opacity: 50%;
  transform: translate(-50%, -50%);
  ${props => props.left? `left: ${props.left};`:null}
  ${props => props.right? `right: ${props.right};`:null}
  ${props => props.top? `top: ${props.top};`:null}
  ${props => props.bottom? `bottom: ${props.bottom};`:null}
`