import React from 'react';
import {Button,Modal,Form,Input,Select, DatePicker} from 'antd';


const AddExpense = ({isExpenseModalVisible,handleExpenseCancel,onFinish}) => {

    const [form] = Form.useForm();


    return (
        <Modal 
         style={{fontWeight:600}}
         title='Add Expense'
         visible={isExpenseModalVisible}
         onCancel={handleExpenseCancel}
         footer={null}
         >
         <Form form={form} layout="vertical" onFinish={(value)=>{
            onFinish(value,"expense");
            form.resetFields();
        }}>
            <Form.Item 
             style={{fontWeight:600}}
             label="Name"
             name="name" 
             rules={[{ 
                required: true,
                message: 'Please input your name!' 
             }]}            
            >
                <Input type='text' className='custom-input' />
            </Form.Item>
            <Form.Item 
             style={{fontWeight:600}}
             label="Amount" 
             name="amount" 
             rules={[{ 
                required: true,
                message: 'Please input your expnse amount!' 
             }]}            
            >
                <Input type='number' className='custom-input' />
            </Form.Item>
            <Form.Item 
             style={{fontWeight:600}}
             label="Date" 
             name="date" 
             rules={[{ 
                required: true,
                message: 'Please select expens Date!' 
             }]}            
            >
                <DatePicker className='custom-input' format='YYYY-MM-DD'/>
            </Form.Item>
            <Form.Item 
             style={{fontWeight:600}}
             label="Tag" 
             name="tag" 
             rules={[{ 
                required: true,
                message: 'Please select a tag!' 
             }]}            
            >
                <Select className='select-input-2'>
                    <Select.Option value="Food">Food</Select.Option>
                    <Select.Option value="Eduction">Eduction</Select.Option>
                    <Select.Option value="Office">Office</Select.Option>
                    <Select.Option value="Transport">Transport</Select.Option>
                    <Select.Option value="Others">Others</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item>
                <Button className='btn btn-blue' type='primary' htmlType='submit'>Add Expense</Button>
            </Form.Item>
         </Form>

        </Modal>
    );
}

export default AddExpense;
