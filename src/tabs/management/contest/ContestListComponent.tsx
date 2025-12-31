
import {   message, Skeleton, Tag } from "antd";
import { Button, Dropdown, Input, MenuProps, Select, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { SearchProps } from "antd/es/input";
import { useEffect, useState } from "react";
import { AuditOutlined, DeleteOutlined, EditOutlined, MoreOutlined, FileTextOutlined, TrophyOutlined } from '@ant-design/icons';
import { filterType } from "./constants";
import CustomModal from "../../../common/components/custom-modal";
import ContestForm from "../../../common/components/contest-form";
import ContestDetailComponent from "./ContestDetailComponent";
import { Contest, exportContestOrders, exportContestRanks } from "../../../apis/contests.api";
import { useCreateContest, useDeleteContest, useUpdateContest } from "../../../hook/useInfoContest";
import styled from 'styled-components';
import { filterContestsByKey, getError, getCurrentUserUid } from "../../../utils";
import moment from "moment";
import { ContestDetailProps } from "./type";


const StyledTableContest = styled.div`
  .ant-table-cell {
    font-size: 0.8rem; /* Thay đổi giá trị theo ý bạn */
  }

  .clickable-row {
    cursor: pointer;
  }

  .ant-table {
    min-height: 17rem;
  }
`;
const { Option } = Select;
const ListComponent: React.FC<ContestDetailProps> = (props) => {
    const { contests, loading } = props;
    const [filteredContests, setFilteredContests] = useState<Contest[]>(contests);
    const [filterOption, setFilterOption] = useState<string>("All");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(5);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedContest, setSelectedContest] = useState<Contest | null>(null);
    const { mutate: mutateCreate, isPending: isCreating } = useCreateContest();
    const { mutate: mutateUpdate, isPending: isUpdating } = useUpdateContest();
    const { mutate: mutateDelete } = useDeleteContest();
    const [dataSource, setDataSource] = useState<Contest[]>(filteredContests);
    const [loadAgain, setLoadAgain] = useState(false);
    const [showMyContestsOnly, setShowMyContestsOnly] = useState<boolean>(true);
    const currentUserUid = getCurrentUserUid();
    useEffect(() => {
        if (!loading) {
            let filtered = contests || [];
            
            // Filter by "My Contest" if enabled
            if (showMyContestsOnly && currentUserUid) {
                filtered = filtered.filter(contest => contest.creatorUid === currentUserUid);
            }
            
            setFilteredContests(filtered);
            setDataSource(filtered);
        }
        if (contests.length === 0) return;

        const now = new Date().getTime();
        let nextUpdateTime = Infinity;
    
        contests.forEach((contest) => {
            const startTime = new Date(contest.startDateTime).getTime();
            const endTime = new Date(contest.endDateTime).getTime();
    
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
    }, [contests, loading, showMyContestsOnly, currentUserUid]);


    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const showUpdateModal = (record: Contest) => {
        setIsUpdateModalOpen(true);
        setSelectedContest(record);
    };

    const handleUpdateModalCancel = () => {
        setIsUpdateModalOpen(false);
        setSelectedContest(null);
    };

    const showDetailModal = (record: Contest) => {
        setIsDetailModalOpen(true);
        setSelectedContest(record);
    };

    const handleDetailModalCancel = () => {
        setIsDetailModalOpen(false);
        setSelectedContest(null);
    };

    const handleCreateContest = (formData: FormData, onSuccess: () => void) => {
        mutateCreate(formData, {
            onSuccess: () => {
                message.success("Contest created successfully!");
                setIsModalOpen(false);
                onSuccess();
            },
            onError: (error) => {
                message.error("Failed to create contest: " + getError(error));
            },
        });
    };


    const handleUpdateContest = (formData: FormData, onSuccess: () => void) => {
        if (!selectedContest?.contestId) {
            message.error("Contest ID is missing");
            return;
        }
        mutateUpdate({ contestId: selectedContest.contestId, formData }, {
            onSuccess: () => {
                message.success("Contest updated successfully!");
                setIsUpdateModalOpen(false);
                onSuccess();
            },
            onError: (error) => {
                message.error("Failed to update contest: " + getError(error));
            },
        });
    };

    const handleDeleteContest = (id: number) => {
        mutateDelete(id, {
            onSuccess: () => {
                message.success("Contest deleted successfully!");
            },
            onError: (error) => {
                message.error("Failed to delete contest: " + getError(error));
            },
        });
    };

    const handleExportOrders = async (contestId: number) => {
        try {
            message.loading({ content: 'Exporting orders...', key: 'export-orders' });
            const blob = await exportContestOrders(contestId);
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `contest_${contestId}_orders.csv`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
            message.success({ content: 'Orders exported successfully!', key: 'export-orders' });
        } catch (error) {
            message.error({ content: 'Failed to export orders: ' + getError(error), key: 'export-orders' });
        }
    };

    const handleExportRanks = async (contestId: number) => {
        try {
            message.loading({ content: 'Exporting ranks...', key: 'export-ranks' });
            const blob = await exportContestRanks(contestId);
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `contest_${contestId}_ranks.csv`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
            message.success({ content: 'Ranks exported successfully!', key: 'export-ranks' });
        } catch (error) {
            message.error({ content: 'Failed to export ranks: ' + getError(error), key: 'export-ranks' });
        }
    };
    const handleFilterChange = (value: string) => {
        setFilterOption(value);
        let filteredContests: Contest[] = [];

        // First apply "My Contest" filter if enabled
        let baseContests = contests;
        if (showMyContestsOnly && currentUserUid) {
            baseContests = contests.filter(contest => contest.creatorUid === currentUserUid);
        }

        switch (value) {
            case "Today":
                filteredContests = baseContests.filter(contest =>
                    moment(contest.startDateTime).isSame(moment(), "day")
                );
                break;
            case "This Week":
                filteredContests = baseContests.filter(contest =>
                    moment(contest.startDateTime).isSame(moment(), "week")
                );
                break;
            case "Last Week":
                filteredContests = baseContests.filter(contest =>
                    moment(contest.startDateTime).isSame(moment().subtract(1, "week"), "week")
                );
                break;
            case "This Month":
                filteredContests = baseContests.filter(contest =>
                    moment(contest.startDateTime).isSame(moment(), "month")
                );
                break;
            case "Last Month":
                filteredContests = baseContests.filter(contest =>
                    moment(contest.startDateTime).isSame(moment().subtract(1, "month"), "month")
                );
                break;
            case "This Year":
                filteredContests = baseContests.filter(contest =>
                    moment(contest.startDateTime).isSame(moment(), "year")
                );
                break;
            case "Last Year":
                filteredContests = baseContests.filter(contest =>
                    moment(contest.startDateTime).isSame(moment().subtract(1, "year"), "year")
                );
                break;
            case "All":
                filteredContests = baseContests;
                break;
            default:
                filteredContests = baseContests;
        }

        setFilteredContests(filteredContests);
        setDataSource(filteredContests);
    };

    const handleMyContestToggle = () => {
        const newValue = !showMyContestsOnly;
        setShowMyContestsOnly(newValue);
        
        // Re-apply filters with new "My Contest" setting
        let baseContests = contests;
        if (newValue && currentUserUid) {
            baseContests = contests.filter(contest => contest.creatorUid === currentUserUid);
        }
        
        // Apply time filter
        let filteredContests: Contest[] = [];
        switch (filterOption) {
            case "Today":
                filteredContests = baseContests.filter(contest =>
                    moment(contest.startDateTime).isSame(moment(), "day")
                );
                break;
            case "This Week":
                filteredContests = baseContests.filter(contest =>
                    moment(contest.startDateTime).isSame(moment(), "week")
                );
                break;
            case "Last Week":
                filteredContests = baseContests.filter(contest =>
                    moment(contest.startDateTime).isSame(moment().subtract(1, "week"), "week")
                );
                break;
            case "This Month":
                filteredContests = baseContests.filter(contest =>
                    moment(contest.startDateTime).isSame(moment(), "month")
                );
                break;
            case "Last Month":
                filteredContests = baseContests.filter(contest =>
                    moment(contest.startDateTime).isSame(moment().subtract(1, "month"), "month")
                );
                break;
            case "This Year":
                filteredContests = baseContests.filter(contest =>
                    moment(contest.startDateTime).isSame(moment(), "year")
                );
                break;
            case "Last Year":
                filteredContests = baseContests.filter(contest =>
                    moment(contest.startDateTime).isSame(moment().subtract(1, "year"), "year")
                );
                break;
            case "All":
            default:
                filteredContests = baseContests;
        }

        setFilteredContests(filteredContests);
        setDataSource(filteredContests);
    };
    const handleTableChange = (pagination: {
        current: number;
        pageSize: number;
    }) => {
        setCurrentPage(pagination.current);
        setPageSize(pagination.pageSize);
    };

    const columns: ColumnsType<Contest> = [
        {
            title: 'Contest ID',
            dataIndex: 'contestId',
            key: 'contestId',
        },
        {
            title: 'Contest Name',
            dataIndex: 'contestName',
            key: 'contestName',
            render: (contestName: string) => {
                return <Space title='Click to view details' style={{ cursor: 'pointer' }}><AuditOutlined />{contestName}</Space>;
            },
            onCell: (record: Contest) => ({
                onClick: () => showDetailModal(record),
            }),
        },
        {
            title: 'Start Time',
            dataIndex: 'startDateTime',
            key: 'startDateTime',
            sorter: (a, b) => new Date(a.startDateTime).getTime() - new Date(b.startDateTime).getTime(),
            render: (startDateTime: string) => moment(startDateTime).format("YYYY-MM-DD HH:mm:ss"),
        },
        {
            title: 'End Time',
            dataIndex: 'endDateTime',
            key: 'endDateTime',
            sorter: (a, b) => new Date(a.endDateTime).getTime() - new Date(b.endDateTime).getTime(),
            render: (endDateTime: Date) => moment(endDateTime).format("YYYY-MM-DD HH:mm:ss"),
        },
        {
            title: 'Max Participants',
            dataIndex: 'maxParticipants',
            key: 'maxParticipants',
            render: (maxParticipants: number) => maxParticipants > 0 ? maxParticipants.toLocaleString() : 'Unlimited',
        },
        {
            title: 'Banner',
            dataIndex: 'banner',
            key: 'banner',
            render: (banner: string) => <a href={banner}><img src={banner} alt="banner" style={{ width: 100, height: 40 }} /></a>,
        },
        {
            title: 'Status',
            dataIndex: 'startDateTime',
            key: 'startDateTime',
            render: (_: any, record: Contest) => {
                const { startDateTime, endDateTime } = record;
                const now = new Date();
                const start = new Date(startDateTime);
                const end = new Date(endDateTime);

                const statusMap: { [key: string]: { color: string; value: string } } = {
                    ended: { color: 'red', value: 'Ended' },
                    ongoing: { color: 'green', value: 'Ongoing' },
                    upcoming: { color: 'yellow', value: 'Upcoming' },
                    unknown: { color: 'default', value: 'Unknown' }
                };

                const status =
                    end < now ? 'ended' :
                        start <= now && end >= now ? 'ongoing' :
                            start > now ? 'upcoming' :
                                'unknown';

                return <Tag color={statusMap[status].color}>{statusMap[status].value}</Tag>;
            }
        },
        {
            title: '',
            dataIndex: 'startDateTime',
            key: 'startDateTime',
            width: 20,
            render: (_: any, record: Contest) => {
                const isDisabled = new Date(_) <= new Date();
                const menuItems: MenuProps['items'] = [
                    {
                        key: '1',
                        disabled: isDisabled,
                        label: "Edit",
                        icon: <EditOutlined />,
                        onClick: () => {
                            if (!isDisabled) showUpdateModal(record);
                        },
                    },
                    {
                        key: '2',
                        danger: true,
                        disabled: isDisabled,
                        label: "Delete",
                        icon: <DeleteOutlined />,
                        onClick: () => {
                            if (!isDisabled) handleDeleteContest(record.contestId!);
                        },
                    },
                    {
                        type: 'divider',
                    },
                    {
                        key: '3',
                        label: "Export Orders",
                        icon: <FileTextOutlined />,
                        onClick: () => {
                            handleExportOrders(record.contestId!);
                        },
                    },
                    {
                        key: '4',
                        label: "Export Ranks",
                        icon: <TrophyOutlined />,
                        onClick: () => {
                            handleExportRanks(record.contestId!);
                        },
                    },
                ];
                return (
                    <Dropdown menu={{ items: menuItems }} placement="bottomLeft">
                        {/* <MoreOutlined /> */}
                        <Button type="default" shape="circle" icon={<MoreOutlined />} />
                    </Dropdown>
                );
            },
        },
    ];
    const handleSearch = (value: string) => {
        if (!value || value.trim() === '') {
            // If search is empty, show filtered contests
            setDataSource(filteredContests);
            return;
        }
        const searchResults = filteredContests ? filterContestsByKey(filteredContests, "contestName", value, true) : [];
        setDataSource(searchResults);
    }
    const onSearch: SearchProps["onSearch"] = (value) => {
        handleSearch(value);
    };

    return (
        <div style={{ marginTop: '0.55rem', padding: 24, backgroundColor: 'white', borderRadius: 10, boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
            <Space style={{ marginBottom: 16, width: '100%', justifyContent: 'space-between' }}>
                <h3 style={{ fontSize: 18, fontWeight: 600 }}> Contest List</h3>
            </Space>

            <Space style={{ marginBottom: 16, width: '100%', justifyContent: 'space-between' }}>
                <Space>
                    {/* <Button 
                        type={showMyContestsOnly ? "primary" : "default"}
                        onClick={handleMyContestToggle}
                    >
                        My Contest
                    </Button> */}
                    <Select value={filterOption} onChange={handleFilterChange} style={{ width: '10rem' }}>
                        {filterType.map(type => <Option key={type} value={type}>{type}</Option>)}
                    </Select>
                    <Input.Search placeholder=" Search contest" style={{ width: 200 }}
                        onSearch={onSearch}
                    />
                    <Button type="default" style={{ backgroundColor: 'rgb(252, 125, 52)', borderRadius: 'rgb(252, 125, 52)', color: 'white' }} onClick={showModal}>Create Contest</Button>
                </Space>

                <div>
                    <span>Total: {dataSource?.length.toLocaleString()} and showing {pageSize} / page </span>
                </div>
            </Space>
            <StyledTableContest>
                {loadAgain&&loading ?
                    (<Skeleton active />) : (
                        <Table
                            rowKey={(record) => record.contestId!.toString()}
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
                            }} />
                    )}
            </StyledTableContest>
            <CustomModal key='create-contest'
                title={`Create new contest`}
                isModalOpen={isModalOpen}
                handleCancel={handleCancel} width={null}
                child={<ContestForm contest={null} handleSubmit={handleCreateContest} isLoading={isCreating} />}
            />
            <CustomModal key='update-contest'
                title={`Update contest`}
                isModalOpen={isUpdateModalOpen}
                handleCancel={handleUpdateModalCancel} width={null}
                child={<ContestForm contest={selectedContest} handleSubmit={handleUpdateContest} isLoading={isUpdating} />}
            />
            <CustomModal key='contest-detail'
                title={selectedContest?.contestName || 'Contest Details'}
                isModalOpen={isDetailModalOpen}
                handleCancel={handleDetailModalCancel} width={1300}
                child={<ContestDetailComponent contest={selectedContest} />}
            />
        </div>
    );
}
export default ListComponent;