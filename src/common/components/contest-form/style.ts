import styled from "styled-components";

export const StyledContestForm = styled.div`
  .create-btn {
    background-color: rgb(252, 125, 52);
    border: 1px solid rgb(252, 125, 52);
    color: white !important;
    padding: 1.2rem 2rem;
    border-radius: 10px;
    font-weight: semibold;
    width: fit-content !important;
    text-decoration: none !important;
  }

  .create-btn:hover {
    background-color: rgb(255, 113, 30) !important;
    border: 1px solid rgb(255, 113, 30) !important;
    color: white !important;
    padding: 1.2rem 2rem;
    border-radius: 10px;
    font-weight: semibold;
    width: fit-content !important;
    text-decoration: none !important;
  }

  .modal-customize .ant-modal-content,
  .modal-customize .ant-modal-header {
    background-color: #151c25 !important;
  }

  .modal-customize .ant-modal-footer {
    margin: 0;
    padding: 0;
  }

  .modal-customize .ant-modal-title {
    color: var(--primary-text-color) !important;
    font-size: 1.5rem;
    font-weight: bold;
    padding: 1rem 0 0 1rem;
  }

  .form-style {
    text-align: center;
    padding-top: 1rem;
  }

  .range-picker-customize {
    width: 100%;
    border-radius: 0.5rem;
    padding: 0.8rem;
  }

  .input {
    padding: 0.8rem !important;
  }

  .input::placeholder,
  .range-picker-customize input::placeholder {
    color: gray !important;
  }

  .modal-customize .ant-form-item-label > label {
    color: var(--primary-text-color) !important;
    width: 100% !important;
  }
`;
