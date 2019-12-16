import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import RootReducer from './reducers';

// Build Middleware
const middleware = applyMiddleware(
    thunk
);

// Build Store
let store = null;
if(process.env.NODE_ENV === 'production') {
    store = createStore( 
        RootReducer,
        {},
        middleware
    )
} else {
    // Dev environment
    store = createStore(
        RootReducer,
        composeWithDevTools(
            middleware
        )
    )
}

export default store;