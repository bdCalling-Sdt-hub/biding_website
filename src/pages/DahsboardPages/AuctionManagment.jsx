import React, { useState } from 'react';
import img1 from '../../assets/prod1.png'
import img2 from '../../assets/prod2.png'
import { Form, Input, Modal, Table, Upload } from 'antd';
import { CiEdit, CiSearch } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Button from '../../components/ui/Button';
import { IoAddOutline } from 'react-icons/io5';
import TextArea from 'antd/es/input/TextArea';
import { PlusOutlined } from '@ant-design/icons';
import CreateUpdateAuctionModal from '../../components/ui/CreateUpdateAuctionModal';
const AuctionManagment = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)




  const columns = [
    {
      title: "Order ID",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Auction Item",
      dataIndex: "name",
      key: "name",
      render: (_, record) => {
        return (
          <div className="flex items-center gap-2">
            <img
              src={record?.img}
              className="w-[40px] h-[40px] rounded-[8px]"
              alt=""
            />
            <p className="font-medium">{record?.name}</p>
          </div>
        );
      },
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },

    {
      title: "Reserved Bid",
      dataIndex: "reservedBid",
      key: "reservedBid",
    },
    {
      title: "Reserved Bid",
      dataIndex: "reservedBid",
      key: "reservedBid",
    },
    {
      title: "Increment Value",
      dataIndex: "incrementValue",
      key: "incrementValue",
    },
    {
      title: "Start Date & Time",
      dataIndex: "statingAndEndTime",
      key: "statingAndEndTime",
    },


    {
      title: "Status",
      dataIndex: "status",
      key: "status",

      render: (_, record) => {
        return (
          <div className="flex items-center justify-center gap-1">
            <button
              className={`px-8 min-w-32 py-2 rounded-3xl font-semibold  border 
    ${record?.status === 'Active' ? 'border-[#338BFF] text-[#338BFF] hover:bg-[#338BFF]' :
                  record?.status === 'Upcoming' ? 'border-[#F3A211 text-[#F3A211] hover:bg-[#F3A211] hover:text-white' :
                    record?.status === 'Complete' ? 'border-[#2AB9A4] text-[#2AB9A4] hover:bg-[#2AB9A4]' : ''} 
    hover:text-white`}
            >
              <p className='hover:text-white '>
                {record?.status}
              </p>
            </button>

          </div>
        );
      },
      align: "center",
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => (
        <div className="flex items-center gap-2">
          <a href="#edit" onClick={() => {
            // setModalData(record)
            setIsModalOpen(true)
          }} className="bg-yellow text-white p-1 rounded-sm"><CiEdit size={20} /></a>
          <a href="#delete" className="bg-[#D9000A] text-white p-1 rounded-sm"><RiDeleteBin6Line size={20} /></a>
        </div>
      ),
    },
  ];


  const dataSource = [
    {
      key: "#12333",
      name: "Kathryn Murphy",
      img: img1,
      category: "Electronics",
      reservedBid: "2",
      incrementValue: "1 cent",
      statingAndEndTime: "10/06/24 at 4:45 PM",
      status: "Active"

    },
    {
      key: "#12333",
      name: "Kathryn Murphy",
      img: img1,
      category: "Electronics",
      reservedBid: "2",
      incrementValue: "1 cent",
      statingAndEndTime: "10/06/24 at 4:45 PM",
      status: "Upcoming"

    },
    {
      key: "#12333",
      name: "Kathryn Murphy",
      img: img1,
      category: "Electronics",
      reservedBid: "2",
      incrementValue: "1 cent",
      statingAndEndTime: "10/06/24 at 4:45 PM",
      status: "Complete"

    },

  ];

  return (
    <div className='p-5 bg-white rounded-md'>

      <div className="flex justify-between item-center ">
        <div className="flex items-center gap-2">
          <Link to={-1}><FaArrowLeft size={18} className='text-yellow' /></Link>
          <span className='font-semibold text-[20px]'>Auction Mangment</span>
        </div>
        <div>
          <Button className='flex  items-center px-5 py-2' onClick={()=> setIsModalOpen(true)} ><IoAddOutline /> Create Auction</Button>
        </div>
      </div>


      <div className='mt-5'>
        <Table dataSource={dataSource} columns={columns} className="custom-pagination" pagination={{
          pageSize: 5,
          showTotal: (total, range) => `Showing ${range[0]}-${range[1]} out of ${total}`,
          locale: {
            items_per_page: '',
            prev_page: 'Previous',
            next_page: 'Next',
          },
        }} />
      </div>


      
      <CreateUpdateAuctionModal setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} />

    </div>
  );
}

export default AuctionManagment;
