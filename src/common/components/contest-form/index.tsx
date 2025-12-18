import {  Button, Form, Input, DatePicker, Upload, message, Image, Checkbox, Space, Alert } from 'antd';
import type { GetProps, UploadFile } from 'antd';
import { UploadOutlined, FileExcelOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';
import { useEffect, useState } from 'react';
import { StyledContestForm } from './style';
import { Contest } from '../../../apis/contests.api';
import * as XLSX from 'xlsx';
dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(customParseFormat);

const { TextArea } = Input;

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

const ContestForm: React.FC<{ contest: Contest | null, handleSubmit: (formData: FormData, onSuccess: () => void) => void, isLoading: boolean }> = ({ contest, handleSubmit, isLoading }) => {
    const [confirmDay, setConfirmDay] = useState<boolean>(false);
    const [form] = Form.useForm();
    const [file, setFile] = useState<File | null>(null);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [isStrict, setIsStrict] = useState<boolean>(false);
    const [emailList, setEmailList] = useState<string>("");
    const [emailErrors, setEmailErrors] = useState<string[]>([]);
    const [duplicateEmails, setDuplicateEmails] = useState<string[]>([]);
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
    // Email validation function
    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateEmailList = (emails: string): { invalidEmails: string[], duplicateEmails: string[] } => {
        const invalidEmails: string[] = [];
        const duplicates: string[] = [];
        const seen = new Map<string, number>(); // email -> count
        
        // Split by both newlines and commas
        const emailArray = emails.split(/[\n,]+/).map(e => e.trim().toLowerCase()).filter(e => e.length > 0);
        
        emailArray.forEach((email) => {
            // Track occurrences
            const count = seen.get(email) || 0;
            seen.set(email, count + 1);
            
            // Validate format
            if (!validateEmail(email)) {
                if (!invalidEmails.includes(`"${email}" is not a valid email`)) {
                    invalidEmails.push(`"${email}" is not a valid email`);
                }
            }
        });
        
        // Check for duplicates
        seen.forEach((count, email) => {
            if (count > 1) {
                duplicates.push(`"${email}" appears ${count} times`);
            }
        });
        
        return { invalidEmails, duplicateEmails: duplicates };
    };

    useEffect(() => {
        console.log("Contest:", contest);
        setConfirmDay(false);
        setFile(null);
        setFileList([]);
        setIsStrict(false);
        setEmailList("");
        setEmailErrors([]);
        setDuplicateEmails([]);
        if (contest) {
            form.setFieldsValue({
                contestName: contest.contestName,
                contestDuration: [dayjs(contest.startDateTime), dayjs(contest.endDateTime)],
                maxParticipants: contest.maxParticipants,
            });
            
            // Load emails for strict contests
            if (contest.isStrict && contest.allowJoinEmails && contest.allowJoinEmails.length > 0) {
                setIsStrict(true);
                const emailText = contest.allowJoinEmails.join('\n');
                setEmailList(emailText);
                
                // Validate loaded emails
                const { invalidEmails, duplicateEmails } = validateEmailList(emailText);
                setEmailErrors(invalidEmails);
                setDuplicateEmails(duplicateEmails);
                
                if (invalidEmails.length > 0 || duplicateEmails.length > 0) {
                    message.warning(`Some emails in the contest have issues. Please review and fix them.`);
                }
            }
        }
    }
    , [contest, form]);

    const handleExcelUpload = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = e.target?.result;
                const workbook = XLSX.read(data, { type: 'binary' });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(sheet);
                
                // Extract emails from the data
                const emails: string[] = [];
                const invalidEmails: string[] = [];
                
                jsonData.forEach((row: any, index) => {
                    // Look for email column (case insensitive)
                    const emailKey = Object.keys(row).find(key => 
                        key.toLowerCase().includes('email')
                    );
                    if (emailKey && row[emailKey]) {
                        const email = String(row[emailKey]).trim();
                        if (email) {
                            if (validateEmail(email)) {
                                if (emails.indexOf(email) === -1) {
                                    emails.push(email);
                                }
                            } else {
                                invalidEmails.push(`Row ${index + 2}: "${email}"`);
                            }
                        }
                    }
                });

                if (emails.length === 0 && invalidEmails.length === 0) {
                    message.error('No email column found in Excel file');
                    return;
                }

                if (invalidEmails.length > 0) {
                    message.warning(`${invalidEmails.length} invalid email(s) found and skipped. Valid emails: ${emails.length}`);
                }

                if (emails.length > 0) {
                    // Append imported emails to the textarea
                    const currentEmails = emailList.trim();
                    const newEmailText = currentEmails 
                        ? currentEmails + '\n' + emails.join('\n')
                        : emails.join('\n');
                    
                    setEmailList(newEmailText);
                    
                    // Validate the combined list
                    const { invalidEmails: allInvalid, duplicateEmails: allDuplicates } = validateEmailList(newEmailText);
                    setEmailErrors(allInvalid);
                    setDuplicateEmails(allDuplicates);
                    
                    message.success(`Imported ${emails.length} valid emails from Excel`);
                }
            } catch (error) {
                message.error('Error reading Excel file');
                console.error(error);
            }
        };
        reader.readAsBinaryString(file);
        return false;
    };

    const handleEmailListChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setEmailList(value);
        
        // Validate emails in real-time
        if (value.trim()) {
            const { invalidEmails, duplicateEmails } = validateEmailList(value);
            setEmailErrors(invalidEmails);
            setDuplicateEmails(duplicateEmails);
        } else {
            setEmailErrors([]);
            setDuplicateEmails([]);
        }
    };

    const onFinish = (values: { contestName: string; contestDuration: any; maxParticipants: number }) => {
        const formData = new FormData();
        formData.append('contestName', values.contestName);
        formData.append('startDateTime', values.contestDuration[0].toISOString());
        formData.append('endDateTime', values.contestDuration[1].toISOString());
        
        // Handle strict mode
        if (isStrict) {
            // Check for validation errors
            if (emailErrors.length > 0) {
                message.error('Please fix invalid email addresses before submitting');
                return;
            }

            if (duplicateEmails.length > 0) {
                message.error('Please remove duplicate emails before submitting');
                return;
            }

            // Get all emails from textarea
            // Split by both newlines and commas
            const allEmails = emailList
                .split(/[\n,]+/)
                .map(email => email.trim().toLowerCase())
                .filter(email => email.length > 0);
            
            // Remove duplicates
            const uniqueEmails = [...new Set(allEmails)];
            
            if (uniqueEmails.length === 0) {
                message.error('Please provide at least one email for restricted participation');
                return;
            }

            // Send emails as JSON array
            formData.append('allowJoinEmails', JSON.stringify(uniqueEmails));
        } else {
        if (values.maxParticipants) {
            formData.append('maxParticipants', values.maxParticipants.toString());
            }
        }

        if (file) {
            formData.append('image', file);
        } else if (!contest?.banner) {
            message.error('Please upload a contest banner');
            return;
        }

        handleSubmit(formData, () => {
            form.resetFields();
            setFile(null);
            setFileList([]);
            setConfirmDay(false);
            setIsStrict(false);
            setEmailList("");
            setEmailErrors([]);
            setDuplicateEmails([]);
        });
    };

    return (
        <StyledContestForm>
            <Form
                form={form}
                layout="vertical"
                className='form-style'
                onFinish={onFinish}
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
                <Form.Item label="Contest Banner" required style={{ textAlign: "left" }}>
                    <Upload
                        beforeUpload={(file) => {
                            setFile(file);
                            setFileList([{
                                uid: file.name + Date.now(),
                                name: file.name,
                                status: 'done',
                                originFileObj: file
                            } as UploadFile]);
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
                    {contest?.banner && !file && (
                        <div style={{ marginTop: 8 }}>
                            <small>Current image:</small>
                            <br />
                            <Image src={contest.banner} alt="current banner" width={100} />
                        </div>
                    )}
                </Form.Item>
                <Form.Item>
                    <Checkbox 
                        checked={isStrict} 
                        onChange={(e) => {
                            setIsStrict(e.target.checked);
                            if (e.target.checked) {
                                form.setFieldValue('maxParticipants', undefined);
                            }
                        }}
                    >
                        Restrict participation by email only
                    </Checkbox>
                </Form.Item>

                {!isStrict ? (
                <Form.Item
                    label="Max number of participants"
                    name="maxParticipants"
                    tooltip="Enter 0 for unlimited participants"
                >
                    <Input 
                        placeholder='Input max number of participants (0 for unlimited)' 
                        className='input'
                        type="number"
                        min={0}
                    />
                    <small style={{ color: '#888', marginTop: 4, display: 'block' }}>
                        {form.getFieldValue('maxParticipants') === 0 ? '∞ Unlimited participants' : ''}
                    </small>
                </Form.Item>
                ) : (
                    <Space direction="vertical" style={{ width: '100%' }} size="middle">
                        <Alert
                            message="Restricted Mode"
                            description="Only users with specified emails can join this contest. Max participants limit is disabled."
                            type="info"
                            showIcon
                        />
                        
                        <Form.Item 
                            label="Enter emails (one per line)"
                            validateStatus={(emailErrors.length > 0 || duplicateEmails.length > 0) ? "error" : ""}
                            help={(emailErrors.length > 0 || duplicateEmails.length > 0) ? `${emailErrors.length} invalid, ${duplicateEmails.length} duplicate(s)` : ""}
                        >
                            <TextArea
                                rows={6}
                                placeholder="Enter email addresses (one per line or comma-separated)&#10;example@email.com&#10;user@domain.com, another@email.com"
                                value={emailList}
                                onChange={handleEmailListChange}
                                status={(emailErrors.length > 0 || duplicateEmails.length > 0) ? "error" : ""}
                            />
                            {emailErrors.length > 0 && (
                                <Alert
                                    message="Invalid Emails"
                                    description={
                                        <ul style={{ margin: 0, paddingLeft: 20 }}>
                                            {emailErrors.slice(0, 5).map((error, index) => (
                                                <li key={index} style={{ fontSize: '12px' }}>{error}</li>
                                            ))}
                                            {emailErrors.length > 5 && (
                                                <li style={{ fontSize: '12px', fontStyle: 'italic' }}>
                                                    ...and {emailErrors.length - 5} more
                                                </li>
                                            )}
                                        </ul>
                                    }
                                    type="error"
                                    showIcon
                                    style={{ marginTop: 8 }}
                                />
                            )}
                            {duplicateEmails.length > 0 && (
                                <Alert
                                    message="Duplicate Emails Found"
                                    description={
                                        <ul style={{ margin: 0, paddingLeft: 20 }}>
                                            {duplicateEmails.slice(0, 5).map((error, index) => (
                                                <li key={index} style={{ fontSize: '12px' }}>{error}</li>
                                            ))}
                                            {duplicateEmails.length > 5 && (
                                                <li style={{ fontSize: '12px', fontStyle: 'italic' }}>
                                                    ...and {duplicateEmails.length - 5} more
                                                </li>
                                            )}
                                        </ul>
                                    }
                                    type="warning"
                                    showIcon
                                    style={{ marginTop: 8 }}
                                />
                            )}
                        </Form.Item>

                        <Form.Item label="Or import from Excel file">
                            <Upload
                                accept=".xlsx,.xls"
                                beforeUpload={handleExcelUpload}
                                showUploadList={false}
                                maxCount={1}
                            >
                                <Button icon={<FileExcelOutlined />}>
                                    Upload Excel File (must have email column)
                                </Button>
                            </Upload>
                            <small style={{ color: '#888', marginTop: 4 }}>
                                Imported emails will be added to the textarea above
                            </small>
                        </Form.Item>
                    </Space>
                )}
                <Form.Item>
                    <Button loading={isLoading} type="primary" htmlType="submit" block className="create-btn">
                        Save
                    </Button>
                </Form.Item>

            </Form>
        </StyledContestForm>

    );
}
export default ContestForm;