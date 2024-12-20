import PropTypes from "prop-types";
import styled from "styled-components";

const ButtonContainer = ({ children, className, width, ...props }) => {
  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
};

export const Button = styled(ButtonContainer)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  width: ${({ width = "100%" }) => width};
  height: 32px;
  border: none;
  border-radius: 10px;
  text-decoration: none;
  color: black;
  background: transparent;
  user-select: none;

  &:hover {
    cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
    text-shadow: ${({ disabled }) =>
      disabled ? "default" : "-1px 0px 0px #727272"};
    position: relative;
    top: ${({ disabled }) => (disabled ? "default" : "1px")};;
  }
`;

Button.propTypes = {
  children: PropTypes.node.isRequired,
  width: PropTypes.string,
};
