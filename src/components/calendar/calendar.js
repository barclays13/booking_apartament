import React, { Component} from 'react';
import emailjs from 'emailjs-com';
import Caption from './caption/caption';
import Body from './body/body';
import Cart from './cart/cart';

import {
  Container,
  Row,
  Col
} from 'reactstrap';

export default class Calendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numberMonth: 0,
      nameMonth: 0,
      year: 0,
      arrNextDate: [],
      url: "https://booking-apartament-js-zubarev.herokuapp.com/",
      data: {},
      cart: []
    }
  }

  componentDidMount() {
    this.getData();
    const arrMonthName = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];
    const date = new Date();
    const monthNumberNow = date.getMonth()
    const yearNow = date.getFullYear()
    const arrNextDate = [];

    for (let i = 0; i < 12; i++) {
      let nextMonth = monthNumberNow + i;
      if (nextMonth >= 12) {
        nextMonth = nextMonth - 12;
      }

      let year = yearNow;
      if (monthNumberNow + i > 11) {
        year += 1;
      }

      arrNextDate.push({
        nameMonth: arrMonthName[nextMonth],
        year
      })
    }

    this.setState({
      numberMonth: monthNumberNow,
      nameMonth: arrMonthName[monthNumberNow],
      year: yearNow,
      arrNextDate: arrNextDate
    })
  }

  setData = (elem) => {
    const getNumberMonth = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'].indexOf(elem.nameMonth)

    this.setState({
      numberMonth: getNumberMonth,
      nameMonth: elem.nameMonth,
      year: elem.year
    })
  }

  async getData() {
    let response = await fetch(`${this.state.url}data`);
    let data = await response.json();
    await this.setState({
      data
    });
  }

  postData(data) {
    this.setState({
      cart: []
    })

    this.state.cart.forEach(elem => {
      fetch(`https://booking-apartament-js-zubarev.herokuapp.com/data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
          id: elem.id,
          email: data.email,
          name: data.name,
          price: elem.price,
          timeCheckIn: data.timeCheckIn
        })
      });
    })
    this.getData();
    this.sendEmail(data)
  }

  getMessage(data) {
    console.log('data', data)
    let count = 0;
    this.state.cart.forEach(elem => count += elem.price);
    return `Вы оформили заявку на аренду аппартоментов на ${this.state.cart.length} дн. 
    (${this.state.cart.map(elem => elem.id)} ) c ${data.timeCheckIn}
    Итоговая сумма за аренду апартаментов: ${count} руб.
    Мы ждём вас!`
  }

  async sendEmail(data) {
    const message = await this.getMessage(data);
    const templateParams = await {
      message: message,
      to_name: data.name,
      email: data.email
    };

    await emailjs
      .send(
        "service_w5s6n5r",
        "template_1a0x2a8",
        templateParams,
        "user_xlsP7AnJdP2w7LRTTBBr0"
      )
      .then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
        },
        function (err) {
          console.log("FAILED...", err);
        }
      );

    const templateParams2 = await {
      message: message,
      to_name: data.name,
      email: "info@itspro.by"
    };

    await emailjs
      .send(
        "service_w5s6n5r",
        "template_1a0x2a8",
        templateParams2,
        "user_xlsP7AnJdP2w7LRTTBBr0"
      )
      .then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
        },
        function (err) {
          console.log("FAILED...", err);
        }
      );
  }

  addItem(data) {
    this.state.cart.push(data)
    const newItems = this.state.cart;

    this.setState({
      cart: newItems
    })
  }

  deleteItem(data) {
    const newItems = this.state.cart.filter(elem => elem.id !== data.id)

    this.setState({
      cart: newItems
    })
  }

  render() {
    return ( 
    <Container>
      <Row>
        <Col>
           <Cart postItems={(data) => this.postData(data)}
                data= {this.state}/>
        </Col> 
        <Col>
          <Caption 
          update={this.setData}
          props={this.state}/> 
        </Col> 
      </Row> 
      <Body 
        add={(data) => this.addItem(data)}
        delete={(data) => this.deleteItem(data)}
        data = {this.state}/> 
    </Container>
    )
  }
}
