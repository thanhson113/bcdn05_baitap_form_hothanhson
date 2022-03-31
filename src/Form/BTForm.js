import React, { Component } from 'react'
import FormThongTinSV from './FormThongTinSV'
import TableThongTinSV from './TableThongTinSV'

export default class BTForm extends Component {
  render() {
    return (
      <div className="container">
          <FormThongTinSV/>
          <TableThongTinSV/>
      </div>
    )
  }
}
