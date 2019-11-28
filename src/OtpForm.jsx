import React from 'react'
import PropTypes from 'prop-types'
import './OtpForm.css'

class OtpForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.getInitialState(props.numberOfInputs)
    this.getInputsArray = this.getInputsArray.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
  }

  getInitialState (numberOfInputs) {
    const initialState = {}
    for (let i = 0; i < numberOfInputs; i +=1) {
      initialState[`otpInput${i}`] = ''
    }
    initialState.inputsArray = this.getInputsArray(numberOfInputs)
    initialState.focusId = initialState.inputsArray[0].id
    return initialState
  }

  componentDidUpdate () {
    const { focusId } = this.state
    document.getElementById(focusId).focus()
  }

  handleOnChange (e, inputIndex) {
    const { name, value } = e.target
    const { inputsArray } = this.state
    const { handleOnChange } = this.props
    const updatedValue = value.replace(/[^0-9.]/g, '')
    let focusId = inputsArray[inputIndex].id
    if (value.length === 0 && updatedValue.length === 0) {
      const prevInputIndex = inputIndex - 1
      if (prevInputIndex >= 0) {
        focusId = inputsArray[prevInputIndex].id
      }
    } else if(updatedValue.length === 1) {
      const nextInputIndex = inputIndex + 1
      if (nextInputIndex < inputsArray.length) {
        focusId = inputsArray[nextInputIndex].id
      }
    }
    this.setState({
      [name]: updatedValue,
      focusId
    }, () => {
      if (handleOnChange) {
        const returnState = {}
        let otpString = ''
        const { inputsArray } = this.state
        for (let i = 0; i < inputsArray.length; i += 1) {
          returnState[`digit${i + 1}`] = (this.state[`otpInput${i}`] || '')
          otpString += (this.state[`otpInput${i}`] || '')
        }
        returnState.otpString = otpString
        handleOnChange(returnState)
      }
    })
  }

  getRandomID () {
    return '_' + Math.random().toString(36).substr(2, 9)
  }

  getInputsArray (numberOfInputs) {
    const inputsArray = []
    for (let i = 0; i < numberOfInputs; i +=1) {
      inputsArray.push({
        id: this.getRandomID(),
        name: `otpInput${i}`
      })
    }
    return inputsArray
  }

  render () {
    const { showOtp } = this.props
    const { inputsArray } = this.state
    return (
      <div className="otp-form-container">
        <div className="otp-inputs-section">
          {inputsArray.map((input, index) => (
            <div className="otp-input-group" key={input.id}>
              <input
                type={showOtp ? 'text': 'password'}
                onChange={(e) => this.handleOnChange(e, index)}
                name={input.name}
                id={input.id}
                value={this.state[`otpInput${index}`]}
                maxLength="1"
              />
            </div>
          ))}
        </div>
      </div>
    )
  }
}

OtpForm.defaultProps = {
  numberOfInputs: 4,
  showOtp: true,
  handleOnChange: null
}

OtpForm.propTypes = {
  numberOfInputs: PropTypes.number,
  showOtp: PropTypes.bool,
  handleOnDigitChange: PropTypes.func
}

export default OtpForm
