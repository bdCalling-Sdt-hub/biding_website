import React from 'react'
import BackButton from '../../components/ui/BackButton'
import { useParams } from 'react-router-dom'
import phone1 from '../../assets/phone1.png'
import phone2 from '../../assets/phone2.png'
import phone3 from '../../assets/phone3.png'
import phone4 from '../../assets/phone4.png'
import user from '../../assets/user4.png'
import ProductCard from '../../components/ui/ProductCard'
import { IoLocationOutline } from 'react-icons/io5'
import { Table } from 'antd'
import Button from '../../components/ui/Button'



const columns = [
    {
        title: 'Bid',
        dataIndex: 'bid',
        key: 'bid',
    },
    {
        title: 'User',
        dataIndex: 'user',
        key: 'user',
        render: (user) => (
            <div className="flex items-center">
                <img
                    src={user.image}
                    alt={user.name}
                    style={{ width: 40, height: 40, borderRadius: '50%', marginRight: 10 }}
                />
                <span>{user.name}</span>
            </div>
        ),
    },
    {
        title: 'Time',
        dataIndex: 'time',
        key: 'time',
    },
];

const data = [
    {
        key: '1',
        bid: '$548.00',
        user: {
            name: 'Ronald Richards',
            image: user,
        },
        time: '04:45:58 PM',
    },
    {
        key: '1',
        bid: '$547.00',
        user: {
            name: 'Ronald Richards',
            image: user,
        },
        time: '04:45:58 PM',
    },

];

const ProductDetails = () => {
    const { id } = useParams()
    console.log(id);
    return (
        <div>
            <BackButton pageName={"Product Details"} />
            <div className='grid grid-cols-12 gap-5'>
                <div className=' col-span-12 lg:col-span-10 mx-5 lg:mx-0'>
                    <div className='flex  flex-col lg:flex-row justify-between gap-10'>
                        <div className='w-full '>
                            <div>
                                <img src={phone1} className='w-full' alt="" />
                            </div>
                            <div className='flex justify-between mt-2 gap-2 '>
                                <img src={phone2} className='w-[110px] h-[80px] md:w-full md:h-full' alt="" />
                                <img src={phone3} className='w-[110px] h-[80px] md:w-full md:h-full' alt="" />
                                <img src={phone4} className='w-[110px] h-[80px] md:w-full md:h-full' alt="" />
                            </div>

                            <div className='bg-white rounded-md p-5 mt-5'>
                                <h1 className='text-[#2E2E2E] pb-2'>Winner of this product in the last 30 days.</h1>
                                <Table columns={columns} dataSource={data} size="middle" pagination={false} />
                            </div>
                        </div>
                        <div className='bg-white py-5 px-8 w-full rounded-md'>
                            <h1 className='text-[26px] font-semibold'>Apple iPhone 14 Pro Max</h1>
                            <div className='flex justify-between py-5'>
                                <p>Current BID:</p>
                                <p className='text-[#338BFF] text-[26px] font-semibold'>$548.00</p>
                            </div>
                            <p>Current Highest Bidder</p>
                            <div className='flex items-center gap-5 mt-5 mb-5'>
                                <img src={user} alt="" />
                                <div>
                                    <p className='font-semibold text-[20px]'>Ronald Richards</p>
                                    <p className='flex items-center gap-2'> <IoLocationOutline className='text-yellow' /> 2715 Ash Dr. San Jose, South Dakota</p>
                                </div>
                            </div>


                            {/* bid table */}
                            <Table columns={columns} dataSource={data} size="middle" pagination={false} />

                            <div className='text-center mt-5'>
                                <h1 className='text-[36px] font-medium text-[#338BFF]'>00:00:09</h1>
                                <p>Time Left</p>
                            </div>


                            <div className='flex gap-5 justify-between mt-5 lg:px-10'>
                                <button className='border py-3 border-[#9F9F9F] rounded-lg w-full text-[#9F9F9F] hover:bg-yellow hover:text-white '>Number of Bids</button>
                                <Button className=''>Book BidBuddy</Button>
                            </div>
                            <p className='text-[#585858] pt-5 px-10'>BidBuddy is your Automatic Bidding Tool. Book any number of bids. Each bid will be placed for you before the timer reaches zero. The first bid will be placed immediately.</p>

                        </div>
                    </div>

                    {/* description */}
                    <div className='bg-white mt-5 p-5 rounded-md'>
                        <h1 className='font-semibold text-[20px]'>Description: </h1>
                        <p className='text-[#2E2E2E] mt-5'>The Samsung 32 Y1G Y Series 32-Inch Android TV is Give your eyes pleasure with the 16M Display colors. You can connect anything with the Samsung TV Y series, very useful connections, including video games and your favorite binge-worthy TV shows. From its meticulously crafted exterior to its powerful performance capabilities, every aspect of this device exudes sophistication and class. Undoubtedly, the iPhone 14 Pro Max asserts its dominance as a leader in the ever-evolving landscape of exceptional iPhones.</p>
                        <p className='my-5 font-medium'>iPhone 14 Pro Max Features
                        </p>
                        <div className='space-y-2'>
                            <li>Redefined the design in more polished way and solid construction with strong material
                            </li>
                            <li>The innovative dynamic island punch hole manifests important notifications
                            </li>
                            <li>Emergency SOS via satellite to lend a hand in an urgent situation anywhere
                            </li>
                            <li>Triple camera with bigger lenses for capturing jaw-dropping pictures
                            </li>
                            <li>Action mode  comes to bring smoothness and stability to videos
                            </li>
                        </div>
                    </div>
                </div>

                <div className='col-span-12 lg:col-span-2  px-5 lg:px-0'>
                    <p className='font-medium text-[18px] pb-5'>Upcoming Auction:</p>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4'>
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails 