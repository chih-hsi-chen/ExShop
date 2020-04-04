import React, { Component } from 'react';
import ImageCarousel from 'component/ImageCarousel.jsx';
import 'decoration/CategoryList.css';

class CategoryItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imagesrc: null,
        };
        this.loadImage = this.loadImage.bind(this);
    }

    loadImage(imageName) {
        import(`images/${imageName}.png`).then(image => {
            this.setState({
                imagesrc: image.default
            });
        });
    }

    componentDidMount() {
        this.loadImage(this.props.image);
    }

    render() {
        const {props, state} = this;
        let {imagesrc} = state;

        return (
            <a className="category-item" href="#">
                <div className="category-item__image">
                    <div className="category-item__background"></div>
                    <picture>
                        <img className="image" src={imagesrc} alt=""/>
                    </picture>
                </div>                
                <h1 className="category-item__header">
                    {props.name}
                </h1>
            </a>
        );
    }
}

class CategoryList extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            items: [
                {
                    name: '洋裝',
                    image: 'png/dress',
                    catid: 100,
                },
                {
                    name: '女上衣',
                    image: 'png/woman-t-shirts',
                    catid: 100,
                },
                {
                    name: '裙子',
                    image: 'png/woman-skirts',
                    catid: 100,
                },
                {
                    name: '女鞋',
                    image: 'png/woman-shoes',
                    catid: 100,
                },
                {
                    name: '牛仔褲',
                    image: 'png/clothes',
                    catid: 100,
                },
                {
                    name: '男T恤',
                    image: 'png/man-tshirts',
                    catid: 100,
                },
                {
                    name: '男短褲',
                    image: 'png/man-shorts',
                    catid: 100,
                },
                {
                    name: '男外套',
                    image: 'png/jackets',
                    catid: 100,
                },
                {
                    name: '男眼鏡',
                    image: 'png/glasses',
                    catid: 100,
                },
                {
                    name: '男長褲',
                    image: 'png/man-pants',
                    catid: 100,
                },
                {
                    name: '帽子',
                    image: 'png/hat',
                    catid: 100,
                },
                {
                    name: '兒童服裝',
                    image: 'png/dress',
                    catid: 100,
                },
                {
                    name: '襪子',
                    image: 'png/dress',
                    catid: 100,
                },
                {
                    name: '手錶',
                    image: 'png/dress',
                    catid: 100,
                },
                {
                    name: '斜背包',
                    image: 'png/dress',
                    catid: 100,
                },
                {
                    name: '圍巾',
                    image: 'png/dress',
                    catid: 100,
                },
                {
                    name: '毛衣',
                    image: 'png/dress',
                    catid: 100,
                },
                {
                    name: '皮鞋',
                    image: 'png/dress',
                    catid: 100,
                },
                {
                    name: '涼鞋',
                    image: 'png/dress',
                    catid: 100,
                },
                {
                    name: '髮飾',
                    image: 'png/dress',
                    catid: 100,
                },
                {
                    name: '髮飾',
                    image: 'png/dress',
                    catid: 100,
                },
                {
                    name: '髮飾',
                    image: 'png/dress',
                    catid: 100,
                },
            ]
        };
    }
    render() {
        const {items} = this.state;
        let list = items.map(function(item, index) {
            return (
                <CategoryItem key={index} {...item}/>
            );
        });

        return (
            <section className="homepage-section category-list" id="category-section">
                <div className="l-wrapper">
                    <div className="homepage-section__header" id="category-list__header">
                        <h1>商品分類</h1>
                    </div>
                    <div className="homepage-section__content">
                        <ImageCarousel
                            default_setting = {
                                {
                                    slideToShow: 10,
                                    slideToScroll: 10,
                                }
                            }
                            responsive = {
                                [
                                    {
                                        breakpoint: 1200,
                                        setting: {
                                            slideToShow: 8,
                                            slideToScroll: 8,
                                        }
                                    },
                                    {
                                        breakpoint: 900,
                                        setting: {
                                            slideToShow: 5,
                                            slideToScroll: 5,
                                        }
                                    },
                                    {
                                        breakpoint: 600,
                                        setting: {
                                            slideToShow: 3,
                                            slideToScroll: 3,
                                        }
                                    }
                                ]
                            }
                        >
                            {list}
                        </ImageCarousel>
                    </div>
                </div>
            </section>            
        );
    }
}

export default CategoryList;