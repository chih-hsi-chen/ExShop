import React from 'react';
import './App.css';
import Header from 'component/Header.jsx';
import Carousel from 'component/Carousel.jsx';
import CategoryList from 'component/CategoryList.jsx';
import ProductCardList from 'component/ProductCardList.jsx';

function App() {
    return (
        <div className="main-container">
            <Header />
            <main>
                <Carousel />
                <CategoryList />
                <ProductCardList />
            </main>
        </div>
    );
}

export default App;
