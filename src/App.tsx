import { Button, Form, GetProp, Input, message, Modal, Select, Space, Upload, UploadProps } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useForm } from 'antd/es/form/Form';
import React, { useEffect, useState } from 'react';

const { Option } = Select

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const App: React.FC = () => {
  const [form] = useForm()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [parentList, setParentList] = useState<string[]>([])
  const [imageUrl, setImageUrl] = useState<string>();
  const [loading, setLoading] = useState(false);

  const familyTree = {
    headDetails: { name: "MuthuKamachi Pillai", imageUrl: '' },
    wifeDetails: { name: "lakshmi", imageUrl: '' },
  }

  useEffect(() => {
    // setParentList([])
  }, [familyTree])

  const add = () => {
    const formvalue = form.getFieldsValue()
    console.log(formvalue)
  }

  const getBase64 = (img: FileType, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const handleChange: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as FileType, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <Space>
      <Button type='primary' onClick={() => setIsModalOpen(true)}>Add Member</Button>
      <Modal title="Add Family Members" open={isModalOpen} footer={null} onCancel={() => setIsModalOpen(false)}>
        <Form form={form} onFinish={add}>
          <Form.Item name='relation'>
            <Select placeholder="Select Parent Name">
              {parentList.map((value: string, index: number) =>
                <Option>{value}</Option>
              )}
            </Select>
          </Form.Item>
          <Form.Item name='head'>
            <Input placeholder='Name of the Head' />
          </Form.Item>
          <Form.Item name='wife'>
            <Input placeholder='Wife of the Head' />
          </Form.Item>
          <Form.Item name="photo">
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit'>Add</Button>
          </Form.Item>
        </Form>
      </Modal>
    </Space>
  );
};

export default App;
