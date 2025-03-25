import { Modal } from "antd";
import styled from "styled-components";
import { useState, useEffect } from "react";
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
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    // Handle resizing events
    useEffect(() => {
        const handleResize = () => setScreenWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Responsive width logic
    const responsiveWidth = width ?? (screenWidth >= 1600 ? '40%' :
        screenWidth >= 1200 ? '50%' :
        screenWidth >= 992 ? '60%' :
        screenWidth >= 768 ? '70%' :
        screenWidth >= 576 ? '80%' : '90%');

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
                } as any}
                style={{ overflowY: 'auto', maxHeight: '85vh', padding: '0', borderRadius: '1rem', scrollbarWidth: 'none' }}
                // body={{ maxHeight: '70vh', overflowY: 'auto', scrollbarWidth: 'none' } as any }
            >
                {child}
            </Modal>
        </StyledCustomModal>

    )
}

export default CustomModal;