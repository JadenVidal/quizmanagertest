import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routes from './Routes';


import {Provider} from 'react-redux'
import store from './store'


const Element = (props) =>{
    return (
        <Provider store={store}>
            <Routes />
        </Provider>
    )
}

ReactDOM.render(<Element />, document.getElementById('root'));