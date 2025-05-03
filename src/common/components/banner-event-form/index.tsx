import { Button, Form, Input, DatePicker, InputNumber, Upload, message, Image } from 'antd';
import type { GetProps } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';
import { useEffect, useState } from 'react';
import { StyledBannerForm } from './style';
import { BannerEvent } from '../../../apis/banners.api';

dayjs.extend(customParseFormat);
dayjs.extend(utc);

const { RangePicker } = DatePicker;

type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;

const range = (start: number, end: number) => {
  const result = [];
  for (let i = start; i < end; i++) result.push(i);
  return result;
};

const disabledDate: RangePickerProps['disabledDate'] = (current) =>
  current && current < dayjs().startOf('day');

const BannerEventForm: React.FC<{
  banner: BannerEvent | null;
  handleSubmit: (formData: FormData, onSuccess: () => void) => void;
  isLoading: boolean;
}> = ({ banner, handleSubmit, isLoading }) => {
  const [form] = Form.useForm();
  const [file, setFile] = useState<File | null>(null);
  const [fileList, setFileList] = useState<any[]>([]);
  const [confirmDay, setConfirmDay] = useState(false);

  const disabledRangeTime: RangePickerProps['disabledTime'] = (current, type) => {
    const now = dayjs();
    const isToday = current?.isSame(now, 'day');

    if ((type === 'start' && isToday) || (type === 'end' && isToday)) {
      return {
        disabledHours: () => range(0, now.hour()),
        disabledMinutes: (hour) => (hour === now.hour() ? range(0, now.minute()) : []),
        disabledSeconds: (minute, hour) =>
          hour === now.hour() && minute === now.minute() ? range(0, now.second()) : [],
      };
    }

    return {};
  };

  useEffect(() => {
    setConfirmDay(false);
    if (banner) {
      form.setFieldsValue({
        title: banner.title,
        description: banner.description,
        linkUrl: banner.linkUrl,
        priority: banner.priority,
        status: banner.status,
        time: [dayjs(banner.startTime), dayjs(banner.endTime)],
      });
    }
  }, [banner, form]);

  const onFinish = (values: any) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('linkUrl', values.linkUrl);
    formData.append('priority', values.priority.toString());
    formData.append('startTime', values.time[0].toISOString());
    formData.append('endTime', values.time[1].toISOString());

    if (file) {
      formData.append('image', file);
    } else if (!banner?.imageUrl) {
      message.error('Please upload a banner image');
      return;
    }
    handleSubmit(formData, () => {
      form.resetFields();
      setFile(null);
      setFileList([]);
      setConfirmDay(false);
    });
  };

  return (
    <StyledBannerForm>
      <Form form={form} layout="vertical" onFinish={onFinish} className="form-style">
        <Form.Item label="Title" name="title" rules={[{ required: true }]}>
          <Input className="input" maxLength={100} showCount placeholder="Enter title" />
        </Form.Item>

        <Form.Item label="Description" name="description" rules={[{ required: true }]}>
          <Input.TextArea rows={3} placeholder="Enter description" />
        </Form.Item>

        <Form.Item label="Time Range" name="time" rules={[{ required: true }]}>
          <RangePicker
            showTime={{ hideDisabledOptions: true }}
            disabledDate={disabledDate}
            disabledTime={disabledRangeTime}
            className="range-picker-customize"
            format="YYYY-MM-DD HH:mm:ss"
            onChange={(values) => values && setConfirmDay(true)}
          />
        </Form.Item>

        {confirmDay && (
          <Form.Item shouldUpdate>
            {() => {
              const [start, end] = form.getFieldValue('time') || [];
              return start && end ? (
                <p style={{ textAlign: 'left' }}>
                  This banner event runs from <b>{start.format('YYYY-MM-DD HH:mm')}</b> to{' '}
                  <b>{end.format('YYYY-MM-DD HH:mm')}</b>
                </p>
              ) : null;
            }}
          </Form.Item>
        )}

        <Form.Item label="Link URL" name="linkUrl" rules={[{ required: true }]}>
          <Input className="input" type="url" placeholder="https://..." />
        </Form.Item>

        <Form.Item label="Priority" name="priority" rules={[{ required: true }]}>
          <InputNumber min={0} className="input" style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item label="Banner Image" required>
          <Upload
            beforeUpload={(file) => {
              setFile(file);
              setFileList([file]);
              return false;
            }}
            fileList={fileList}
            onRemove={() => {
              setFile(null);
              setFileList([]);
            }}
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Select Image</Button>
          </Upload>
          {banner?.imageUrl && (
            <div style={{ marginTop: 8 }}>
              <small>Current image:</small>
              <br />
              <Image src={banner.imageUrl} alt="current banner" width={100} />
            </div>
          )}
        </Form.Item>

        <Form.Item>
          <Button loading={isLoading} type="primary" htmlType="submit" block className="create-btn">
            Save
          </Button>
        </Form.Item>
      </Form>
    </StyledBannerForm>
  );
};

export default BannerEventForm;
