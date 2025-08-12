import styled from "styled-components";

export const StyledBannerForm = styled.div`
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

  .ant-form-item-label > label {
    color: var(--primary-text-color) !important;
    font-weight: 500;
  }

  .ant-upload-list,
  .ant-upload {
    width: 100%;
  }

  img {
    border-radius: 6px;
    margin-top: 0.5rem;
  }
`;
