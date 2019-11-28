# react-otp-form

One Time Password (OTP) form component in react.

## How to Install

Make sure you have [Node.js](http://nodejs.org/) and NPM installed.

```sh
npm install react-otp-form
```

## How to Use

```sh
import React, { Component } from 'react'
import OtpForm from 'react-otp-form'

class OtpFormContainer extends Component {
  constructor() {
    super()
    this.state = {
      enteredOtp: ''
    }
    this.handleOnChange = this.handleOnChange.bind(this)
  }

  handleOnChange (data) {
    const { otpString } = data
    this.setState({
      enteredOtp: otpString
    })
  }

  render() {
    return (
      <OtpForm
        numberOfInputs={4}
        showOtp={true}
        handleOnChange={this.handleOnChange}
      />
    )
  }
}
```

## Available PropTypes

| Prop Name | Type | Default Value | Description |
| --- | --- | --- | --- |
| numberOfInputs | number | 4 | Number of digits of your Input |
| showOtp | Boolean | true | This flag to show the entered value in OTP input |
| handleOnChange | Function | null | Callback function to get the entered Input by user |