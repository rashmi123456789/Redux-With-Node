const redux = require("redux");
const thunkMiddleware = require("redux-thunk").default;
const axios = require("axios");
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;

const initialState = {
    loading : false,
    users:[],
    error:''
}

//Actions

const FETCH_USER_LOADING = 'FETCH_USER_LOADING';
const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
const FETCH_USER_FAILIURE = 'ETCH_USER_FAILIURE';

//Action creaters

const fetchUserLoading = ()=>{
    return {
        type: FETCH_USER_LOADING
    }
}
const fetchUserSuccess= user =>{
    return {
        type: FETCH_USER_SUCCESS,
        payload:user
    }
}
const fetchUserFailiure= error =>{
    return {
        type: FETCH_USER_FAILIURE,
        payload:error
    }
}

//Reducer

const reducer = (state=initialState , action) =>{
    switch(action.type){
        case FETCH_USER_LOADING: return{
            ...state,
            loading:true,
        }

        case FETCH_USER_SUCCESS: return{
            loading:false,
            user:action.payload,
            error:''
        }

        case FETCH_USER_FAILIURE:return{
            loading:false,
            user:[],
            error:action.payload
        }
    }
}

//Async ation creator using redux thunk

const fetchUsers = () =>{
    return function(dispatch){
        dispatch(fetchUserLoading());
        axios.get("https://jsonplaceholder.typicode.com/users")
        .then(response=>{
            const users = response.data.map(user=>user.id);
            dispatch(fetchUserSuccess(users));
        })
        .catch(error=>{
            const errorMessage = error.errorMessage;
            dispatch(fetchUserFailiure(errorMessage));
        })
    }
}

//Store
const store = createStore(reducer,applyMiddleware(thunkMiddleware));

store.subscribe(()=>{
    console.log(store.getState());
})

store.dispatch(fetchUsers());
