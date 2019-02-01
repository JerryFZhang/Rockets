// /client/App.js
import React, { Component } from 'react'
import Linkable from './Linkable'
import Moment from 'react-moment'
import { Card, CardImg, CardText, CardBody, CardTitle, CardFooter} from 'reactstrap';
class App extends Component {
  // initialize
  state = {
    data: {},
    browserLanguage: null,
    intervalIsSet: false,
    isLoaded:null
  };


  componentDidMount() {
    this.getData();

    // Pull every minute
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getData, 60000);
      this.setState({ intervalIsSet: interval });
    }

    // Detect language for future localization purpose
    if (navigator.language) {
      this.setState({ browserLanguage: navigator.language });
    }
  }

  // never let a process live forever
  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  // fetch data from backend
  getData = () => {
    fetch('http://localhost:4000/rocket', {
        headers: {
            'Accept': 'application/json',
        },
    })
    .then((res) => res.json(),
          (error) => {console.err(`'${error}' happened!`); return {};})
    .then((res) => this.setState({ data: res, isLoaded: true }),
          (error) => this.setState({ isLoaded: true, error}));
  };

  render() {
      const launches  = this.state.data.launches;
      console.log(launches)
      return (
      <div className='row pt-5'>
         {
           launches === undefined || launches.length <= 0  ? 'NO ENTRIES'
            : launches.map((launch, index)  => (
       <div className='col-xl-6 col-lg-6 col-md-12 card-group mb-3' key={index}>
       <Card>
        <CardBody>
       <CardTitle><b>#{index + 1}</b></CardTitle>
       <CardImg top width='100%' src={launch.rocket.imageURL} alt='Card image cap' />
       <CardTitle className='pt-3'><b><Linkable props={launch}></Linkable></b></CardTitle>
       <CardText>
            Rocket : <Linkable props={launch.rocket}></Linkable><br />
            Location: <Linkable props={launch.location}></Linkable><br />
            Launch Pad: <Linkable props={launch.location.pads[0]}></Linkable><br />
            Agency:  <Linkable props={launch.lsp}></Linkable>
        </CardText>
        <CardFooter className='text-muted'> Launch time:  <Moment format='lll'>{ launch.isostart }
       </Moment> (<Moment fromNow>{ launch.isostart }</Moment>) </CardFooter>
        </CardBody>
        </Card>
        </div>
        ))}
        </div>
   );
  }
}

export default App;
