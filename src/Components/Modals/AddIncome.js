import React from 'react';
import {Button,Modal,Form,Input,DatePicker,Select} from 'antd';

const AddIncome = ({isIncomeModalVisible,handleIncomeCancel,onFinish}) => {
    const [form] = Form.useForm();

  

    return (
        <Modal 
        style={{fontWeight:600}}
        title='Add Income'
        visible={isIncomeModalVisible}
        onCancel={handleIncomeCancel}
        footer={null}
        >
        <Form form={form} layout="vertical" onFinish={(value)=>{
            onFinish(value,"income");
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
               message: 'Please input your Income amount!' 
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
               message: 'Please select Income Date!' 
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
                   <Select.Option value="salary">Salary</Select.Option> 
                   <Select.Option value="rent">Rent</Select.Option>
                   <Select.Option value="investment">Investment</Select.Option>
                   <Select.Option value="others">Others</Select.Option>                    
               </Select>
           </Form.Item>
           <Form.Item>
               <Button className='btn btn-blue' type='primary' htmlType='submit'>Add Expense</Button>
           </Form.Item>
        </Form>

       </Modal>
    );
}

export default AddIncome;
