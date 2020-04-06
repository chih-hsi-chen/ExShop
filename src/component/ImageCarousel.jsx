import React, { Component } from 'react';
import {ArrowBackIosOutlined, ArrowForwardIosOutlined} from '@material-ui/icons';
import PropTypes from 'prop-types';
import 'decoration/ImageCarousel.css';

function lerp(a, b, n) {
    return (1 - n) * a + n * b;
}

const ImageCarouselDot = (props) => {
    const activeClass = props.isActive? 'image-carousel__dot--active': '';

    return (
        <div
            className = {`image-carousel__dot ${activeClass}`}
            onClick = {() => props.handleClick(props.offset)}
        >
        </div>
    );
}

class ImageCarouselItem extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {children, size, unit} = this.props;

        return (
            <li 
                className="image-carousel__item" 
                style = {{
                    'flex': `0 0 ${size}${unit}`
                }}
                ref = {s => (this._slide = s)}
            >
                {children}
            </li>
        );
    }
}

class ImageCarousel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            size: 0,
            unit: '%',
            offset_start: 0,
            offset_end: -1,
            slideToShow: 0,
            slideToScroll: 0,
            draggable: false,
            dragOffset: 0,
        };
        this.adjustCarousel = this.adjustCarousel.bind(this);
        this._onResize = this._onResize.bind(this);
        this._handlePrev = this._handlePrev.bind(this);
        this._handleNext = this._handleNext.bind(this);
        this.bindDragEvents = this.bindDragEvents.bind(this);

        this.isTouch = false;
        this.isDragging = false;
        this.startoffX = 0;
        this.mouseonX = 0;
        this.currentX = 0;
        this.lastX = 0;
        this.rAF = undefined;

        this.bindDragEvents();
    }

    bindDragEvents() {        
        [
            'run',
            'setPos',
            'dragStart',
            'dragEnd',
            'addDragEvents',
            'removeDragEvents',
            'requestAnimationFrame',
            'cancelAnimationFrame',

        ].forEach((fn) => {            
            this[fn] = this[fn].bind(this);
        });
    }

    componentDidMount() {
        this._onResize();
        window.addEventListener('resize', this._onResize);
        this._list.addEventListener('transitionend', function(e) {
            this.style.transition = '';
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(nextState.draggable !== this.state.draggable) {
            if(nextState.draggable) {
                // add drag event
                this.addDragEvents();
            } else {
                // remove drag event
                this.removeDragEvents();
            }
        }

        return true;
    }
    run() {
        this.lastX = lerp(this.lastX, this.currentX, 0.1);
        this.lastX = Math.floor(this.lastX * 100) / 100;

        // only when dragging or dragend(fail to slide over) need to update dragOffset
        if(this.isDragging || (this.currentX === 0 && this.lastX !== 0)) {
            this.setState((prevState) => {
                return {
                    dragOffset: this.getDragOffset(),
                };
            });
        }

        this.requestAnimationFrame();
    }
    setPos(e) {
        const wrapperRect = this._wrapper.getBoundingClientRect();
        let magnitude;
        e.preventDefault();

        if(!this.isDragging) return;        
        if(this.isTouch)
            e = this.getTouchClient(e);

        this.currentX = (e.clientX - wrapperRect.left - this.mouseonX) * 1.2;
        magnitude = (this.currentX >= 0) ? 1 : -1;

        this.currentX = magnitude * Math.min(Math.abs(this.currentX), wrapperRect.width / 2);
    }
    dragStart(e) {
        const wrapperRect = this._wrapper.getBoundingClientRect();
        e.preventDefault();
        
        if(this.isTouch)
            e = this.getTouchClient(e);
        
        this.isDragging = true;
        this.mouseonX = e.clientX - wrapperRect.left;
        this._wrapper.classList.add('dragging');
    }
    dragEnd(e) {
        const {dragOffset} = this.state;
        e.preventDefault();

        // move result snap
        if(Math.abs(dragOffset) >= 20.0) {
            let handleMove = (dragOffset > 0) ? this._handlePrev : this._handleNext;

            if(handleMove()) {
                this.lastX = 0;
                this.setState({
                    dragOffset: 0,
                });
            }
        }

        this.isDragging = false;
        this.currentX = 0;
        this._wrapper.classList.remove('dragging');
    }
    addDragEvents() {
        this.run();

        if('ontouchstart' in window) {
            this.isTouch = true;
            this._wrapper.addEventListener('touchmove', this.setPos, false);
            this._wrapper.addEventListener('touchstart', this.dragStart, false);
            this._wrapper.addEventListener('touchend', this.dragEnd, false);
        } else {
            this._wrapper.addEventListener('mousemove', this.setPos, false);
            this._wrapper.addEventListener('mousedown', this.dragStart, false);
            this._wrapper.addEventListener('mouseup', this.dragEnd, false);
        }
    }
    removeDragEvents() {
        this.cancelAnimationFrame();

        if('ontouchstart' in window) {
            this.isTouch = true;
            this._wrapper.removeEventListener('touchmove', this.setPos, false);
            this._wrapper.removeEventListener('touchstart', this.dragStart, false);
            this._wrapper.removeEventListener('touchend', this.dragEnd, false);
        } else {
            this._wrapper.removeEventListener('mousemove', this.setPos, false);
            this._wrapper.removeEventListener('mousedown', this.dragStart, false);
            this._wrapper.removeEventListener('mouseup', this.dragEnd, false);
        }
    }
    requestAnimationFrame() {
        this.rAF = requestAnimationFrame(this.run);
    }
    cancelAnimationFrame() {
        cancelAnimationFrame(this.rAF);
    }
    getTouchClient = (e) => {
        return e.targetTouches[0];
    }

    _onResize() {
        const {responsive: res, default_setting} = this.props;
        let targetSetting = default_setting;
        let defaultConfig = {
            unit: '%',
            draggable: false,
            infinite: false,
        };

        res.forEach((media) => {
            let cssMedia = window.matchMedia(`(max-width: ${media.breakpoint}px)`);

            if(cssMedia.matches) {
                targetSetting = media.setting;
            }
        });

        targetSetting = {
            ...defaultConfig,
            ...targetSetting,
        };        

        this.adjustCarousel(targetSetting);
    }
    /**
     * 
     * @param {MediaQueryList} cssMedia - css media query
     * @param {Object} setting - carousel setting
     */
    adjustCarousel(setting) {
        const {slideToShow} = setting;
        const carousel_length = this.props.children.length;
        let size =  `${100 / slideToShow}`;

        if(setting.unit === 'px') {
            const wrapper_size = this._wrapper.clientWidth;
            size = `${wrapper_size / slideToShow}`;
        }

        this.setState((prevState) => {
            let newOffsetEnd = prevState.offset_start + (slideToShow - 1);

            if(newOffsetEnd >= carousel_length)
                newOffsetEnd = carousel_length - 1;

            return {
                ...setting,
                size,
                offset_start: prevState.offset_start,
                offset_end: newOffsetEnd,
            };             
        });
    }

    _handlePrev() {
        const {offset_start, slideToScroll} = this.state;
        let scrollOffset = -slideToScroll;

        if(offset_start + scrollOffset < 0)
            scrollOffset = -offset_start;
        
        
        return this.move(scrollOffset);
    }
    
    _handleNext() {
        const carousel_length = this.props.children.length;
        const {offset_end, slideToScroll} = this.state;
        let scrollOffset = slideToScroll;

        if(offset_end + scrollOffset >= carousel_length)
            scrollOffset = carousel_length - 1 - offset_end;
        
        return this.move(scrollOffset);
    }
    /**
     * Move carousel by specific offset
     *
     * @param {Number} scrollOffset - scroll offset, 0 will be ignored
     */
    move = (scrollOffset) => {
        const carousel_length = this.props.children.length;
        const {offset_start, offset_end} = this.state;

        if(scrollOffset === 0)
            return false;
        if((offset_start + scrollOffset) < 0 || (offset_end + scrollOffset) >= carousel_length)
            return false;

        this._list.style.transition = 'transform 0.4s ease';
        this.setState((prevState) => {
            return {
                offset_start: prevState.offset_start + scrollOffset,
                offset_end: prevState.offset_end + scrollOffset,
            };
        });

        return true;
    }
    moveTo = (targetIndex) => {
        const length = React.Children.count(this.props.children);
        const {slideToShow} = this.state;        

        console.log(length);
        

        if(targetIndex < 0 || targetIndex > (length - slideToShow))
            return false;
        

        this._list.style.transition = 'transform 0.4s ease';
        this.setState((prevState) => {
            return {
                offset_start: targetIndex,
                offset_end: targetIndex + (slideToShow - 1),
            };
        });

        return true;
    }
    getDragOffset = () => {
        const {unit} = this.state;
        const wrapper_width = this._wrapper.clientWidth;

        if(unit === '%') {
            return this.lastX * 100 / wrapper_width;
        }
        
        return this.lastX;
    }
    createDots = (activeDotIndex) => {
        const {slideToShow} = this.state;
        const dots = React.Children.toArray(this.props.children).filter((child, index) => {
            if(index % slideToShow === 0) {
                return true;
            }
            return false;
        });
        
        return dots.map((dot, index) => {
            let active = (index === activeDotIndex);

            return (
                <ImageCarouselDot
                    key = {index}
                    offset = {index * slideToShow}
                    handleClick = {this.moveTo}
                    isActive = {active}
                />
            );
        });
    }

    render() {
        const {children} = this.props;
        const {
            offset_start,
            offset_end,
            slideToShow,
            size,
            unit,
            draggable,
            dots,
            dragOffset,
        } = this.state;
        const carousel_length = this.props.children.length;
        const activeDotIndex = Math.floor(offset_start / slideToShow);
        const items = React.Children.map(children, (child, index) => {
            return (
                <ImageCarouselItem
                    key={index} 
                    size = {size}
                    unit = {unit}
                >
                    {child}
                </ImageCarouselItem>
            );
        });
        let listStyle = {
            transform: `translateX(${-offset_start * size}${unit})`
        };

        if(draggable) {
            listStyle.transform = `translateX(${-offset_start * size + dragOffset}${unit})`
        }

        return ( 
            <div 
                className="image-carousel"
                ref = {w => (this._wrapper = w)}
            >
                <div className="image-carousel__itemlist-wrapper">
                    <ul
                        className="image-carousel__itemlist"
                        style={listStyle}
                        ref = {l => (this._list = l)}
                    >
                        {items}
                    </ul>                    
                </div>
                { (offset_start > 0) && (
                    <div 
                        className="image-carousel__arrow image-carousel__arrow--prev"
                        onClick = {this._handlePrev}
                    >
                        <ArrowBackIosOutlined style={{fontSize: `16px`}} />
                    </div>
                )}
                { (offset_end < carousel_length - 1) && (
                    <div
                        className="image-carousel__arrow image-carousel__arrow--next"
                        onClick = {this._handleNext}
                    >
                        <ArrowForwardIosOutlined style={{fontSize: `16px`}} />
                    </div>
                )}
                {
                    (dots) && (
                        <div className="image-carousel__dot-list">
                            {this.createDots(activeDotIndex)}
                        </div>
                    )
                }
            </div>
        );
    }
}

ImageCarousel.propTypes = {
    default_setting: PropTypes.object.isRequired,
    responsive: PropTypes.array,
};

/**
 * default_setting:
 * - slideToShow: the number of slides to be displayed
 * - slideToScroll: the number of slides to be scrolled at once
 * - draggable: if slides are draggable or not
 * - infinite: if slides play is loop
 * - unit: '%' | 'px'
 * - dots: boolean, if display dots at bottom
 */
ImageCarousel.defaultProps = {
    default_setting: {
        slideToShow: 1,
        slideToScroll: 1,
        draggable: false,
        infinite: false,
        dots: false,
    },
    responsive: [
        
    ]
};
 
export default ImageCarousel;