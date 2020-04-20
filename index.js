const redux = require("redux");
const reduxLogger = require("redux-logger");
const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
const logger = reduxLogger.createLogger();
const applyMiddleware = redux.applyMiddleware;

//Action
const BUY_CAKE = 'BUY_CAKE';
const BUY_ICECREAM = 'BUY_ICECREAM';

//Action creaters
const buyCake= function(){
    return {
        type: BUY_CAKE
    } 
}

const buyIcrecream= function(){
    return {
        type: BUY_ICECREAM
    } 
}

//Initial states
const initialCakeState = {
    numOfCakes : 10,
    info : "The best cakes"
}

const initialIceCreamState = {
    numOfIceCreams : 20,
    info : "The best Icecreams"
}

// Reducer
const cakeReducer = (state = initialCakeState,action)=>{
    switch(action.type){
        case BUY_CAKE: return{
            ...state,
            numOfCakes:state.numOfCakes + 1 
        }

        default: return state
    }
}

const icecreamReducer = (state = initialIceCreamState,action)=>{
    switch(action.type){
        case BUY_ICECREAM : return{
            ...state,
            numOfIceCreams: state.numOfIceCreams +1
        }
        default: return state;
    }
}

// Store with combined Reducers
const rootReducer = combineReducers({
    cake:cakeReducer,
    iceream:icecreamReducer
});

const store = createStore(rootReducer,applyMiddleware(logger));
console.log("Initial States " + store.getState() );

const unsubscribe = store.subscribe(()=>{
    // console.log(store.getState())
});

store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());

store.dispatch(buyIcrecream());
store.dispatch(buyIcrecream());
store.dispatch(buyIcrecream());

unsubscribe();

