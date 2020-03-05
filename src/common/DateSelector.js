import React from 'react';
import classnames from 'classnames';
import PropTypes, { func } from 'prop-types';

import { h0 } from './fp';
import Header from './Header.js';

import './DateSelector.css';

function Day(props){
    const {
        day,onSelect
    } = props
    if(!day){
        return <td className="null"></td>
    }
 const classes =[]
 const now = h0()

 //day这个值是不是过去
 if(day < now ){
     classes.push('disabled')
 }
 //如果是周六或者周日
 if([6,0].includes(new Date(day).getDay())){  
    classes.push('weekend')
 }
 const dateString = now === day ? '今天' : new Date(day).getDate()
 return (
     <td className={classnames(classes)}
        onClick={()=>onSelect(day)}
     >
         {
             dateString
         }
     </td>
 )
}
Day.propTypes = {
    day: PropTypes.number,
    onSelect: PropTypes.func.isRequired,
};

function Week(props){
    const {days,onSelect}=props
    return(
        <tr className="date-table-days">
            {
                days.map((day,index)=>{
                    return <Day key={index} day={day} onSelect={onSelect}  />                 })
            }
        </tr>
    )
}

Week.propTypes = {
    days: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired,
};
function Month(props) {
    const { startingTimeInMonth, onSelect } = props;

    const startDay = new Date(startingTimeInMonth);
    const currentDay = new Date(startingTimeInMonth);

    let days = [];

    while (currentDay.getMonth() === startDay.getMonth()) {
        days.push(currentDay.getTime());
        currentDay.setDate(currentDay.getDate() + 1);
    }
    //日历第一行  起始是星期几 除了周日之外 周一周五时候 前面要补齐空白，比如周五时补齐 5-1个空白，当前月起始为周日的话 补齐6个
    days = new Array(startDay.getDay() ? startDay.getDay() - 1 : 6)
        .fill(null)
        .concat(days);
//日历最后一行的空白逻辑
    const lastDay = new Date(days[days.length - 1]);

    days = days.concat(
        new Array(lastDay.getDay() ? 7 - lastDay.getDay() : 0).fill(null)
    );


    const weeks = [];

    for (let row = 0; row < days.length / 7; ++row) {
        const week = days.slice(row * 7, (row + 1) * 7);
        weeks.push(week);
    }

    return (
        <table className="date-table">
            <thead>
                <tr>
                    <td colSpan="7">
                        <h5>
                            {startDay.getFullYear()}年{startDay.getMonth() + 1}
                            月
                        </h5>
                    </td>
                </tr>
            </thead>
            <tbody>
                <tr className="data-table-weeks">
                    <th>周一</th>
                    <th>周二</th>
                    <th>周三</th>
                    <th>周四</th>
                    <th>周五</th>
                    <th className="weekend">周六</th>
                    <th className="weekend">周日</th>
                </tr>
                {
                    weeks.map((week,index)=>{
                        return(
                            <Week 
                            key={index}
                            days={week}
                            onSelect={onSelect}
                            />
                        )
                    })
                }
            </tbody>
        </table>
    );
}

Month.propTypes = {
    startingTimeInMonth: PropTypes.number.isRequired,
    onSelect: PropTypes.func.isRequired,
};

export default function DateSelector(props) {
    const { show, onSelect, onBack } = props;

    const now = new Date();
    //清除小时分钟秒毫秒
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    now.setMilliseconds(0);
    //将日期重置为1号
    now.setDate(1);

    const monthSequence = [now.getTime()];

    now.setMonth(now.getMonth() + 1);
    monthSequence.push(now.getTime());

    now.setMonth(now.getMonth() + 1);
    monthSequence.push(now.getTime());

    return (
        <div className={classnames('date-selector', { hidden: !show })}>
            <Header title="日期选择" onBack={onBack} />
            <div className="date-selector-tables">
                {monthSequence.map(month => {
                    return (
                        <Month
                            key={month}
                            onSelect={onSelect}
                            startingTimeInMonth={month}
                        />
                    );
                })}
            </div>
        </div>
    );
}

DateSelector.propTypes = {
    show: PropTypes.bool.isRequired,
    // onSelect: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
};