import styled from 'styled-components';

const LoaderContainer = ({ className }) => (
  <div className={className}>
    <div className="loader"></div>
  </div>
);

export const Loader = styled(LoaderContainer)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;

  .loader {
    width: 50px;
    height: 50px;
    border: 5px solid #fff;
    border-top: 5px solid #000;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
