import { Modal, Button, Form, Input, DatePicker } from 'antd';
import type { GetProps } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';
import './style.pcss'
import { useState } from 'react';
import { Contest } from '../../../tabs/contest-management/type';
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

const ContestForm: React.FC<{ contest: Contest | null }> = ({ contest }) => {
    const [confirmDay, setConfirmDay] = useState('');
    const [form] = Form.useForm();
    const disabledRangeTime: RangePickerProps['disabledTime'] = (_, type) => {
        const now = dayjs();
        if (type === 'start') {
            return {
                disabledHours: () => range(0, now.hour()),
                disabledMinutes: () => now.hour() === now.hour() ? range(0, now.minute()) : [],
                disabledSeconds: () => now.minute() === now.minute() ? range(0, now.second()) : [],
            };
        }
        return {};
    };
    const handleCreateForm = (values: any) => {
        console.log("Form Values:", values);
    };
    return (
        <Form
            form={form}
            layout="vertical"
            className='form-style'
            onFinish={handleCreateForm}
        >
            <Form.Item
                label="Contest Name"
                name="contestName"
                initialValue={contest?.contestName}
                rules={[{ required: true, message: "Please enter a contest name" }]}
            >
                <Input placeholder='Enter contest name' className='input' />
            </Form.Item>

            <Form.Item shouldUpdate
                label="Contest Duration"
                name="contestDuration"
                rules={[{ required: true, message: "Please select a contest duration" }]}
            >
                <RangePicker
                    className='range-picker-customize'
                    disabledDate={disabledDate}
                    disabledTime={disabledRangeTime}
                    showTime={{ hideDisabledOptions: true }}
                    format="YYYY-MM-DD HH:mm:ss"
                    onChange={(values) => {
                        if (values) {
                            const start = values[0]?.format("YYYY-MM-DD HH:mm:ss");
                            const end = values[1]?.format("YYYY-MM-DD HH:mm:ss");
                            setConfirmDay(`This contest will take place from ${start} until ${end}`);
                            console.log("Values:", confirmDay);
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
            <Form.Item>
                <Button htmlType="submit" block className="create-btn">
                    Save
                </Button>
            </Form.Item>

        </Form>
    );
}
export default ContestForm;