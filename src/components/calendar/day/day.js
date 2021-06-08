import React, {Component} from 'react';
import { Card, CardText, Button} from 'reactstrap';

export default class Day extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item : {
        id: "",
        email: "",
        name: "",
        price: 0,
        timeCheckIn: "10.00",
        booking: false,
        email_agent: "zubarev.sergey.1993@gmail.com" 
      },
      activeBooking : true
    }
  }
  
  async onAddItem ({ day, numberMonth, year, price}) {
    await this.setState({
      item: {
        id: `${day}-${numberMonth}-${year}`,
        price,
        booking: true
      },
      activeBooking : false
    })

    this.props.add(this.state.item)
  }


  async onDeleteItem ({ day, numberMonth, year, price}) {
    await this.setState({
      item: {
        id: `${day}-${numberMonth}-${year}`,
        price,
        booking: true
      },
      activeBooking : true
    })

    this.props.delete(this.state.item)
  }

  render() {
    const {day, weekend, bookingDay, data: {year, numberMonth}} = this.props.day;
    const {activeBooking} = this.state;
    let price = 0,
      getBookingDayInfo;

    weekend ? price = 30 : price = 10;

    if (bookingDay) {
      getBookingDayInfo = this.props.day.data.data.filter( elem => elem.id === `${day}-${numberMonth}-${year}`)
    }

    if (!day) {
      return (
        <td>
        </td>
      );
    } else if (bookingDay) {
      return (
        <td className="card">
          <Card body inverse color="danger">
            <CardText>
              {day}/{numberMonth +1}/{year}
            </CardText>
            <CardText>
              {`Забронировал :             
              ${getBookingDayInfo[0].name}`}
            </CardText>
            <CardText>
            </CardText>
          </Card>
        </td>
      )
    } else if (!bookingDay) {
      return (
        <td>
        <Card body inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
          <CardText>
            {day}/{numberMonth+1}/{year}
          </CardText>
          <CardText>
            Цена: {price} руб./сут.
          </CardText>
            {activeBooking ? 
              <Button
                onClick={() => this.onAddItem({day, numberMonth, year, price})}>
                Забронировать
              </Button>
                :
              <Button
                onClick={() => this.onDeleteItem({day, numberMonth, year, price})}>
                Отменить
              </Button>
            }
        </Card>
        </td>
      );
    } 



  }
}
