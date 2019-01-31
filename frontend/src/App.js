// /client/App.js
import React, { Component } from "react";
// import Linkable from './Linkable
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';
import ReactDOM from 'react-dom';
import Moment from 'react-moment';

class App extends Component {
  // initialize our state 
  state = {
    data: {},
    id: 0,
    browserLanguage: null,
    intervalIsSet: false,
    isLoaded:null
  };

  // when component mounts, first thing it does is fetch all existing data in our db
  // then we incorporate a polling logic so that we can easily see if our db has 
  // changed and implement those changes into our UI
  componentDidMount() {
    this.getData();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getData, 1000);
      this.setState({ intervalIsSet: interval });
    }
    if (navigator.language) {
      this.setState({ browserLanguage: navigator.language });
    }
  }

  // never let a process live forever 
  // always kill a process everytime we are done using it
  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  // just a note, here, in the front end, we use the id key of our data object 
  // in order to identify which we want to Update or delete.
  // for our back end, we use the object id assigned by MongoDB to modify 
  // data base entries

  // our first get method that uses our backend api to 
  // fetch data from our data base
  getData = () => {
    fetch("http://localhost:3000/rocket", {
        headers: {
            'Accept': 'application/json',
        },
    }) //temporaily using direct API link
    .then(res => res.json()
    .catch(err => {console.err(`'${err}' happened!`); return {};}))
    .then((res) => this.setState({ data: res, isLoaded: true }),
          (error) => this.setState({ isLoaded: true, error}));
    // .then((res) => console.log('parsed json: ', res))
  };

  render() {
    const { data } = this.state;
      const launches  = this.state.data.launches;
      console.log(this.state);
      console.log(launches);
      return (
      <div className="row text-left">
         { 
           launches == undefined || launches.length <= 0  ? "NO ENTRIES"
            : launches.map(launch => (
       <div className="col-xl-4 col-lg-6 col-md-6 card-group mb-3">
       <Card>
       <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
       <CardBody>
       <CardTitle><b>{ launch.name }</b></CardTitle>
       <CardSubtitle>Launch time:  <Moment format="lll">{ launch.isostart }
       </Moment> (<Moment fromNow>{ launch.isostart }</Moment>) </CardSubtitle>
       <CardText>
            {/* <Linkable ></Linkable> */}
            <p>Location: { launch.location.name }</p>
            <p>Rocket : <a href ="{ launch.rocket.wikiURL }" >{ launch.rocket.name }</a></p>
            <p>Agency: <a href ="{ launch.lsp.wikiURL }" >{ launch.lsp.name }</a></p>
        </CardText>
        <Button>Button</Button>
        </CardBody>
        </Card>
        </div>
        ))}
        </div>
   );
  }
}

export default App;