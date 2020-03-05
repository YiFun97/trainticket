import { createStore, combineReducers, applyMiddleware } from 'redux';

import reducers from './reducers';
import thunk from 'redux-thunk';

import { h0 } from '../common/fp';
import { ORDER_DEPART } from './constant';

export default createStore(
    combineReducers(reducers),
    {
        from: null,
        to: null,
        departDate: h0(Date.now()),
        highSpeed: false,
        trainList: [],
        orderType: ORDER_DEPART, //出发早到晚 耗时短到长
        onlyTickets: false,  //只看有票
        ticketTypes: [], //坐席类型 所有选项
        checkedTicketTypes: {}, // 坐席类型 选中
        trainTypes: [], //车次类型 所有选项
        checkedTrainTypes: {}, // 车次类型 选中
        departStations: [], //出发车站 所有选项 
        checkedDepartStations: {}, //出发车站 选中
        arriveStations: [], //到达车站 所有选项
        checkedArriveStations: {}, //到达车站 选中
        departTimeStart: 0, //
        departTimeEnd: 24,
        arriveTimeStart: 0,
        arriveTimeEnd: 24,
        isFiltersVisible: false,
        searchParsed: false,
    },
    applyMiddleware(thunk)
);
