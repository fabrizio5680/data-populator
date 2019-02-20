import React from 'react'
import './Select.scss'
import classNames from 'classnames'

class Select extends React.Component {
  render () {
    let selectClass = classNames({
      'disabled': this.props.disabled
    })
    return (
      <div className='select'>
        <div className='background' />
        <select className={selectClass} disabled={this.props.disabled} value={this.props.selected} onChange={(e) => this.props.handleChange(e.target.value)}>
          {this.props.data.map((o, index) => {
            return (
              <option key={index}>{o}</option>
            )
          })}
        </select>
      </div>
    )
  }
}

export default Select
