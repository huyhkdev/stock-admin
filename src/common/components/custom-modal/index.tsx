import { Modal } from "antd";
import { useState, useEffect } from "react";
import "./style.pcss";

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
        <Modal
            title={<div className="custom-modal-title">{title}</div>}
            open={isModalOpen}
            footer={null}
            onCancel={handleCancel}
            centered={true}
            width={responsiveWidth}
            style={{ overflowY: 'auto', maxHeight: '85vh', padding: '0', borderRadius: '1rem', scrollbarWidth: 'none' }}
            bodyStyle={{ maxHeight: '70vh', overflowY: 'auto', scrollbarWidth: 'none' }}
        >
            {child}
        </Modal>
    )
}

export default CustomModal;