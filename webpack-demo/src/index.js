import _ from 'lodash';
import printMe from './print.js';
// import './style.css';
// import Icon from './icon.jpeg';
// function component() {
//     let element = document.createElement('div');
//     element.innerHTML = _.join(['hello', 'webpack'] , '');
//     element.classList.add('hello');

//     var myIcon = new Image();
//     myIcon.src = Icon;
//     element.appendChild(myIcon);
//     return element;
// }
// document.body.appendChild(component());

if('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(registeration => {
            console.log('SW registered:', registeration);
        }).catch(registerationError => {
            console.log('SW registration failed:', registerationError);
        })
    })
}