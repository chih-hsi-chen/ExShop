import React from 'react';
import './App.css';
import Header from 'component/Header.jsx';
import Carousel from 'component/Carousel.jsx';
import CategoryList from 'component/CategoryList.jsx';
import ProductCardList from 'component/ProductCardList.jsx';
import FeatureList from 'component/FeatureList.jsx';

function App() {
    return (
        <div className="main-container">
            <Header />
            <main>
                <Carousel />
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
        </div>
    );
}

export default App;
