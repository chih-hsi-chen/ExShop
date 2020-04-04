import React, { Component } from 'react';
import {
    ArrowBackOutlined,
} from '@material-ui/icons';
import 'decoration/Carousel.css';

class Carousel extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <React.Fragment>
                <section className="hero-banner">
                    <div className="carousel__container">
                        <button className="carousel__btn carousel__btn--prev">
                            <ArrowBackOutlined name="arrow-back-outline" id="prevArrow" />
                        </button>
                        <div className="carousel__slide">
                            <div className="carousel__item"></div>
                        </div>
                        <button className="carousel__btn carousel__btn--next">
                            <ArrowBackOutlined name="arrow-back-outline" id="nextArrow" />
                        </button>
                        <ul className="carousel__dots">
                            <li className="dot slide-active">
                                <button>1</button>
                            </li>
                            <li className="dot">
                                <button>2</button>
                            </li>
                            <li className="dot">
                                <button>3</button>
                            </li>
                            <li className="dot">
                                <button>4</button>
                            </li>
                        </ul>
                    </div>                  
                </section>
            </React.Fragment>
        );
    }
}

export default Carousel;