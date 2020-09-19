import React from 'react';
import './App.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const api_root = 'https://bmw-price-estimator-api.azurewebsites.net/'

function App() {
  return (
    <Container className="justify-content-center">
      <Row className="h-100">
        <CarForm/>
      </Row>
    </Container>
  );
}

class CarForm extends React.Component {
    constructor(props) {
        super(props);
        // Defaults
        this.state = {year: '2009',
        odometer: '5000',
        model: '3-series',
        condition: 'fair',
        transmission: 'automatic',
        engine: 'gas',
        cylinders: '8 cylinders',
        drive: 'drive_4wd',
        showForm: true};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.id]: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();

        // Collect results
        let year = this.state.year;
        let odometer = this.state.odometer;
        let model = this.state.model;
        let condition = this.state.condition;
        let transmission = this.state.transmission;
        let engine = this.state.engine;
        let cylinders = this.state.cylinders;
        let drive = this.state.drive;

        this.setState({showForm: false});

        // Submit request
        let params = `${year}/${odometer}/${model}/${condition}/${transmission}/${engine}/${cylinders}/${drive}`
        let fullRequest = api_root + params;
        console.log(fullRequest);
        fetch(fullRequest, {
            method: 'get',
            headers: new Headers({
                'Authorization': 'ivey is the best'
            })
        }).then((res) => {
            alert(res.json())
        });
    }
    render() {
        return (
            <Col className="col-12 my-auto">
                <Row>
                    <Col className="col-12 d-flex justify-content-center">
                        <h1 className="text-center header">
                            BMW Price Estimator
                        </h1>
                    </Col>
                </Row>
                <Row>
                    <Col className="col-12 d-flex justify-content-center">
                        {this.state.showForm ? (
                            <form onSubmit={this.handleSubmit}>
                                <Row className="form-group">
                                    <label className="col-4" htmlFor="year">Year</label>
                                    <input className="col-8" id="year" type="text" value={this.state.year} onChange={this.handleChange} />
                                </Row>
                                <Row className="form-group">
                                    <label className="col-4" htmlFor="model">Model</label>
                                    <select className="col-8" id="model" name="model" value={this.state.model} onChange={this.handleChange}>
                                        <option value="3-series">3-Series</option>
                                        <option value="4-series">4-Series</option>
                                        <option value="5-series">5-Series</option>
                                        <option value="6-series">6-Series</option>
                                    </select>
                                </Row>
                                <Row className="form-group">

                                    <label className="col-4" htmlFor="odometer">Odometer</label>
                                    <input className="col-6" id="odometer" type="text" value={this.state.odometer} onChange={this.handleChange} />
                                    <p className="col-2">km</p>
                                </Row>
                                <Row className="form-group">
                                    <label className="col-4" htmlFor="condition">Condition</label>
                                    <select className="col-8" id="condition" name="condition" value={this.state.condition} onChange={this.handleChange}>
                                        <option value="new">New</option>
                                        <option value="like-new">Like-New</option>
                                        <option value="excellent">Excellent</option>
                                        <option value="good">Good</option>
                                        <option value="fair">Fair</option>
                                    </select>
                                </Row>
                                <Row className="form-group">
                                    <label className="col-4" htmlFor="cyl">Cylinders</label>
                                    <select className="col-8" id="cylinders" name="cylinders" value={this.state.cylinders} onChange={this.handleChange}>
                                        <option value="8-cyl">8-cyl</option>
                                        <option value="6-cyl">6-cyl</option>
                                        <option value="5-cyl">5-cyl</option>
                                        <option value="4-cyl">4-cyl</option>
                                        <option value="3-cyl">3-cyl</option>
                                        <option value="0-cyl">Electric</option>
                                    </select>
                                </Row>
                                <Row className="form-group">
                                    <label className="col-4" htmlFor="drive">Drive</label>
                                    <select className="col-8" id="drive" name="drive" value={this.state.drive} onChange={this.handleChange}>
                                        <option value="AWD">AWD</option>
                                        <option value="FWD">FWD</option>
                                        <option value="RWD">RWD</option>
                                    </select>
                                </Row>
                                <Row className="form-group">
                                    <input type="submit" value="Submit" />
                                </Row>
                            </form>
                        ) : null}
                    </Col>
                </Row>
            </Col>
        )
    }
}

export default App;
