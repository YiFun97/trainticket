import React, { useCallback, useMemo } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import './App.css'
import Header from '../common/Header';
import DepartDate from './DepartDate';
import HighSpeed from './HighSpeed';
import Journey from './Journey';
import Submit from './Submit';
import CitySelector from '../common/CitySelector'
import DateSelector from '../common/DateSelector'
import {
    exchangeFromTo,
    showCitySelector,
    hideCitySelector,
    fetchCityData,
    setSelectedCity,
    showDateSelector,
    hideDateSelector,
    setDepartDate,
    toggleHighSpeed,
} from './actions';
import { h0 } from '../common/fp';

function Apps(props) {
    const { from, to,
        isCitySelectorVisible,
        isDateSelectorVisible,
        cityData,
        isLoadingCityData,
        dispatch,
        departDate,
        highSpeed
     } = props
    console.log('form::', from)

    const onBack = useCallback(() => {
        window.history.back()
    }, [])

        //cityselector的要用的函数
    const CitySelectorCbs = useMemo(()=>{
        return bindActionCreators({
            onBack: hideCitySelector,
            fetchCityData,
            onSelect:setSelectedCity
        },dispatch)
    },[])

    const cbs = useMemo(() => {
        return bindActionCreators(
            {
                exchangeFromTo,
                showCitySelector,
            },
            dispatch
        );
    }, []);
    const departDateCbs = useMemo(() => {
        return bindActionCreators(
            {
                onClick: showDateSelector,
            },
            dispatch
        );
    }, []);

    const dateSelectorCbs = useMemo(()=>{
        return bindActionCreators(
            {
                onBack:hideDateSelector,
               
            },dispatch
        )
    })
    const highSpeedCbs = useMemo(()=>{
        return bindActionCreators({
            toggle:toggleHighSpeed
        },dispatch)
    },[])

    const onSelectDate = useCallback((day)=>{
        if(!day){
            return 
        }
        if(day < h0()){
            return 
        }
        dispatch(setDepartDate(day))
        dispatch(hideDateSelector())
    },[])

    return (
        <div>
            <div className="header-wrapper">
                <Header title="车票预订" onBack={onBack} />
            </div>
            <form action="./query.html" className="form">
                <Journey from={from}
                    to={to} {...cbs}
                />
                <DepartDate  
                time={departDate}
                {...departDateCbs}
                />
                <HighSpeed 
                highSpeed={highSpeed}
                {...highSpeedCbs}
                />

                <Submit />
            </form>
            <CitySelector 
              show={isCitySelectorVisible}
              cityData={cityData}
              isLoading={isLoadingCityData}
              {...CitySelectorCbs}
              /> 
              <DateSelector 
              show={isDateSelectorVisible}
              {...dateSelectorCbs}
              onSelect={onSelectDate}
              />
        </div>
    )
}
const mapStateToProps = (state) => {
    return { ...state };
}
const mapDispatchToProps = (dispatch) => {
    return { dispatch };
}
const App = connect(
    mapStateToProps, mapDispatchToProps)(Apps)
export default App
