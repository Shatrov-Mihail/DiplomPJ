
import styled from "styled-components";
import BGHeader from "..//images/doski-title.jpg";

const FooterContainer = ({ className }) => {

  return (
    <div className={className}>
      <div>
        <div>Creative Shop</div>
        <div>web@developer.ru</div>
      </div>
      <div>
        <div>
          {new Date().toLocaleString("ru", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </div>
      </div>
    </div>
  );
};

export const Footer = styled(FooterContainer)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  font-weight: bold;
  height: 60px;
  padding: 20 40px;
  border-radius: 3px;
  box-shadow: 0px 3px 7px black;
  background-size: cover;
  background-image: url(${BGHeader})});
`;
