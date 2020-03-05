import { createStore, combineReducers, applyMiddleware } from 'redux';

import reducers from './reducers';
import thunk from 'redux-thunk';

export default createStore(
    combineReducers(reducers),
    {
        departDate: Date.now(), //出发日期 URL参数获取
        arriveDate: Date.now(), //到达日期 服务的数据接口获取
        departTimeStr: null, //出发时间 服务的数据接口获取
        arriveTimeStr: null, //到达时间 服务的数据接口获取
        departStation: null, //出发车站
        arriveStation: null, //到达车站
        trainNumber: null,  //车次 URL获取
        durationStr: null, // 服务的数据接口获取
        tickets: [], //坐席类型和出票形式
        isScheduleVisible: false, //时刻表显示隐藏
        searchParsed: false, //解析URL的状态 变为true才可以异步数据请求以及渲染
    },
    applyMiddleware(thunk)
)