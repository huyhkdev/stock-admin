import { Modal, Button, Form, Input, DatePicker, message } from 'antd';
import type { GetProps } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';
import { useEffect, useState } from 'react';
import { StyledContestForm } from './style';
import { Contest } from '../../../apis/contests.api';
dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(customParseFormat);

const { RangePicker } = DatePicker;
type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;
const range = (start: number, end: number) => {
    const result = [];
    for (let i = start; i < end; i++) {
        result.push(i);
    }
    return result;
};
const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    return current && current < dayjs().startOf('day');
};

const ContestForm: React.FC<{ contest: Contest | null, handleSubmit: (values: any, form: any) => void }> = ({ contest, handleSubmit }) => {
    const [confirmDay, setConfirmDay] = useState<boolean>(false);
    const [form] = Form.useForm();
    const disabledRangeTime: RangePickerProps['disabledTime'] = (current, type) => {
        const now = dayjs();
        const isToday = current?.isSame(now, "day"); // Kiểm tra có phải hôm nay không
    
        if (type === "start" && isToday || type === "end" && isToday) {
            return {
                disabledHours: () => range(0, now.hour()),
                disabledMinutes: (hour) => hour === now.hour() ? range(0, now.minute()) : [],
                disabledSeconds: (minute, hour) => hour === now.hour() && minute === now.minute() ? range(0, now.second()) : [],
            };
        }
    
        return {};
    };
    useEffect(() => {
        console.log("Contest:", contest);
        setConfirmDay(false);
        if (contest) {
            form.setFieldsValue({
                contestName: contest.contestName,
                contestDuration: [dayjs(contest.startDateTime), dayjs(contest.endDateTime)],
                banner: contest.banner
            });
        }
    }
    , [contest, form]);
    return (
        <StyledContestForm>
            <Form
                form={form}
                layout="vertical"
                className='form-style'
                onFinish={(values) =>{ handleSubmit(values, form); setConfirmDay(false);}}
            >
                <Form.Item
                    label="Contest Name"
                    name="contestName"
                    rules={[{ required: true, message: "Please enter a contest name" }]}
                >
                    <Input placeholder='Enter contest name' className='input'
                     count={{
                        show: true,
                        max: 50,
                      }} />
                </Form.Item>

                <Form.Item shouldUpdate
                    label="Contest Duration"
                    name="contestDuration"
                    rules={[{ required: true, message: "Please select a contest duration" }]}
                >
                    <RangePicker
                    placement="topRight"
                    needConfirm={true}
                        className='range-picker-customize'
                        disabledDate={disabledDate}
                        disabledTime={disabledRangeTime}
                        showTime={{ hideDisabledOptions: true }}
                        format="YYYY-MM-DD HH:mm:ss"
                        onChange={(values) => {
                            if (values) {
                                setConfirmDay(true);
                            }
                        }}
                    />
                </Form.Item>
                {confirmDay && (
                    <Form.Item shouldUpdate>
                        {() => {
                            const duration = form.getFieldValue('contestDuration');
                            if (duration) {
                                const start = duration[0]?.format("YYYY-MM-DD HH:mm:ss");
                                const end = duration[1]?.format("YYYY-MM-DD HH:mm:ss");
                                return (
                                    <p style={{ color: 'var(--primary-text-color)', textAlign: 'left' }}>
                                        This contest will take place from {start} until {end}
                                    </p>
                                );
                            }
                            return null;
                        }}
                    </Form.Item>
                )}
                 <Form.Item
                    label="Contest Banner"
                    name="banner"
                    rules={[{ required: true, message: "Please enter a banner" }]}
                >
                    <Input placeholder='Input contest banner' className='input' />
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit" block className="create-btn">
                        Save
                    </Button>
                </Form.Item>

            </Form>
        </StyledContestForm>

    );
}
export default ContestForm;