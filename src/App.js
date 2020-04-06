import React from 'react';
import './App.css';
import Header from 'component/Header.jsx';
import HeroBanner from 'component/HeroBanner.jsx';
import CategoryList from 'component/CategoryList.jsx';
import ProductCardList from 'component/ProductCardList.jsx';
import FeatureList from 'component/FeatureList.jsx';
import Footer from 'component/Footer.jsx';

function App() {
    return (
        <div className="main-container">
            <Header />
            <main>
                <HeroBanner 
                    data = {
                        [
                            {
                                image: '1585153114_EimnJ6'
                            },
                            {
                                image: '1585713488_MR5uJ3'
                            },
                            {
                                image: '1585758154_Udj9DC'
                            },
                            {
                                image: '1585894852_uQYw2r'
                            },
                        ]
                    }
                />
                <CategoryList />
                <ProductCardList
                    sec_name = '限時特賣'
                    ref_link = '/browse?ref_sec=flash-sale'
                />
                <ProductCardList
                    sec_name = '熱銷排行榜'
                    ref_link = '/browse?ref_sec=rank'
                />
                <FeatureList />
            </main>
            <Footer />
        </div>
    );
}

export default App;
