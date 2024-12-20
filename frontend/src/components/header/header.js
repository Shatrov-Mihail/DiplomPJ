import { ControlPanel, Logo } from "./components";
import BGHeader from "../images/doski-title.jpg";
import styled from "styled-components";

const Description = styled.div`
  font-style: italic;
  font-size: 26px;
  user-select: none;
`;

const HeaderContainer = ({ className }) => (
  <header className={className}>
    <Logo />
    <Description>
     Готовая продукция,
      <br />
      только из натуральной кожи!
    </Description>
    <ControlPanel />
  </header>
);

export const Header = styled(HeaderContainer)`
display: flex;
justify-content: space-between;
align-items: center;
top: 0;
height: 120px;
user-select: none;
padding: 20 40px;
box-shadow: 0px 2px 7px black;
background-image: url(${BGHeader})});
`;
