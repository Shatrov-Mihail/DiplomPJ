import { Link } from 'react-router-dom';
import logo from "../../../images/logo-belka.png";
import styled from 'styled-components';


const LargeText = styled.div`
	font-size: 48px;
  font-weight: bold;
`;

const SmallText = styled.div`
	  font-size: 30px;
  font-weight: bold;
`;

const LogoContainer = ({ className }) => (
	<Link className={className} to="/" title="На главную" alt="logo">
		<img src={logo} alt="logo" />
		<div>
		<LargeText className={className}>Creative Shop</LargeText>
		<SmallText className={className}>Кожаные изделия</SmallText>
		</div>
	</Link>
);

export const Logo = styled(LogoContainer)`
	display: flex;


	  img {
    width: 100px;
    height: 100px;
    margin: 14px;
	pointer-events: none
  }
`;
