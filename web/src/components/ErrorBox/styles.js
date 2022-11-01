import styled from 'styled-components';

export const Container = styled.div`
  height: 42px;
  line-height: 42px;
  padding: 0 20px;
  color: rgba(0, 0, 0, 0.6);
  background-color: #F55A5A;
  margin: 20px 0 10px;
  font-size: 13px;
  border-radius: 3px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  p {
    color: #FFF;
  }

  button{
    border: 0;
    background-color: transparent;
    img {
      height: 14px;
    }
  }
`;
