import { useState } from "react";
import {
  Table,
  Button,
  Space,
  Input,
  message,
  Modal,
  Form,
  Upload,
  Tag,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { DeleteOutlined, PlusOutlined, FileExcelOutlined, UploadOutlined } from "@ant-design/icons";
import Search from "antd/es/input/Search";
import moment from "moment";

import * as XLSX from "xlsx";
import { useAddWhitelistEmail, useAddWhitelistEmails, useDeleteWhitelistEmail, useWhitelistEmails } from "../../../hook/useWhitelist";
import { getError } from "../../../utils";
import { WhitelistEmail } from "../../../apis/auth.api";
import CustomModal from "../../../common/components/custom-modal";

const WhitelistManagement = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);
  const [searchValue, setSearchValue] = useState<string>("");
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState<boolean>(false);
  const [form] = Form.useForm();

  const { data, isLoading } = useWhitelistEmails(currentPage, pageSize);
  const addEmailMutation = useAddWhitelistEmail();
  const deleteEmailMutation = useDeleteWhitelistEmail();
  const addEmailsMutation = useAddWhitelistEmails();

  // Filter data by search
  const filteredData = data?.items?.filter((item) =>
    item.email.toLowerCase().includes(searchValue.toLowerCase())
  ) || [];

  const handleAddEmail = async (values: { email: string }) => {
    try {
      await addEmailMutation.mutateAsync(values.email);
      message.success("Email added to whitelist successfully!");
      setIsAddModalOpen(false);
      form.resetFields();
    } catch (error: any) {
      message.error(`Failed to add email: ${getError(error)}`);
    }
  };

  const handleDeleteEmail = (email: string) => {
    Modal.confirm({
      title: "Delete Email",
      content: `Are you sure you want to remove "${email}" from whitelist?`,
      onOk: async () => {
        try {
          await deleteEmailMutation.mutateAsync(email);
          message.success("Email removed from whitelist successfully!");
        } catch (error: any) {
          message.error(`Failed to delete email: ${getError(error)}`);
        }
      },
    });
  };

  // Email validation function
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleExcelFileSelect = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);

        if (jsonData.length === 0) {
          message.error("Excel file is empty");
          return;
        }

        // Find email column (case-insensitive)
        const firstRow = jsonData[0] as any;
        const emailColumn = Object.keys(firstRow).find(
          (key) => key.toLowerCase().includes("email")
        );

        if (!emailColumn) {
          message.error("No 'email' column found in Excel file");
          return;
        }

        // Extract emails
        const emails: string[] = [];
        const invalidEmails: string[] = [];

        jsonData.forEach((row: any, index) => {
          const email = row[emailColumn];
          if (email && typeof email === "string") {
            const trimmedEmail = email.trim().toLowerCase();
            if (trimmedEmail) {
              if (validateEmail(trimmedEmail)) {
                // Check for duplicates in the array
                if (emails.indexOf(trimmedEmail) === -1) {
                  emails.push(trimmedEmail);
                }
              } else {
                invalidEmails.push(`Row ${index + 2}: "${trimmedEmail}"`);
              }
            }
          }
        });

        if (emails.length === 0 && invalidEmails.length === 0) {
          message.error("No email column found in Excel file");
          return;
        }

        if (invalidEmails.length > 0) {
          message.warning(
            `${invalidEmails.length} invalid email(s) found and skipped. Valid emails: ${emails.length}`
          );
        }

        if (emails.length > 0) {
          // Send array of emails to backend
          handleImportEmails(emails);
        } else {
          message.error("No valid emails found in Excel file");
        }
      } catch (error) {
        message.error("Error reading Excel file");
        console.error(error);
      }
    };
    reader.readAsBinaryString(file);
    return false; // Prevent default upload
  };

  const handleImportEmails = async (emails: string[]) => {
    try {
      const result = await addEmailsMutation.mutateAsync(emails);
      message.success(
        `Import successful! Added: ${result.added}, Skipped: ${result.skipped}`
      );
      setIsImportModalOpen(false);
    } catch (error: any) {
      message.error(`Failed to import: ${getError(error)}`);
    }
  };

  const columns: ColumnsType<WhitelistEmail> = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (email: string) => <Tag color="blue">{email}</Tag>,
    },
    {
      title: "Created By",
      dataIndex: "createdBy",
      key: "createdBy",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => moment(date).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: WhitelistEmail) => (
        <Button
          type="link"
          danger
          icon={<DeleteOutlined />}
          onClick={() => handleDeleteEmail(record.email)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div style={{ marginTop: "0.55rem", padding: 24, backgroundColor: "white", borderRadius: 10, boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
      <Space style={{ marginBottom: 16, width: "100%", justifyContent: "space-between" }}>
        <h3 style={{ fontSize: 18, fontWeight: 600 }}>Email Whitelist Management</h3>
        <Space>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsAddModalOpen(true)}
          >
            Add Email
          </Button>
          <Button
            type="default"
            icon={<FileExcelOutlined />}
            onClick={() => setIsImportModalOpen(true)}
          >
            Import from Excel
          </Button>
        </Space>
      </Space>

      <Space style={{ marginBottom: 16, width: "100%" }}>
        <Search
          placeholder="Search by email"
          allowClear
          style={{ width: 300 }}
          onSearch={(value) => setSearchValue(value)}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <span>
          Total: {data?.pagination?.total || 0} emails
        </span>
      </Space>

      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="id"
        loading={isLoading}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: data?.pagination?.total || 0,
          onChange: (page, size) => {
            setCurrentPage(page);
            setPageSize(size || 20);
          },
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50", "100"],
          showTotal: (total) => `Total ${total} items`,
        }}
      />

      {/* Add Email Modal */}
      <CustomModal
        title="Add Email to Whitelist"
        isModalOpen={isAddModalOpen}
        handleCancel={() => {
          setIsAddModalOpen(false);
          form.resetFields();
        }}
        width={500}
        child={
          <Form form={form} onFinish={handleAddEmail} layout="vertical">
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Please enter an email" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input placeholder="example@email.com" />
            </Form.Item>
            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit" loading={addEmailMutation.isPending}>
                  Add
                </Button>
                <Button onClick={() => {
                  setIsAddModalOpen(false);
                  form.resetFields();
                }}>
                  Cancel
                </Button>
              </Space>
            </Form.Item>
          </Form>
        }
      />

      {/* Import Excel Modal */}
      <CustomModal
        title="Import Emails from Excel"
        isModalOpen={isImportModalOpen}
        handleCancel={() => setIsImportModalOpen(false)}
        width={500}
        child={
          <div>
            <p style={{ marginBottom: 16 }}>
              Upload an Excel file (.xlsx, .xls) with an "email" column.
            </p>
            <Upload
              accept=".xlsx,.xls"
              beforeUpload={handleExcelFileSelect}
              showUploadList={false}
              maxCount={1}
            >
              <Button icon={<UploadOutlined />} loading={addEmailsMutation.isPending}>
                Select Excel File
              </Button>
            </Upload>
            <small style={{ color: "#888", marginTop: 4, display: "block" }}>
              Imported emails will be added to whitelist. Duplicates will be skipped.
            </small>
          </div>
        }
      />
    </div>
  );
};

export default WhitelistManagement;
