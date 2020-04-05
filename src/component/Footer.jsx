import React, { Component } from 'react';
import logo from 'images/logo_large.png';
import 'decoration/Footer.css';

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render() {
        return (
            <footer class="ex-footer">
                <div class="l-wrapper">
                    <div class="footer__links">
                        <section class="f-link" name="purchase">
                            <h1 class="f-link__title">購買</h1>
                            <ul class="f-link__list">
                                <li class="f-link__item">
                                    <a href="#">全館商品分類</a>
                                </li>
                                <li class="f-link__item">
                                    <a href="#">本月新品</a>
                                </li>
                                <li class="f-link__item">
                                    <a href="#">熱銷排行榜</a>
                                </li>
                                <li class="f-link__item">
                                    <a href="#">季節限定</a>
                                </li>
                                <li class="f-link__item">
                                    <a href="#">限時特價</a>
                                </li>
                            </ul>
                        </section>
                        <section class="f-link" name="help">
                            <h1 class="f-link__title">幫助</h1>
                            <ul class="f-link__list">
                                <li class="f-link__item">
                                    <a href="#">最新公告</a>
                                </li>
                                <li class="f-link__item">
                                    <a href="#">常見問答</a>
                                </li>
                                <li class="f-link__item">
                                    <a href="#">退貨辦法</a>
                                </li>
                            </ul>
                        </section>
                        <section class="f-link" name="policy">
                            <h1 class="f-link__title">政策</h1>
                            <ul class="f-link__list">
                                <li class="f-link__item">
                                    <a href="#">隱私權政策</a>
                                </li>
                                <li class="f-link__item">
                                    <a href="#">會員條款</a>
                                </li>
                            </ul>
                        </section>
                        <section class="f-link" name="about">
                            <h1 class="f-link__title">關於 ExShop</h1>
                            <ul class="f-link__list">
                                <li class="f-link__item">
                                    <a href="#">關於我們</a>
                                </li>
                                <li class="f-link__item">
                                    <a href="#">聯絡我們</a>
                                </li>
                                <li class="f-link__item">
                                    <a href="#">加入 ExShop</a>
                                </li>
                            </ul>
                        </section>
                        <section class="f-link" name="follow">
                            <h1 class="f-link__title">追蹤 ExShop</h1>
                            <ul class="f-link__list">
                                <li class="f-link__item">
                                    <a href="#" class="follow-link">
                                        <ion-icon class="follow-link__icon" name="logo-instagram"></ion-icon>
                                        <span>Instagram</span>
                                    </a>
                                </li>
                                <li class="f-link__item">
                                    <a href="#" class="follow-link">
                                        <ion-icon class="follow-link__icon" name="logo-twitter"></ion-icon>
                                        <span>Twitter</span>
                                    </a>
                                </li>
                                <li class="f-link__item">
                                    <a href="#" class="follow-link">
                                        <ion-icon class="follow-link__icon" name="logo-facebook"></ion-icon>
                                        <span>Facebook</span>
                                    </a>
                                </li>
                                <li class="f-link__item">
                                    <a href="#" class="follow-link">
                                        <ion-icon class="follow-link__icon" name="logo-youtube"></ion-icon>
                                        <span>Youtube</span>
                                    </a>
                                </li>
                            </ul>
                        </section>
                    </div>
                    <div class="footer__static">
                        <div class="static__logo">
                            <a href="#">
                                <img src={logo} alt="ExShop" />
                            </a>
                            <span class="static__slogan">Explore the style you wonder.</span>
                        </div>
                        <div class="static__others">
                            <span class="copyright">© 2020 ExShop. All Rights Reserved.</span>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;