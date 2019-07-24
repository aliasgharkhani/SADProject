import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


ReactDOM.render(<App/>, document.getElementById('root'));
if (document.getElementsByClassName('slick-prev')[0] !== undefined) {
    document.getElementsByClassName('slick-prev')[0].style.left = '20px';
    document.getElementsByClassName('slick-prev')[0].style.zIndex = '20';
    document.getElementsByClassName('slick-next')[0].style.right = '20px';
    document.getElementsByClassName('slick-next')[0].style.zIndex = '20';
    document.getElementsByClassName('slick-dots')[0].style.bottom = '7px';
    document.getElementsByClassName('slick-dots')[0].style.zIndex = '20';
}
if (document.getElementsByClassName('public-DraftStyleDefault-block')[0] !== undefined) {

}
document.getElementsByClassName('search')[0].firstChild.style.width = '100%';
document.getElementsByClassName('prompt')[0].style.fontFamily= 'B Yekan';
document.getElementsByClassName('results')[0].style.width = '100%';


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
