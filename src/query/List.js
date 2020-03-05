import React, { memo, useMemo } from 'react';
import URI from 'urijs';
import PropTypes from 'prop-types';
import './List.css';
import dayjs from 'dayjs'
const ListItem = memo(function ListItem(props) {

    //dTime出发时间 atime到达时间 dstation 离开车站 astation 到达车站 trainnumber 车次  date出发日期 Pricemsg价格字符串 dayafter是否跨越日期
    const {
        dTime,
        aTime,
        dStation,
        aStation,
        trainNumber,
        date,
        time,
        priceMsg,
        dayAfter,
        dating
    } = props;
    //点击跳转下一个页面 传递一些 参数到url
    const url = useMemo(() => {
        return new URI('ticket.html')
            .setSearch('aStation', aStation)
            .setSearch('dStation', dStation)
            .setSearch('trainNumber', trainNumber)
            .setSearch('date', dayjs(dating).format('YYYY-MM-DD'))
            .toString();
    }, [aStation, dStation, trainNumber, dating]);

    return (
        <li className="list-item">
            <a href={url} >
                <span className="item-time">
                    <em>{dTime}</em>
                    <br />
                    <em className="em-light">
                        {aTime} <i className="time-after">{dayAfter}</i>
                    </em>
                </span>
                <span className="item-stations">
                    <em>
                        <i className="train-station train-start">始</i>
                        {dStation}
                    </em>
                    <br />
                    <em className="em-light">
                        <i className="train-station train-end">终</i>
                        {aStation}
                    </em>
                </span>
                <span className="item-train">
                    <em>{trainNumber}</em>
                    <br />
                    <em className="em-light">{time}</em>
                </span>
                <span className="item-ticket">
                    <em>{priceMsg}</em>
                    <br />
                    <em className="em-light-orange">可抢票</em>
                </span>
            </a>
        </li>
    );
});

ListItem.propTypes = {
    dTime: PropTypes.string.isRequired,
    aTime: PropTypes.string.isRequired,
    dStation: PropTypes.string.isRequired,
    aStation: PropTypes.string.isRequired,
    trainNumber: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    priceMsg: PropTypes.string.isRequired,
    dayAfter: PropTypes.string.isRequired,
};

const List = memo(function List(props) {
    const { list,dating } = props;

    return (
        <ul className="list">
            {list.map(item => (
                <ListItem {...item} key={item.trainNumber} dating={dating}/>
            ))}
        </ul>
    );
});

List.propTypes = {
    list: PropTypes.array.isRequired,
};

export default List;
