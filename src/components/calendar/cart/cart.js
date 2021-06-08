import React, {Component} from 'react';
import { Button, Modal, ModalBody, ModalFooter, Table, FormGroup, Input, Label } from 'reactstrap';

export default class Cart extends Component {
    constructor(props) {
        super(props);
        this.state= {
            email : "",
            name : "",
            timeCheckIn : "10.00",
            modal : false
        }
    }

    onValueEmail(email) {
      this.setState({email})
    }

    onValueName(name) {
      this.setState({name})
    }

    onValueTimeCheckIn (timeCheckIn) {
      this.setState({timeCheckIn})
    }

    onSubmit =  () => {
        this.props.postItems(this.state)
    }

    onToggle = () => {
        this.setState({
            modal : !this.state.modal
        })
    }   

  render() {
    const {modal} = this.state;
    const {data:{cart}} = this.props;

    let countDays = cart.length,
        countPrice = 0;

    cart.forEach(elem => {
        countPrice +=elem.price
    })

    return (
        <div>
            <Button color="primary" onClick={this.onToggle}>Оформить бронирование</Button>
            <Modal  isOpen={modal}>
                <ModalBody>
                <Table size="sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Дата</th>
                            <th>Цена</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((elem, index) => {
                            return(
                                <tr key={elem.id}>
                                    <th scope="row">{index+1}</th>
                                    <td>{elem.id}</td>
                                    <td>{elem.price}</td>
                                </tr>
                            )
                        })}
                        <tr>
                            <th scope="row">Итого:</th>
                            <td>{countDays} дн.</td>
                            <td>{countPrice} руб.</td>
                        </tr>
                    </tbody>
                </Table>
                </ModalBody>
                <FormGroup>
                    <Input type="email" name="email" id="exampleEmail" placeholder="Email" 
                            onChange={(e) => this.onValueEmail(e.target.value)}/>
                    <Input type="name" name="text" id="exampleText" placeholder="Имя"
                            onChange={(e) => this.onValueName(e.target.value)}/>
                    <Label for="exampleSelect">Время заселения:</Label>
                    <Input type="select" name="select" id="exampleSelect"
                            onClick={(e) => this.onValueTimeCheckIn(e.target.value)}>
                        <option>10.00</option>
                        <option>12.00</option>
                        <option>14.00</option>
                    </Input>
                </FormGroup>
                <ModalFooter>
                    <Button color="primary" onClick={this.onSubmit} >Забронировать</Button>{' '}
                    <Button color="secondary" onClick={this.onToggle}>Отмена</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
  }
}
