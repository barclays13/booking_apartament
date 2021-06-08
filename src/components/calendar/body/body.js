import React, {Component} from 'react';
import Day from '../day/day';
import { Table } from 'reactstrap';

export default class Body extends Component {

    getDay = (date) => {
        let day = date.getDay();
        if (day === 0) day = 7; 
        return day - 1;
    }
  
    setData (data) {
        this.props.add(data)
    }

    setDeletData (data) {
        this.props.delete(data)
    }

  render() {
    const days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
        {year, numberMonth, data} = this.props.data;

    let d = new Date(year, numberMonth);
    const daysInMonth = 32 - new Date(year, numberMonth, 32).getDate();

    const countEmptyDays = this.getDay(d);

    let fullMonth = [],
        weekend = false,
        bookingDay = false;
    
    for( let i = 0; i < countEmptyDays; i++) {
        fullMonth.push('');
    }

    for ( let i = 1; i <= daysInMonth; i++) {
        fullMonth.push(i);
    }

    return (
        <Table responsive>
            <thead>
                <tr>
                    {days.map(day => <th key={day}>{day}</th>)}
                </tr>
            </thead>
            <tbody>
                <tr>
                    { fullMonth.map((day, index) => {
                        if (Object.keys(data).length !== 0){
                            let bookingBoolen = data.find(elem => elem.id === `${day}-${numberMonth}-${year}`)             
                            bookingBoolen ? bookingDay = true : bookingDay = false
                        }
                        
                       (index === 5 || index === 6) ? weekend = true : weekend = false

                        if (day === "" && index < 7) {
                            return( 
                                <Day key={`${day+Math.random()}${numberMonth}${year}`} day={{
                                    day,
                                    weekend,
                                    data : this.props.data
                                }}
                                add={(data) => this.setData(data)}
                                delete={(data) => this.setDeletData(data)}/>
                            )   
                        }

                        if (day !== "" && index < 7) {
                            return( 
                                <Day key={`${day}${numberMonth}${year}`} day={{
                                    day,
                                    weekend,
                                    data : this.props.data,
                                    bookingDay
                                }}
                                add={(data) => this.setData(data)}
                                delete={(data) => this.setDeletData(data)}/>
                            )    
                        }
                        return false;
                    })}
                </tr>   
                <tr>
                    { fullMonth.map((day, index) => {
                        if (Object.keys(data).length !== 0){
                            let bookingBoolen = data.find(elem => elem.id === `${day}-${numberMonth}-${year}`)             
                            bookingBoolen ? bookingDay = true : bookingDay = false
                        }
                       (index === 12 || index === 13) ? weekend = true : weekend = false

                        if (index > 6 && index < 14) {
                            return( 
                                <Day key={`${day}${numberMonth}${year}`} day={{
                                    day,
                                    weekend,
                                    data : this.props.data,
                                    bookingDay
                                }}
                                add={(data) => this.setData(data)}
                                delete={(data) => this.setDeletData(data)}/>
                            )    
                        }
                        return false;
                    })}
                </tr>
                <tr>
                    { fullMonth.map((day, index) => {
                        if (Object.keys(data).length !== 0){
                            let bookingBoolen = data.find(elem => elem.id === `${day}-${numberMonth}-${year}`)             
                            bookingBoolen ? bookingDay = true : bookingDay = false
                        }
                       (index === 19 || index === 20) ? weekend = true : weekend = false

                        if (index > 13 && index < 21) {
                            return( 
                                <Day key={`${day}${numberMonth}${year}`} day={{
                                    day,
                                    weekend,
                                    data : this.props.data,
                                    bookingDay
                                }}
                                add={(data) => this.setData(data)}
                                delete={(data) => this.setDeletData(data)}/>
                            )    
                        }
                        return false;
                    })}
                </tr>
                <tr>
                    { fullMonth.map((day, index) => {
                        if (Object.keys(data).length !== 0){
                            let bookingBoolen = data.find(elem => elem.id === `${day}-${numberMonth}-${year}`)             
                            bookingBoolen ? bookingDay = true : bookingDay = false
                        }
                        (index === 26 || index === 27) ? weekend = true : weekend = false

                        if (index > 20 && index < 28) {
                            return( 
                                <Day key={`${day}${numberMonth}${year}`} day={{
                                    day,
                                    weekend,
                                    data : this.props.data,
                                    bookingDay
                                }}
                                add={(data) => this.setData(data)}
                                delete={(data) => this.setDeletData(data)}/>
                            )    
                        }
                        return false;
                    })}
                </tr>
                <tr>
                    { fullMonth.map((day, index) => {
                        if (Object.keys(data).length !== 0){
                            let bookingBoolen = data.find(elem => elem.id === `${day}-${numberMonth}-${year}`)             
                            bookingBoolen ? bookingDay = true : bookingDay = false
                        }
                        (index === 33 || index === 34) ? weekend = true : weekend = false

                        if (index > 27 && index < 35) {
                            return( 
                                <Day key={`${day}${numberMonth}${year}`} day={{
                                    day,
                                    weekend,
                                    data : this.props.data,
                                    bookingDay
                                }}
                                add={(data) => this.setData(data)}
                                delete={(data) => this.setDeletData(data)}/>
                            )    
                        }
                        return false;
                    })}
                </tr>
                <tr>
                    { fullMonth.map((day, index) => {
                        if (Object.keys(data).length !== 0){
                            let bookingBoolen = data.find(elem => elem.id === `${day}-${numberMonth}-${year}`)             
                            bookingBoolen ? bookingDay = true : bookingDay = false
                        }
                        (index === 40 || index === 41) ? weekend = true : weekend = false

                        if (index > 34 && index < 42) {
                            return( 
                                <Day key={`${day}${numberMonth}${year}`} day={{
                                    day,
                                    weekend,
                                    data : this.props.data,
                                    bookingDay
                                }}
                                add={(data) => this.setData(data)}
                                delete={(data) => this.setDeletData(data)}/>
                            )    
                        }
                        return false;
                    })}
                </tr>
            </tbody>
        </Table>
    );
  }
}
