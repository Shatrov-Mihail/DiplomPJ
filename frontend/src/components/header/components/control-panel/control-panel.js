import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Icon } from "../../../../components";
import { ROLE } from "../../../../constants";
import { selectUserLogin, selectUserRole } from "../../../../selectors";
import { logout } from "../../../../actions";
import { checkAccess } from "../../../../utils";
import styled from "styled-components";

const RightAligned = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;



const UserName = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const ControlPanelContainer = ({ className }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const roleId = useSelector(selectUserRole);
  const login = useSelector(selectUserLogin);

  const onLogout = () => {
    dispatch(logout());
    sessionStorage.removeItem("userData");
  };

  const isAdmin = checkAccess([ROLE.ADMIN], roleId);

  return (
    <div className={className}>
      <RightAligned>
        {roleId === ROLE.GUEST ? (
          <Button>
            <Link to="/login">Войти</Link>
          </Button>
        ) : (
          <>
            <UserName>{login}</UserName>
            <Icon id="fa fa-user-times" margin="0 0 0 10px" onClick={onLogout} title="Выход" alt="X" size="24px" />
			<Link to="/shoppingCart">
              <Icon id="fa-shopping-cart" margin="0 0 0 10px" title="Пользователи" alt="Пользователи" size="38px" />
            </Link>
          </>
        )}
      </RightAligned>
      <RightAligned>
        <Icon
          id="fa fa-reply"
          margin="10px 0 0 0"
          onClick={() => navigate(-1)}
		  title="Назад" alt="Стрелка назад"
		  size="28px"
        />
        {isAdmin && (
          <>
            <Link to="/post">
              <Icon id="fa-newspaper-o " margin="10px 0 0 16px" title="Добавить статью" alt="Статья" size="28px"/>
            </Link>
            <Link to="/users">
              <Icon id="fa-users" margin="10px 0 0 16px" title="Пользователи" alt="Пользователи" size="28px"/>
            </Link>
          </>
        )}
      </RightAligned>

    </div>
  );
};

export const ControlPanel = styled(ControlPanelContainer)`
margin: 0 14px
`;
