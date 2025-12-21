import { Space, message } from "antd";
import { useState } from "react";
import OrderListComponent from "./OrderListComponent";
import { useInfoOrders } from "../../../hook/useInfoOrders";
import { OrderInfo } from "../../../apis/orders.api";
import { formatIdOrder } from "../../../utils";
import { exportAllOrdersCSV } from "../../../apis/orders.api";
import dayjs from "dayjs";

export const OrderManagement = () => {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [side, setSide] = useState<string>("All");
  const [type, setType] = useState<string>("All");
  const [status, setStatus] = useState<string>("All");
  const [search, setSearch] = useState<string>("");
  const [startDate, setStartDate] = useState<string | undefined>(undefined);
  const [endDate, setEndDate] = useState<string | undefined>(undefined);
  const [exporting, setExporting] = useState<boolean>(false);

  const { data, isLoading, isFetching } = useInfoOrders({
    limit,
    page,
    side: side === "All" ? undefined : (side as any),
    type: type === "All" ? undefined : (type as any),
    status: status === "All" ? undefined : (status as any),
    search: search || undefined,
    startDate: startDate || undefined,
    endDate: endDate || undefined,
  });
  const orders = data?.items;

  const dataOrderList: OrderInfo[] = Array.isArray(orders)
    ? orders.filter(order => order !== null).map((order) => {
        return {
          ...order,
          id: formatIdOrder(order?.id, "o"),
          key: formatIdOrder(order?.id, "o"),
        };
      })
    : [];

  return (
    <Space direction="vertical" size="middle" style={{ display: "flex" }}>
      <h1 style={{ fontSize: 24, fontWeight: 600 }}>Order Management</h1>
      <OrderListComponent 
        data={dataOrderList}
        loading={isLoading || isFetching}
        total={data?.pagination?.total ?? 0}
        page={page}
        limit={limit}
        onPageChange={(p) => setPage(p)}
        onLimitChange={(ps) => { setPage(1); setLimit(ps); }}
        selectedType={type}
        selectedSide={side}
        selectedStatus={status}
        onTypeChange={(v) => { setPage(1); setType(v); }}
        onSideChange={(v) => { setPage(1); setSide(v); }}
        onStatusChange={(v) => { setPage(1); setStatus(v); }}
        search={search}
        onSearchChange={(v) => { setPage(1); setSearch(v); }}
        startDate={startDate}
        endDate={endDate}
        onDateRangeChange={(start, end) => {
          setPage(1);
          setStartDate(start);
          setEndDate(end);
        }}
        onExport={async () => {
          try {
            setExporting(true);
            const params: any = {};
            if (side !== "All") params.side = side;
            if (type !== "All") params.type = type;
            if (status !== "All") params.status = status;
            if (search) params.search = search;
            if (startDate) params.startDate = dayjs(startDate).format('YYYY-MM-DD');
            if (endDate) params.endDate = dayjs(endDate).format('YYYY-MM-DD');

            const blob = await exportAllOrdersCSV(params);
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            
            // Generate filename
            const timestamp = new Date().toISOString().split('T')[0];
            let filename = `orders_${timestamp}`;
            if (startDate && endDate) {
              filename = `orders_${dayjs(startDate).format('YYYY-MM-DD')}_to_${dayjs(endDate).format('YYYY-MM-DD')}`;
            }
            link.download = `${filename}.csv`;
            
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
            message.success("Export successful!");
          } catch (err) {
            message.error("Failed to export CSV");
          } finally {
            setExporting(false);
          }
        }}
        exporting={exporting}
      />
    </Space>
  );
};
