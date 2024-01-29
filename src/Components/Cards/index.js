import React from 'react';
import './style.css';
import { Card, Row } from 'antd';
import Button from '../Button';

function Cards  ({ 
  income, 
  expense, 
  totalbalance,
  showExpenseModal, 
  showIncomeModal, 
  resetBalance
   }) {
  return (
    <div>
      <Row className="my-row">
        <Card bordered={true} className="my-card" >
          <h2>Current Balance</h2>
          <p>₹{totalbalance}</p>
          <Button text="Reset Balance" blue={true} onClick={resetBalance} />
        </Card>
        <Card bordered={true} className="my-card"  >
          <h2>Total Income</h2>
          <p>₹{income}</p>
          <Button text="Add Income" blue={true} onClick={showIncomeModal} />
        </Card>
        <Card bordered={true} className="my-card"  >
          <h2>Total Expenses</h2>
          <p>₹{expense}</p>
          <Button text="Add Expenses" blue={true} onClick={showExpenseModal} />
        </Card>
      </Row>
    </div>
  );
};

export default Cards;
