import React from 'react';
import './style.css';

const NoTransactions = () => {
    return (
        <div className='no-transaction'>
            <img src='https://img.freepik.com/premium-vector/online-banking-e-money-transfer-credit-debit-card-success-transaction-3d-icon-vector_92753-14078.jpg' />
            <p>You Have No Transactions Currently</p>
        </div>
    );
}

export default NoTransactions;
