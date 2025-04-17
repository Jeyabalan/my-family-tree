import { Button, Form, Input, Modal, Select, Space } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React, { useEffect, useState } from 'react';

const { Option } = Select

const App: React.FC = () => {
  const [form] = useForm()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [parentList, setParentList] = useState<string[]>([])

  const familyTree = {
    headDetails: { name: "MuthuKamachi Pillai", imageUrl: '' },
    wifeDetails: { name: "lakshmi", imageUrl: '' },
  }

  useEffect(() => {
    
  }, [familyTree])

  const add = () => {
    const formvalue = form.getFieldsValue()
    console.log(formvalue)
  }

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
          <Form.Item>
            <Button type='primary' htmlType='submit'>Add</Button>
          </Form.Item>
        </Form>
      </Modal>
    </Space>
  );
};

export default App;
