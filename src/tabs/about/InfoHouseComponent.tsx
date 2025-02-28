import React from 'react';
import { Button, Card, Empty } from 'antd';
import styled from 'styled-components';

const StyledContainer = styled.div`
  padding: 24px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const StyledTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 16px;
`;

const StyledEmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
`;

const StyledEmptyText = styled.p`
  margin: 12px 0;
  color: #595959;
`;

const StyledButton = styled(Button)`
  background-color: #1890ff;
  color: #fff;
  border: none;
  &:hover {
    background-color: #40a9ff;
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
`;

const TroList: React.FC<{ troList: Array<{ id: number; name: string; address: string; views: number; rooms: number }> }> = ({ troList }) => {
  return (
    <StyledContainer>
      <StyledTitle>DANH SÁCH TRỌ</StyledTitle>
      {troList.length === 0 ? (
        <StyledEmptyContainer>
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Bạn chưa đăng tin trọ nào">
            <StyledEmptyText>Đăng trọ ngay để tiếp cận nhiều khách hàng tiềm năng</StyledEmptyText>
            <StyledButton type="primary">Đăng trọ mới</StyledButton>
          </Empty>
        </StyledEmptyContainer>
      ) : (
        <CardGrid>
          {troList.map((tro) => (
            <Card key={tro.id} title={` ${tro.name}`}>
              <p style={{display: 'flex', justifyContent: 'space-between'}}><strong style={{color: '#18A0FB'}}>Địa chỉ:</strong> {tro.address}</p>
              <p style={{display: 'flex', justifyContent: 'space-between'}}><strong style={{color: '#18A0FB'}}>Số lượt xem:</strong> {tro.views}</p>
              <p style={{display: 'flex', justifyContent: 'space-between'}}><strong style={{color: '#18A0FB'}}>Số phòng:</strong> {tro.rooms}</p>
            </Card>
          ))}
        </CardGrid>
      )}
    </StyledContainer>
  );
};

export default TroList;