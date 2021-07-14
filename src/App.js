import './App.css';
import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation.js'
import Logo from './components/Logo/Logo.js'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js'
import Rank from './components/Rank/Rank.js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js'
import Signin from './components/Signin/Signin.js';
import Register from './components/Register/Register.js';
import Particles from 'react-particles-js';
import 'tachyons';




const particlesOptions = {
  particles: {
          number: {value: 50},
          size: {value: 3}
      },
  interactivity: {
          events: {onhover: {enable: true,mode: "repulse"}}
      }
}

const initialState = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        password: '',
        usage: 0,
        joinDate: ''
      }
    }

class App extends Component {
  constructor() {
    super();
    this.state = initialState
  }

  loadUser = (data)=> {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      password: data.password,
      usage: data.usage,
      joinDate: data.joinDate,

    }})
  }
  // componentDidMount() {
  //   fetch('http://localhost:3000/')
  //     .then(resp => resp.json())
  //     .then(console.log)
  //     .catch(err => console.log)
  // }

  calculateFaceDetection = (data) =>{
    const faceData = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: faceData.left_col * width,
      topRow: faceData.top_row * height,
      rightCol: width - (faceData.right_col * width),
      bottomRow: height - (faceData.bottom_row * height),
    }
  }
  //上个函数的box传给他
  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () =>{
    this.setState({imageUrl: this.state.input});
      fetch('https://salty-wave-72335.herokuapp.com/imageurl',{
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({input: this.state.input,})
      })
      .then(resp => resp.json())
      .then(resp => {
        if (resp) {
          fetch('https://salty-wave-72335.herokuapp.com/image',{
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: this.state.user.id,})
          })
          .then(resp => resp.json())
          .then(count => {
            console.log(count);
            //{user:{usage:count}}会把user所有值改变
            this.setState(Object.assign(this.state.user, {usage : count}))
          })
        }
        this.displayFaceBox(this.calculateFaceDetection(resp))
      })
      .catch( err=> console.log(err))
  }

  onRouteChange = (route) =>{
    if (route==='signout') {
      this.setState(initialState)
    } else if (route==='home'){
      this.setState({isSignedIn:true})
    }
    this.setState({route:route})
  }


  render() {
    const {imageUrl,box,route,isSignedIn} = this.state;

    return (
    <div className="App">
      <Particles className='particles' 
      params={particlesOptions}/>
      <Navigation  isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
      {route === 'home'
        ? <div>
            <Logo />
            <Rank name={this.state.user.name} usage={this.state.user.usage} />
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
            <FaceRecognition box={box} imageUrl={imageUrl} /> 
          </div>
        : (
            route === 'signin'
            ? <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
            : <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
          )
      }


    </div>
    )
  };
}

export default App;

