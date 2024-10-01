import React from 'react'
import BackButton from '../../components/ui/BackButton'
import { Collapse } from 'antd'
import { useGetFaqQuery } from '../../redux/api/manageApis';
const { Panel } = Collapse;




const Faqs = () => {
        const {data : getFaqs} = useGetFaqQuery()
        const middleIndex = Math.ceil((getFaqs?.data?.length || 0) / 2);
        const firstHalf = getFaqs?.data?.slice(0, middleIndex);
        const secondHalf = getFaqs?.data?.slice(middleIndex);

    return (
        <div className='px-5 md:px-0'>
            <BackButton pageName={'FAQs'}/>
            {/* FAQs section */}
            <div>
                <h1 className='mb-2 font-semibold'>FAQs: </h1>
                <p className='pb-4 leading-7  '>Welcome to Biding Website, your premier destination for dynamic, competitive e-commerce bidding! Our platform is designed to connect buyers and sellers through exciting auctions, offering a wide range of products at unbeatable prices. Whether you're looking for the latest electronics, fashion, home essentials, or rare collectibles, Biding Website provides a transparent and secure environment for everyone to participate in the thrill of online bidding.</p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5 py-5'>
                <div>
                    <Collapse>
                        {firstHalf?.map(panel => (
                            <Panel key={panel.key} header={panel.question}  className='panel-margin space-y-5'>
                            {panel.answer}
                        </Panel>
                        ))}
                    </Collapse>
                </div>
                <div>
                    <Collapse>
                        {secondHalf?.map(panel => (
                            <Panel key={panel.key} header={panel.question}>
                                {panel.answer}
                            </Panel>
                        ))}
                    </Collapse>
                </div>
            </div>

        </div>
    )
}

export default Faqs 