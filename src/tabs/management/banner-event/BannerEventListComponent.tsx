import { Image, message, Skeleton, Tag } from "antd";
import { Button, Dropdown, Input, Select, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { SearchProps } from "antd/es/input";
import { useEffect, useState } from "react";
import {
  AuditOutlined,
  DeleteOutlined,
  EditOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { filterType } from "./constants";
import CustomModal from "../../../common/components/custom-modal";
import styled from "styled-components";
import { filterBannerEventsByKey, getError } from "../../../utils";
import moment from "moment";
import { BannerEventProps } from "./type";
import { BannerEvent, BannerStatus } from "../../../apis/banners.api";
import {
  useCreateBannerEvent,
  useDeleteBannerEvent,
  useUpdateBannerEvent,
} from "../../../hook/useInfoBannerEvent";
import BannerEventForm from "../../../common/components/banner-event-form";

const StyledTableContest = styled.div`
  .ant-table-cell {
    font-size: 0.8rem;
  }

  .clickable-row {
    cursor: pointer;
  }

  .ant-table {
    min-height: 17rem;
  }
`;
const { Option } = Select;
const ListComponent: React.FC<BannerEventProps> = (props) => {
  const { banners, loading } = props;
  const [filteredBannerEvents, setFilteredBannerEvents] =
    useState<BannerEvent[]>(banners);
  const [filterOption, setFilterOption] = useState<string>("All");
  const [bannersSearch, setBannersSearch] = useState<BannerEvent[]>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState<BannerEvent | null>(
    null
  );
  const { mutate: mutateCreate, isPending } = useCreateBannerEvent();
  const { mutate: mutateUpdate, isPending: isUpdatePending } = useUpdateBannerEvent();
  const { mutate: mutateDelete } = useDeleteBannerEvent();
  const [dataSource, setDataSource] =
    useState<BannerEvent[]>(filteredBannerEvents);
  const [loadAgain, setLoadAgain] = useState(false);
  useEffect(() => {
    if (!loading) {
      setFilteredBannerEvents(banners || []);
      setDataSource(banners);
    }
    if (banners.length === 0) return;

    const now = new Date().getTime();
    let nextUpdateTime = Infinity;

    banners.forEach((banner) => {
      const startTime = new Date(banner.startTime).getTime();
      const endTime = new Date(banner.endTime).getTime();

      if (startTime > now) {
        nextUpdateTime = Math.min(nextUpdateTime, startTime);
      }
      if (endTime > now) {
        nextUpdateTime = Math.min(nextUpdateTime, endTime);
      }
    });

    if (nextUpdateTime !== Infinity) {
      const delay = nextUpdateTime - now;
      const timer = setTimeout(() => {
        setLoadAgain(!loadAgain);
      }, delay);

      return () => clearTimeout(timer); // Cleanup timer khi unmount
    }
    setLoadAgain(!loadAgain);
  }, [banners, loading]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const showUpdateModal = (record: BannerEvent) => {
    setIsUpdateModalOpen(true);
    setSelectedBanner(record);
  };

  const handleUpdateModalCancel = () => {
    setIsUpdateModalOpen(false);
    setSelectedBanner(null);
  };

  const showDetailModal = (record: BannerEvent) => {
    setIsDetailModalOpen(true);
    setSelectedBanner(record);
  };

  const handleDetailModalCancel = () => {
    setIsDetailModalOpen(false);
    setSelectedBanner(null);
  };

  const handleCreateBanner = (formData: FormData, onSuccess: () => void) => {
    mutateCreate(formData, {
      onSuccess: () => {
        message.success("Banner created successfully!");
        setIsModalOpen(false);
        setSelectedBanner(null);
        setLoadAgain(!loadAgain);
        onSuccess();
      },
      onError: (err) => {
        message.error("Failed to create banner: " + getError(err));
      },
    });
  };

  const handleUpdateBanner = (formData: FormData, onSuccess: () => void) => {
    if (!selectedBanner) return;

    mutateUpdate(
      { id: selectedBanner.id, formData },
      {
        onSuccess: () => {
          message.success("Banner updated successfully!");
          setIsUpdateModalOpen(false);
          setLoadAgain((prev) => !prev);
          onSuccess();
        },
        onError: (error) => {
          message.error("Failed to update banner: " + getError(error));
        },
      }
    );
  };

  const handleDeleteBanner = (id: number) => {
    mutateDelete(id, {
      onSuccess: () => {
        message.success("Banner Event deleted successfully!");
      },
      onError: (error) => {
        message.error("Failed to delete Banner Event: " + error.message);
      },
    });
  };
  const handleFilterChange = (value: string) => {
    setFilterOption(value);
    let filteredBannerEvents: BannerEvent[] = [];

    switch (value) {
      case "Today":
        filteredBannerEvents = banners.filter((banner) =>
          moment(banner.startTime).isSame(moment(), "day")
        );
        break;
      case "This Week":
        filteredBannerEvents = banners.filter((banner) =>
          moment(banner.startTime).isSame(moment(), "week")
        );
        break;
      case "Last Week":
        filteredBannerEvents = banners.filter((banner) =>
          moment(banner.startTime).isSame(moment().subtract(1, "week"), "week")
        );
        break;
      case "This Month":
        filteredBannerEvents = banners.filter((banner) =>
          moment(banner.startTime).isSame(moment(), "month")
        );
        break;
      case "Last Month":
        filteredBannerEvents = banners.filter((banner) =>
          moment(banner.startTime).isSame(
            moment().subtract(1, "month"),
            "month"
          )
        );
        break;
      case "This Year":
        filteredBannerEvents = banners.filter((banner) =>
          moment(banner.startTime).isSame(moment(), "year")
        );
        break;
      case "Last Year":
        filteredBannerEvents = banners.filter((banner) =>
          moment(banner.startTime).isSame(moment().subtract(1, "year"), "year")
        );
        break;
      case "All":
        filteredBannerEvents = banners;
        break;
      default:
        filteredBannerEvents = banners;
    }

    setFilteredBannerEvents(filteredBannerEvents);
    setDataSource(filteredBannerEvents);
  };
  const handleTableChange = (pagination: {
    current: number;
    pageSize: number;
  }) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };

  const columns: ColumnsType<BannerEvent> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
        <Space
          title="Click to view details"
          style={{ cursor: "pointer" }}
          onClick={() => showDetailModal(record)}
        >
          <AuditOutlined />
          {text}
        </Space>
      ),
    },
    {
      title: "Image",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (url: string) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Image src={url} alt="banner" style={{ width: 100, height: 40 }} />
        </div>
      ),
    },
    {
      title: "Start",
      dataIndex: "startTime",
      key: "startTime",
      render: (time) => moment(time).format("YYYY-MM-DD HH:mm"),
    },
    {
      title: "End",
      dataIndex: "endTime",
      key: "endTime",
      render: (time) => moment(time).format("YYYY-MM-DD HH:mm"),
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: BannerStatus) => {
        const map = {
          active: "green",
          inactive: "orange",
          expired: "default",
        };
        return <Tag color={map[status]}>{status}</Tag>;
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => {
        return (
          <Dropdown
            menu={{
              items: [
                {
                  key: "edit",
                  label: "Edit",
                  icon: <EditOutlined />,
                  onClick: () => showUpdateModal(record),
                },
                {
                  key: "delete",
                  danger: true,
                  label: "Delete",
                  icon: <DeleteOutlined />,
                  onClick: () => handleDeleteBanner(record.id),
                },
              ],
            }}
            placement="bottomLeft"
          >
            <Button shape="circle" icon={<MoreOutlined />} />
          </Dropdown>
        );
      },
    },
  ];

  const handleSearch = (value: string) => {
    const result = filterBannerEventsByKey(
      filteredBannerEvents,
      "title",
      value,
      true
    );
    setDataSource(result);
  };

  const onSearch: SearchProps["onSearch"] = (value) => {
    handleSearch(value);
  };

  return (
    <div
      style={{
        marginTop: "0.55rem",
        padding: 24,
        backgroundColor: "white",
        borderRadius: 10,
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      }}
    >
      <Space
        style={{
          marginBottom: 16,
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <h3 style={{ fontSize: 18, fontWeight: 600 }}> Contest List</h3>
        <Space>
          <Button type="default">Download report</Button>
        </Space>
      </Space>

      <Space
        style={{
          marginBottom: 16,
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Space>
          <Select
            value={filterOption}
            onChange={handleFilterChange}
            defaultValue="Today"
            style={{ width: "10rem" }}
          >
            {filterType.map((type) => (
              <Option key={type} value={type}>
                {type}
              </Option>
            ))}
          </Select>
          <Input.Search
            placeholder=" Search banner"
            style={{ width: 200 }}
            onSearch={onSearch}
          />
          <Button
            type="default"
            style={{
              backgroundColor: "rgb(252, 125, 52)",
              borderRadius: "rgb(252, 125, 52)",
              color: "white",
            }}
            onClick={showModal}
          >
            Create Banner
          </Button>
        </Space>

        <div>
          <span>
            Total: {dataSource?.length.toLocaleString()} and showing {pageSize}{" "}
            / page{" "}
          </span>
        </div>
      </Space>
      <StyledTableContest>
        {loadAgain && loading ? (
          <Skeleton active />
        ) : (
          <Table
            rowKey={(record) => record.id!.toString()}
            columns={columns}
            dataSource={dataSource}
            bordered
            size="small"
            className="custom-table"
            loading={loading}
            pagination={{
              current: currentPage,
              pageSize: pageSize,
              total: dataSource ? dataSource.length : 0,
              onChange: (page, pageSize) =>
                handleTableChange({ current: page, pageSize }),
              showSizeChanger: true,
              pageSizeOptions: ["5", "10", "15", "20"],
              showTotal: (total: number) => `Total ${total} items`,
            }}
          />
        )}
      </StyledTableContest>
      <CustomModal
        title={selectedBanner ? "Update Banner" : "Create Banner"}
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        child={
          <BannerEventForm
            banner={selectedBanner}
            isLoading={isPending}
            handleSubmit={
              selectedBanner ? handleCreateBanner : handleCreateBanner
            }
          />
        }
      />
      <CustomModal
        key="update-contest"
        title={`Update contest`}
        isModalOpen={isUpdateModalOpen}
        handleCancel={handleUpdateModalCancel}
        width={null}
        child={
          <BannerEventForm
            banner={selectedBanner}
            isLoading={isUpdatePending}
            handleSubmit={handleUpdateBanner}
          />
        }
      />
      {/* <CustomModal key='contest-detail'
                title={selectedContest?.contestName || 'Contest Details'}
                isModalOpen={isDetailModalOpen}
                handleCancel={handleDetailModalCancel} width={1300}
                child={<ContestDetailComponent contest={selectedContest} />}
            /> */}
    </div>
  );
};
export default ListComponent;
