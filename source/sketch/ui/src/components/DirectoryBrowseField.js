import React from 'react'
import './DirectoryBrowseField.scss'
import Strings, * as STRINGS from '../../../../core/library/strings'
import ReactDOM from 'react-dom'
import $ from 'jquery'

import Button from '../components/Button'

class DirectoryBrowseField extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      dirPath: ''
    }

    this.setPath = this.setPath.bind(this)
    this.handleBrowseButtonClick = this.handleBrowseButtonClick.bind(this)
  }

  componentWillMount () {
    $(document).on('setDirectoryPath', this.setPath)
  }

  componentWillUnmount () {
    $(document).off('setDirectoryPath', this.setPath)
  }

  setPath (e, data) {
    this.setState({
      dirPath: data.path,
    })
  }

  handleBrowseButtonClick (e) {
    this.props.onClick()
  }

  render () {
    return (
      <div className='directory-browse-field'>
        <input style={{ width: (!this.props.readOnly) ? 201 : '100%' }} readOnly type='text' value={(this.state.dirPath) ? this.state.dirPath : ''} />
        {/* <input ref='fileInput' type='file' onChange={this.handleFileChange} accept={this.props.accept} /> */}
        {!this.props.readOnly ? (
          <Button text={Strings(STRINGS.BROWSE)} style={{ width: 72, marginLeft: 12 }} handleClick={this.handleBrowseButtonClick} />
        ) : ''}
      </div>
    )
  }
}

export default DirectoryBrowseField
