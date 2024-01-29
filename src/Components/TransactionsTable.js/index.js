import { Radio, Select, Table } from 'antd';
import { Footer } from 'antd/es/layout/layout';
import { parse, unparse } from 'papaparse';
import React, { useState } from 'react';
import { IoIosSearch } from "react-icons/io";
import { toast } from 'react-toastify';

const TransactionsTable = ({ transactions,fetchTransactions,addTransction }) => {
  const { Option } = Select;
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [shortKey, setShortKey] = useState("");

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Tags',
      dataIndex: 'tag',
      key: 'tag',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
  ];

  const filterSearches = transactions.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()) &&
    item.type.includes(typeFilter)
  )
  const shortByKey = filterSearches.sort((a, b) => {
    if (shortKey === "date") {
      return new Date(a.date) - new Date(b.date);
    }
    else if (shortKey === "amount") {
      return a.amount - b.amount;
    }
    else {
      return 0
    }
  })
  const exportCSV=()=>{
    var csv = unparse({
      "fields": ["name","type","tag","date","amount"],
      data:transactions
    });
    var data = new Blob([csv], {type: 'text/csv;charset=utf-8;'});
    var url = URL.createObjectURL(data);
    const link=document.createElement("a");
    link.href=url;
    link.download ='transactions.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
   
  const importFromCSV =(e)=>{
      e.preventDefault();
      try{
        parse(e.target.files[0],{
          header:true,
          complete:async function(results){
          //Now result.data is an array of objects representiv csv rows
           for(const transaction of results.data){
            console.log("Transactions",transaction);
            const newTransaction={
              ...transaction,
              amount:parseFloat(transaction.amount),
            };
             await addTransction(newTransaction,true);
           }
          }
        });
         toast.success("All Transaction Added");
         fetchTransactions();
         e.target.files=null;
      }
      catch(err){
        console.log(err);
        toast.error("Couldnot add transaction!");
      }
  }
 

      return (
           <div style={{width:"100%" , padding:"0rem 2rem"}}>
           <div className='input-select'>
             <div className="input-flex">
                  <IoIosSearch />
                <input type="search" 
                  value={search}
                  onChange={(e)=>setSearch(e.target.value)}
                  placeholder="Search here"
               />
             </div> 
             <div>         
           <Select 
              className='select-input' 
              placeholder='Filter' value={typeFilter} 
              onChange={(value)=>setTypeFilter(value)} 
              allowClear
            >
            <Option value="">All</Option>
            <Option value="income">Income</Option>
            <Option value="expense">Expense</Option>
           </Select>
           </div> 
           </div>
           <div className="radio-options">
              <h1>My Transactions</h1>
           <Radio.Group
             className='input-radio'
             onChange={(e)=>setShortKey(e.target.value)}
             value={shortKey}
           >
               <Radio.Button value="">No sort</Radio.Button>
               <Radio.Button value="date">Sort By Date</Radio.Button>
               <Radio.Button value="amount">Sort By Amount</Radio.Button>
           </Radio.Group>
           <div className='csv-input'>
              <button className='btn' onClick={exportCSV}>Export to CSV</button>
              <label htmlFor="file-csv" className='btn btn-blue'>Import from CSV</label>
              <input onChange={importFromCSV} style={{display:"none"}} type="file" id='file-csv' accept='.csv' required  />
           </div>

            </div>
            <Table dataSource={filterSearches} columns={columns} />
           </div>
      )
}

export default TransactionsTable;
