import React from 'react';
import { Line, Pie } from '@ant-design/charts';

const ChartComponent = ({ shortTransactions }) => {
  const data = shortTransactions.map((item) => {
    return { date: item.date, amount: item.amount };
  });

  const spendingData = shortTransactions
    .filter((transaction) => transaction.type === 'expense')
    .map((transaction) => ({ tag: transaction.tag, amount: transaction.amount }));

  const lineConfig = {
    data :data,
    width: 500,
    autoFit: true,
    xField: 'date',
    yField: 'amount',
  };

  const pieConfig = {
    data: spendingData,
    width: 500,
    angleField: 'amount',
    colorField: 'tag',
  };

  let lineChart;
  let pieChart;

  return (
    <div className='charts-wrapper'>
      <div>
        <h2>Your Analytics</h2>
        <Line {...lineConfig} onReady={(chartInstance) => (lineChart = chartInstance)} />
      </div>
      <div>
        <h2>Your Spendings</h2>
        <Pie {...pieConfig} onReady={(chartInstance) => (pieChart = chartInstance)} />
      </div>
    </div>
  );
};

export default ChartComponent;