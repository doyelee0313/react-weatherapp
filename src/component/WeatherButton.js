import React from 'react'
import { Button } from 'react-bootstrap';

const WeatherButton = () => {
  return (
    <div className="button-box">
      <Button variant="light">Current Location</Button>
      <Button variant="light">Paris</Button>
      <Button variant="light">Seoul</Button>
    </div>
  )
}

export default WeatherButton