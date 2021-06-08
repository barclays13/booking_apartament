import React, {Component} from 'react';
import { UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';

export default class Caption extends Component {

  render() {
    const {nameMonth, year, arrNextDate} = this.props.props;

    return (
      <UncontrolledButtonDropdown>
        <DropdownToggle caret>
          {nameMonth} {year}
        </DropdownToggle>
        <DropdownMenu>
            { arrNextDate.map(elem => {
                return (
                  <DropdownItem 
                    onClick={() => this.props.update(elem)}
                    key={`${elem.nameMonth}${elem.year}`} >
                      {elem.nameMonth} {elem.year}
                  </DropdownItem>
                )
              })
            }

        </DropdownMenu>
      </UncontrolledButtonDropdown>
    );
  }
}
