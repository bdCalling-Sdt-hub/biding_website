import React from 'react'
import BackButton from '../../components/ui/BackButton'
import { Collapse } from 'antd'
const { Panel } = Collapse;



const panels = [
    {
        key: '1',
        label: 'How do I create an account?',
        children: <p>Click on the "Sign Up" button at the top of the homepage. Fill out your personal information, including your name, email, and password. Verify your email by clicking the link sent to your inbox. Once completed, you’re ready to start!.</p>,
    },
    {
        key: '2',
        label: 'Panel Header 2',
        children: <p>Cats are small, carnivorous mammals that are often kept as pets. They are known for their agility and independence, and they have been associated with humans for thousands of years.</p>,
    },
    {
        key: '3',
        label: 'Panel Header 3',
        children: <p>Birds are warm-blooded vertebrates characterized by feathers, beaks, and laying hard-shelled eggs. They are found in a variety of habitats across the globe.</p>,
    },
    {
        key: '4',
        label: 'Panel Header 4',
        children: <p>Fish are aquatic animals that have gills and fins. They live in water and are an essential part of many aquatic ecosystems.</p>,
    },
    {
        key: '5',
        label: 'Panel Header 5',
        children: <p>Reptiles are cold-blooded vertebrates that include snakes, lizards, and turtles. They are known for their scaly skin and are found in a variety of environments.</p>,
    },
    {
        key: '6',
        label: 'Panel Header 6',
        children: <p>Amphibians are animals that can live both in water and on land. Examples include frogs, toads, and salamanders. They typically have a life cycle that includes both aquatic and terrestrial stages.</p>,
    },
    {
        key: '7',
        label: 'Panel Header 7',
        children: <p>Mammals are warm-blooded vertebrates that have hair or fur and produce milk to feed their young. Examples include humans, whales, and elephants.</p>,
    },
    {
        key: '8',
        label: 'Panel Header 8',
        children: <p>Insects are small arthropods with a three-part body, six legs, and often wings. They are the most diverse group of animals on Earth and play crucial roles in ecosystems.</p>,
    },
];
const Faqs = () => {


    const firstHalf = panels.slice(0, 4);
    const secondHalf = panels.slice(4, 8);

    // const middleIndex = Math.ceil(panels.length / 2);
    // const firstHalf = panels.slice(0, middleIndex);
    // const secondHalf = panels.slice(middleIndex);
    return (
        <div>
            <BackButton pageName={'FAQs'} />
            {/* FAQs section */}
            <div>
                <h1 className='mb-2 font-semibold'>FAQs: </h1>
                <p className='pb-4 leading-7  '>Welcome to Biding Website, your premier destination for dynamic, competitive e-commerce bidding! Our platform is designed to connect buyers and sellers through exciting auctions, offering a wide range of products at unbeatable prices. Whether you're looking for the latest electronics, fashion, home essentials, or rare collectibles, Biding Website provides a transparent and secure environment for everyone to participate in the thrill of online bidding.</p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5 py-5'>
                <div>
                    <Collapse>
                        {firstHalf.map(panel => (
                            <Panel key={panel.key} header={panel.label}  className='panel-margin space-y-5'>
                            {panel.children}
                        </Panel>
                        ))}
                    </Collapse>
                </div>
                <div>
                    <Collapse>
                        {secondHalf.map(panel => (
                            <Panel key={panel.key} header={panel.label}>
                                {panel.children}
                            </Panel>
                        ))}
                    </Collapse>
                </div>
            </div>

        </div>
    )
}

export default Faqs 