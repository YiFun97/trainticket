import { createStore, combineReducers, applyMiddleware } from 'redux';

import reducers from './reducers';
import thunk from 'redux-thunk';

export default createStore(
    combineReducers(reducers),
    {
        trainNumber: null,
        departStation: null,
        arriveStation: null,
        seatType: null, //座位类型
        departDate: Date.now(),
        arriveDate: Date.now(), 
        departTimeStr: null, //出发时间
        arriveTimeStr: null,//达到时间
        durationStr: null, //行程时间
        price: null, //票价
        passengers: [], //乘客信息
        menu: null, //弹出菜单
        isMenuVisible: false,
        searchParsed: false,
    },
    applyMiddleware(thunk)
)