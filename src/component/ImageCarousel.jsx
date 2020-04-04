import React, { Component } from 'react';
import {ArrowBackIosOutlined, ArrowForwardIosOutlined} from '@material-ui/icons';
import PropTypes from 'prop-types';
import 'decoration/ImageCarousel.css';

class ImageCarouselItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {children, size, unit} = this.props;

        return (
            <li className="image-carousel__item" style = {{
                'flex': `0 0 ${size}${unit}`
            }}>
                {children}
            </li>
        );
    }
}

class ImageCarousel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item_size: 0,
            size_unit: '%',
            offset_start: 0,
            offset_end: -1,
            carousel_length: props.children.length,
            slideToShow: 0,
            slideToScroll: 0,
        }
        this.adjustCarousel = this.adjustCarousel.bind(this);
        this._onResize = this._onResize.bind(this);
        this._handlePrev = this._handlePrev.bind(this);
        this._handleNext = this._handleNext.bind(this);
        // this.createResponsive = this.createResponsive.bind(this);
        
    }
    componentDidMount() {
        const wrapper = this._wrapper;

        this._onResize();
        window.addEventListener('resize', this._onResize);
        this._list.addEventListener('transitionend', function(e) {
            this.style.transition = '';
        });
    }

    _onResize() {
        const {responsive: res, default_setting} = this.props;
        let targetSetting = null;

        res.forEach((media, index) => {
            let cssMedia = window.matchMedia(`(max-width: ${media.breakpoint}px)`);

            if(cssMedia.matches) {
                targetSetting = media.setting;
            }
        });

        targetSetting = targetSetting || default_setting;
        this.adjustCarousel(targetSetting);
    }

    createResponsive() {
        // const {responsive: res, default_setting} = this.props;

        // res.forEach((media, index) => {
        //     let nextMedia = (index < res.length - 1) ? res[index + 1] : null;
        //     let cssMedia;

        //     if(nextMedia) {
        //         cssMedia = window.matchMedia(`(max-width: ${media.breakpoint}px) and (min-width: ${nextMedia.breakpoint}px)`);
        //     }
        //     else {
        //         cssMedia = window.matchMedia(`(max-width: ${media.breakpoint}px)`);
        //     }

        //     if(cssMedia.matches) {
        //         this.adjustCarousel(media.setting);
        //     }

        //     cssMedia.addEventListener('change', (e) => {                             
        //         if(cssMedia.matches) {
        //             this.adjustCarousel(media.setting);
        //         }
        //     });
        // });
    }
    /**
     * 
     * @param {MediaQueryList} cssMedia - css media query
     * @param {Object} setting - carousel setting
     */
    adjustCarousel(setting) {
        let item_setting = {
            item_size: `${100 / setting.slideToShow}`,
            size_unit: '%',
        };

        if(setting.unit && setting.unit === 'px') {
            const wrapper_size = this._wrapper.clientWidth;
            item_setting = {
                item_size: `${wrapper_size / setting.slideToShow}`,
                size_unit: 'px',
            };
        }        

        this.setState((prevState, props) => {
            let newOffsetEnd = prevState.offset_start + (setting.slideToShow - 1);

            if(newOffsetEnd >= prevState.carousel_length)
                newOffsetEnd = prevState.carousel_length - 1;

            return {
                slideToShow: setting.slideToShow,
                slideToScroll: setting.slideToScroll,
                ...item_setting,
                offset_start: prevState.offset_start,
                offset_end: newOffsetEnd,
            };             
        });
    }

    _handlePrev() {
        const {offset_start, slideToScroll} = this.state;
        let scrollOffset = slideToScroll;

        if(offset_start - scrollOffset < 0)
            scrollOffset = offset_start;

        if(scrollOffset <= 0)
            return;
        
        this._list.style.transition = 'transform 0.3s ease';
        this.setState((prevState) => {
            return {
                offset_start: prevState.offset_start - scrollOffset,
                offset_end: prevState.offset_end - scrollOffset,
            };
        });
    }
    _handleNext() {
        const {offset_end, slideToScroll, carousel_length} = this.state;
        let scrollOffset = slideToScroll;

        if(offset_end + scrollOffset >= carousel_length)
            scrollOffset = carousel_length - 1 - offset_end;

        if(scrollOffset <= 0)
            return;
        
        this._list.style.transition = 'transform 0.3s ease';
        this.setState((prevState) => {
            return {
                offset_start: prevState.offset_start + scrollOffset,
                offset_end: prevState.offset_end + scrollOffset,
            };
        });
    }

    render() {
        const {children} = this.props;
        const {
            offset_start,
            offset_end,
            carousel_length,
            item_size,
            size_unit
        } = this.state;
        const items = React.Children.map(children, (child, index) => {
            return (
                <ImageCarouselItem key={index} size = {item_size} unit = {size_unit}>
                    {child}
                </ImageCarouselItem>
            );
        });
        const listStyle = {
            transform: `translateX(${-offset_start * item_size}${size_unit})`
        };

        return ( 
            <div className="image-carousel">
                <div 
                    className="image-carousel__itemlist-wrapper" 
                    ref = {w => (this._wrapper = w)}
                >
                    <ul
                        className="image-carousel__itemlist"
                        style={listStyle}
                        ref = {l => (this._list = l)}
                    >
                        {items}
                    </ul>                    
                </div>
                <div 
                    className="image-carousel__arrow image-carousel__arrow--prev"
                    onClick = {this._handlePrev}
                    style = {{
                        visibility: (offset_start <= 0) ? 'hidden' : 'visible'
                    }}
                >
                    <ArrowBackIosOutlined style={{fontSize: `16px`}} />
                </div>
                <div
                    className="image-carousel__arrow image-carousel__arrow--next"
                    onClick = {this._handleNext}
                    style = {{
                        visibility: (offset_end >= carousel_length - 1) ? 'hidden' : 'visible'
                    }}
                >
                    <ArrowForwardIosOutlined style={{fontSize: `16px`}} />
                </div>
            </div>
        );
    }
}

ImageCarousel.propTypes = {
    default_setting: PropTypes.object.isRequired,
    responsive: PropTypes.array,
};
 
export default ImageCarousel;