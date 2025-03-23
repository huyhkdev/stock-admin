import { Modal } from "antd";
import styled from "styled-components";

const StyledCustomModal = styled.div`
.custom-modal-title {
    background: white;
    padding: 16px;
    border-bottom: 1px solid #f0f0f0;
}
    
`;
interface CustomModalProps {
    width: number | null;
    title: string;
    isModalOpen: boolean;
    handleCancel: () => void;
    child: React.ReactNode;
}

const CustomModal = ({ title, isModalOpen, handleCancel, child, width }: CustomModalProps) => {
    return (
        <StyledCustomModal>
            <Modal
                title={<div className="custom-modal-title">{title}</div>}
                open={isModalOpen}
                footer={null}
                onCancel={handleCancel}
                centered={true}
                width={width ?? {
                    xs: '90%',
                    sm: '80%',
                    md: '70%',
                    lg: '60%',
                    xl: '50%',
                    xxl: '40%',
                }}
                style={{ overflowY: 'auto', maxHeight: '85vh', padding: '0', borderRadius: '1rem', scrollbarWidth: 'none' }}
                body={{ maxHeight: '70vh', overflowY: 'auto', scrollbarWidth: 'none' }}
            >
                {child}
            </Modal>
        </StyledCustomModal>

    )
}
export default CustomModal;