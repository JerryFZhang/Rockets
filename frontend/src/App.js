// /client/App.js
import React, { Component } from "react";
import axios from "axios";

class App extends Component {
  // initialize our state 
  state = {
    data: {},
    id: 0,
    message: null,
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
      //  return <div><pre>{JSON.stringify(data, null, 2) }</pre></div>;
   return (
        <ul>
         { 
           launches == undefined || launches.length <= 0  ? "NO ENTRIES"
            : launches.map(launch => (
                 <ul><li>{ launch.name }</li>
                 <li>{ launch.isostart }</li>
                 <li>{ launch.location.name }</li>
                 <li>{ launch.rocket.name }</li>
                 <li>{ launch.rocket.wikiURL }</li>
                 <li>{ launch.lsp.name }</li>
                 <li>{ launch.lsp.wikiURL }</li>
                 {/* <li>{ launch.missions }</li>*/}
                                    </ul> 
             ))
             }
       </ul>
   );
  }
}

export default App;