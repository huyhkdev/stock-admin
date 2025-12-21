import { useState } from "react";
import {
  Table,
  Button,
  Select,
  Space,
  Tag,
  Avatar,
  Checkbox,
  CheckboxChangeEvent,
  Flex,
  message,
  Modal,
  InputNumber,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { UserDetailContent, UserStatisticComponent } from "./components";
import { UserOutlined, WalletOutlined } from "@ant-design/icons";
import Search from "antd/es/input/Search";
import { filterType } from "./constants";
import CustomModal from "../../../common/components/custom-modal";
import { UserInfo } from "../../../apis/users.api";
import moment from "moment";
import { useInfoAssetsUser, useInfoUsers } from "../../../hook/useInfoUsers";
import { blockUsers, unblockUsers, promoteUsers, demoteUsers, resetWallet } from "../../../apis/auth.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { filterUsersByKey, filterUsersByMultipleFields, getCurrentUserUid } from "../../../utils";
import { StyledTable } from "./style";

const { Option } = Select;

type OptionType = "All" | "Active User" | "Inactive User" | "Banned User";

export const UserManagement = () => {
  const queryClient = useQueryClient();
  const { data: users, isLoading } = useInfoUsers();

  const [uidSelected, setUidSelected] = useState<string>("");
  const { data: assets, isLoading: loadingAssetsUser } = useInfoAssetsUser(uidSelected);
  
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isResetWalletModalOpen, setIsResetWalletModalOpen] = useState<boolean>(false);
  const [resetWalletUser, setResetWalletUser] = useState<UserInfo | null>(null);
  const [newBalance, setNewBalance] = useState<number>(500000000); // Default 500M

  const [selectedUser, setSelectedUser] = useState<UserInfo | null>(null);
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<OptionType>("All");

  const [dataSearch, setDataSearch] = useState<UserInfo[] | undefined>();
  const [searchValue, setSearchValue] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);

  // Get current logged-in user's uid
  const currentUserUid = getCurrentUserUid();

  const showModal = (record: UserInfo) => {
    setSelectedUser(record);
    setUidSelected(record.id);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleCheckboxChange = (e: CheckboxChangeEvent, userId: string) => {
    // Prevent selecting current user
    if (userId === currentUserUid) {
      message.warning("You cannot perform actions on yourself");
      return;
    }
    
    if (e.target.checked) {
      setSelectedUserIds((prev) => [...prev, userId]);
    } else {
      setSelectedUserIds((prev) => prev.filter((id) => id !== userId));
    }
  };

  const columns: ColumnsType<UserInfo> = [
    {
      title: "",
      dataIndex: "checkbox",
      key: "id",
      render: (_e: React.ChangeEvent<HTMLInputElement>, record: UserInfo) => (
        <Checkbox
          key={record.id}
          onChange={(e) => handleCheckboxChange(e, record.id)}
          checked={selectedUserIds.includes(record.id)}
          disabled={record.id === currentUserUid}
        />
      ),
      width: 20,
    },
    {
      title: "UID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "fullName",
      key: "fullName",
      onCell: (record: UserInfo) => ({
        onClick: () => showModal(record),
      }),
      render: (fullname: string) => (
        <div>
          <Space className="clickable-row" title="Click to view details">
            <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
            {fullname}
          </Space>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role: string) => (
        <b style={{ color: role === "blocker" ? "red" : "inherit" }}>{role}</b>
      ),
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Date of Birth",
      dataIndex: "dob",
      key: "dob",
      render: (dob: Date) => moment(dob).format("YYYY-MM-DD"),
    },
    {
      title: "Campus",
      dataIndex: "campus",
      key: "campus",
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
      render: (status: string) => {
        let color: string;
        switch (status) {
          case "active":
            color = "green";
            break;
          case "pending":
            color = "yellow";
            break;
          default:
            color = "default";
        }
        return (
          <Tag color={color} style={{ cursor: "pointer" }}>
            {status}
          </Tag>
        );
      },
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: Date) =>
        moment(createdAt).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "Actions",
      key: "actions",
      width: 200,
      render: (_: any, record: UserInfo) => (
        <Space>
          <Button
            type="link"
            size="small"
            icon={<WalletOutlined />}
            onClick={() => showResetWalletModal(record)}
            disabled={record.id === currentUserUid}
          >
            Reset Wallet
          </Button>
        </Space>
      ),
    },
  ];
  const handleTableChange = (pagination: {
    current: number;
    pageSize: number;
  }) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    setDataSearch(users ? filterUsersByMultipleFields(users, value) : []);
  };

  // Re-apply filters after data refresh
  const reapplyFilters = (updatedUsers: UserInfo[]) => {
    if (searchValue) {
      setDataSearch(filterUsersByMultipleFields(updatedUsers, searchValue));
    } else {
      switch (selectedFilter) {
        case "Active User":
          setDataSearch(filterUsersByKey(updatedUsers, "state", "active"));
          break;
        case "Inactive User":
          setDataSearch(filterUsersByKey(updatedUsers, "state", "pending"));
          break;
        case "Banned User":
          setDataSearch(filterUsersByKey(updatedUsers, "role", "blocker"));
          break;
        case "All":
        default:
          setDataSearch(updatedUsers);
          break;
      }
    }
  };

  const handleFilterUser = (value: OptionType) => {
    setSelectedFilter(value);
    switch (value) {
      case "Active User":
        setDataSearch(users ? filterUsersByKey(users, "state", "active") : []);
        break;
      case "Inactive User":
        setDataSearch(users ? filterUsersByKey(users, "state", "pending") : []);
        break;
      case "Banned User":
        setDataSearch(users ? filterUsersByKey(users, "role", "blocker") : []);
        break;
      case "All":
      default:
        setDataSearch(users);
        break;
    }
  };

  const blockMutation = useMutation({
    mutationFn: blockUsers,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["users"] });
      const updatedUsers = queryClient.getQueryData<UserInfo[]>(["users"]);
      if (updatedUsers) reapplyFilters(updatedUsers);
      setSelectedUserIds([]);
      message.success("Users selected has been blocked");
    },
    onError: () => message.error("Failed to block users"),
  });

  const unblockMutation = useMutation({
    mutationFn: unblockUsers,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["users"] });
      const updatedUsers = queryClient.getQueryData<UserInfo[]>(["users"]);
      if (updatedUsers) reapplyFilters(updatedUsers);
      setSelectedUserIds([]);
      message.success("Users selected has been active again");
    },
    onError: () => message.error("Failed to unblock users"),
  });

  const promoteMutation = useMutation({
    mutationFn: promoteUsers,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["users"] });
      const updatedUsers = queryClient.getQueryData<UserInfo[]>(["users"]);
      if (updatedUsers) reapplyFilters(updatedUsers);
      setSelectedUserIds([]);
      message.success("Users selected has been promoted to admin");
    },
    onError: () => message.error("Failed to promote users"),
  });

  const demoteMutation = useMutation({
    mutationFn: demoteUsers,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["users"] });
      const updatedUsers = queryClient.getQueryData<UserInfo[]>(["users"]);
      if (updatedUsers) reapplyFilters(updatedUsers);
      setSelectedUserIds([]);
      message.success("Users selected has been demoted to user");
    },
    onError: () => message.error("Failed to demote users"),
  });

  const handleBlockUser = () => {
    blockMutation.mutate(selectedUserIds);
  };

  const handleUnblockUser = () => {
    unblockMutation.mutate(selectedUserIds);
  };

  const handlePromoteUser = () => {
    promoteMutation.mutate(selectedUserIds);
  };

  const handleDemoteUser = () => {
    demoteMutation.mutate(selectedUserIds);
  };

  // Reset Wallet Mutation
  const resetWalletMutation = useMutation({
    mutationFn: ({ uid, balance }: { uid: string; balance: number }) => resetWallet(uid, balance),
    onSuccess: () => {
      message.success("Wallet reset successfully");
      // Invalidate all user-related queries
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["userAssets"] });
      queryClient.invalidateQueries({ queryKey: ["userStatistic"] });
      setIsResetWalletModalOpen(false);
      setResetWalletUser(null);
      setNewBalance(500000000); // Reset to default
    },
    onError: (error: any) => {
      message.error(`Failed to reset wallet: ${error?.response?.data?.errors?.[0]?.errorMessage || 'Unknown error'}`);
    },
  });

  const showResetWalletModal = (user: UserInfo) => {
    setResetWalletUser(user);
    setIsResetWalletModalOpen(true);
  };

  const handleResetWallet = () => {
    if (!resetWalletUser) return;
    
    Modal.confirm({
      title: "Confirm Reset Wallet",
      content: `Are you sure you want to reset wallet for ${resetWalletUser.fullName || resetWalletUser.email} to ${newBalance.toLocaleString()} VND?`,
      onOk: () => {
        resetWalletMutation.mutate({ uid: resetWalletUser.id, balance: newBalance });
      },
    });
  };

  const handleCancelResetWallet = () => {
    setIsResetWalletModalOpen(false);
    setResetWalletUser(null);
    setNewBalance(500000000);
  };

  // Check selected users state to show conditional buttons
  const selectedUsersData = users?.filter(user => selectedUserIds.includes(user.id)) || [];
  const hasBlockedUsers = selectedUsersData.some(user => user.role === "blocker");
  const hasNonBlockedUsers = selectedUsersData.some(user => user.role !== "blocker");
  const hasAdminUsers = selectedUsersData.some(user => user.role === "admin");
  const hasNonAdminUsers = selectedUsersData.some(user => user.role !== "admin");
  return (
    <div>
      <Flex vertical gap={20}>
        <Space style={{ width: "100%", justifyContent: "space-between" }}>
          <h1 style={{ fontSize: 24, fontWeight: 600 }}>User Management</h1>
          
        </Space>
        <UserStatisticComponent />
        <Space style={{ width: "100%", justifyContent: "space-between" }}>
          <Space>
            <Select
              value={selectedFilter}
              style={{ width: "10rem" }}
              onChange={(value: OptionType) => handleFilterUser(value)}
            >
              {filterType.map((type) => (
                <Option key={type} value={type}>
                  {type}
                </Option>
              ))}
            </Select>
            <Search
              placeholder="Email or UID"
              prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              style={{ width: 200 }}
              value={searchValue}
              onChange={onChange}
            />
            {selectedUserIds.length > 0 && (
              <Space>
                {hasNonBlockedUsers && (
                <Button
                  danger
                  type="primary"
                  onClick={handleBlockUser}
                  loading={blockMutation.isPending}
                >
                  Block User
                </Button>
                )}
                {hasBlockedUsers && (
                <Button
                  type="primary"
                  onClick={handleUnblockUser}
                  loading={unblockMutation.isPending}
                >
                  Unblock User
                </Button>
                )}
                {hasNonAdminUsers && (
                  <Button
                    type="primary"
                    onClick={handlePromoteUser}
                    loading={promoteMutation.isPending}
                    style={{ backgroundColor: "#52c41a", borderColor: "#52c41a" }}
                  >
                    Promote to Admin
                  </Button>
                )}
                {hasAdminUsers && (
                  <Button
                    onClick={handleDemoteUser}
                    loading={demoteMutation.isPending}
                    style={{ backgroundColor: "#faad14", borderColor: "#faad14", color: "white" }}
                  >
                    Demote to User
                  </Button>
                )}
              </Space>
            )}
          </Space>

          <div>
            <span>
              Total: {users?.length.toLocaleString()} and showing {pageSize} /
              page
            </span>
          </div>
        </Space>
        <StyledTable>
          <Table
            rowKey={(record) => record.id}
            columns={columns}
            dataSource={dataSearch ? dataSearch.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) : users?.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())}
            bordered
            size="small"
            className="custom-table"
            loading={isLoading}
            pagination={{
              current: currentPage,
              pageSize: pageSize,
              total: dataSearch ? dataSearch.length : users?.length,
              onChange: (page, pageSize) =>
                handleTableChange({ current: page, pageSize }),
              showSizeChanger: true,
              pageSizeOptions: ["5", "10", "15", "20"],
              showTotal: (total: number) => `Total ${total} items`,
            }}
          />
        </StyledTable>
       
        {(selectedUser && assets && !loadingAssetsUser) && (
          <CustomModal
            title={`Portfolio of ${selectedUser.fullName}`}
            isModalOpen={isModalOpen}
            handleCancel={handleCancel}
            width={800}
            child={
              <UserDetailContent
                isLoading={loadingAssetsUser}
                uid={selectedUser.id}
                assets={assets}
              />
            }
          />
        )}

        {/* Reset Wallet Modal */}
        <Modal
          title="Reset Wallet Balance"
          open={isResetWalletModalOpen}
          onOk={handleResetWallet}
          onCancel={handleCancelResetWallet}
          okText="Reset"
          okButtonProps={{ loading: resetWalletMutation.isPending }}
        >
          <Space direction="vertical" style={{ width: '100%' }} size="large">
            <div>
              <p><strong>User:</strong> {resetWalletUser?.fullName || resetWalletUser?.email}</p>
              <p><strong>UID:</strong> {resetWalletUser?.id}</p>
            </div>
            <div>
              <p style={{ marginBottom: 8 }}><strong>New Balance (VND):</strong></p>
              <InputNumber
                style={{ width: '100%' }}
                min={0}
                step={1000000}
                value={newBalance}
                onChange={(value) => setNewBalance(value || 0)}
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value) => Number(value!.replace(/\$\s?|(,*)/g, ''))}
                placeholder="Enter new balance"
              />
              <p style={{ marginTop: 8, color: '#888', fontSize: '12px' }}>
                Default: 500,000,000 VND
              </p>
            </div>
          </Space>
        </Modal>
      </Flex>
    </div>
  );
};
