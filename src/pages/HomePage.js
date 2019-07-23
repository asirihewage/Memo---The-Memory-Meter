import React from "react";
import {Doughnut, Line} from "react-chartjs-2";
import {MDBEdgeHeader, MDBFreeBird, MDBCol, MDBRow, MDBCardBody, MDBProgress, MDBContainer} from "mdbreact";
import "./HomePage.css";

class HomePage extends React.Component {

  state = {
    timer : 20,
    isLoading: true,
    data: [],
    serverId : '',
    cpuPercentage : '',
    available : '',
    free : '',
    percent : '',
    total : '',
    used : '',
    unit : 'bytes',
    timestamp : '',
    error: null,
      dataDoughnut: {
        labels: ["Free", "Used", "Available"],
        datasets: [
          {
            data: [1,2,3],
            backgroundColor: ["#dddd0f","#FF5A5E", "#5AD3D1"],
            hoverBackgroundColor: ["#dddd0f", "#FF5A5E","#5AD3D1"]
          }
        ]
      },
      dataLine: {
        labels: ["January", "February", "March", "April", "May", "June", "July","August"],
        datasets: [
          {
            label: "UK Server",
            fill: true,
            lineTension: 0.3,
            backgroundColor: "rgba(225, 204,230, .3)",
            borderColor: "rgb(205, 130, 158)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgb(205, 130,1 58)",
            pointBackgroundColor: "rgb(255, 255, 255)",
            pointBorderWidth: 10,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgb(0, 0, 0)",
            pointHoverBorderColor: "rgba(220, 220, 220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40]
          },
          {
            label: "LK Server",
            fill: true,
            lineTension: 0.3,
            backgroundColor: "rgba(184, 185, 210, .3)",
            borderColor: "rgb(35, 26, 136)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgb(35, 26, 136)",
            pointBackgroundColor: "rgb(255, 255, 255)",
            pointBorderWidth: 10,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgb(0, 0, 0)",
            pointHoverBorderColor: "rgba(220, 220, 220, 1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [28, 48, 40, 19, 86, 27, 90]
          }
        ]
      }
  }

  componentDidMount() {
    this.timer = setInterval(()=> this.fetchUsers(), 2000)
  }

  fetchUsers() {
    fetch('http://localhost:5000/api/analytics/memory',
        {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            "Accept": 'application/json',
          }
        })
        .then(response => response.json())
        .then(data => {
          this.setState({
            data: data,
            serverId : data.serverId,
            cpuPercentage : data.cpuPercentage,
            available : data.available,
            free : data.free,
            percent : data.percent,
            total : data.total,
            used : data.used,
            unit : data.unit,
            timestamp : data.timestamp,
            timer : (data.free+data.available)/data.total*100,
            dataDoughnut: {
              labels: ["Free"+data.free, "Used"+data.used, "Available"+data.available],
              datasets: [
                {
                  data: [data.free,data.used, data.available],
                  backgroundColor: ["#dddd0f","#FF5A5E", "#5AD3D1"],
                  hoverBackgroundColor: ["#dddd0f", "#FF5A5E","#5AD3D1"]
                }
              ]
            }
          })
        }).then(
            data => {console.log(this.state.used);}
    )
        .catch(error => console.error(error))
  }

  render() {
    const { isLoading, data, error } = this.state;
    return (
      <div>
        <MDBEdgeHeader color="indigo darken-3" />
        <MDBFreeBird>
          <MDBRow>
            <MDBCol
              md="12"
              className="mx-auto float-none white z-depth-1 py-2 px-2"
            >
              <MDBCardBody>
                <div className="spinner-grow spinner-grow-sm text-success float-md-right" role="status">
                </div>
                <div className="row">
                <div className="col-6">
                <MDBContainer>
                  <Line data={this.state.dataLine} options={{ responsive: true }} />
                </MDBContainer>
                </div>
                <div className="col-6">
                  <MDBContainer>
                    <Doughnut data={this.state.dataDoughnut} options={{ responsive: true }} />
                  </MDBContainer>
                </div>
                </div>
                <div className="row">
                  <div className="col">
                    <MDBProgress className="my-2" animated material value={this.state.timer} color="success">Current Memory Usage: {this.state.timer}% </MDBProgress>
                  </div>
                  <div className="col">
                    <MDBProgress className="my-2" animated material value={this.state.timer*80/100} color="primary">Current Memory Usage: {this.state.timer}% </MDBProgress>
                  </div>
                </div>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBFreeBird>
      </div>
    );
  }
}

export default HomePage;
