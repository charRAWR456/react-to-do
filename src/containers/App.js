import React, { Component } from 'react';
import classes from './App.css';
// import Person from '../components/Persons/Person/Person';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import WithClass from '../hoc/WithClass';

export const AuthContext = React.createContext(false);

class App extends Component {
  constructor(props) {
    super(props);

      this.state = {
        persons: [
          {id: 'dsf', name:"Jamie", age:28},
          {id: 'asd', name:"Gina", age:34},
          {id: 'wqrefds', name:"Nick", age:45}
        ],
        showPersons: false,
        toggleClicked: 0,
        authenticated: false
      }
    console.log('[App.js] Inside constructor',props);
  }

  componentWillMount() {
    console.log('[App.js] Inside componentWillMount()')
  }
  componentDidMount() {
    console.log('[App.js] Inside componentDidMount()')
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('[UPDATE App.js] Inside shouldComponentUpdate()', nextProps, nextState)
    return nextState.persons !== this.state.persons ||
    nextState.showPersons !== this.state.showPersons;
  }

  componentWillUpdate(nextProps, nextState) {
    console.log('[UPDATE App.js] Inside componentWillUpdate()', nextProps, nextState)
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('[UPDATE App.js] Inside getDerivedStateFromProps()', nextProps, prevState)
    return prevState
  }

  getSnapshotBeforeUpdate(){
    console.log('[UPDATE App.js] Inside getSnapshotBeforeUpdate()')
  }

  componentDidUpdate() {
    console.log('[App.js] Inside componentDidUpdate()')
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState((prevState, props) => {
      return {
        showPersons: !doesShow,
        toggleClicked: prevState.toggleClicked + 1
      }
    });
  }

  deletePersonHandler = (personIndex) => {
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

// const person = Object.assign({},this.state.persons[personIndex]);
    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({
      persons: persons})
  }

  loginHandler = () => {
    this.setState({authenticated: true});
  }

  render() {
    console.log('[App.js] Inside render()')
    let persons = null;

    if (this.state.showPersons){
      persons=(
        <div>
          <Persons
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangedHandler}/>
        </div>
      )
    }

    return (
      <WithClass classes={classes.App}>
        <Cockpit
          appTitle={this.props.title}
          showPersons={this.state.showPersons}
          persons={this.state.persons}
          login={this.loginHandler}
          toggle={this.togglePersonsHandler}/>
          <AuthContext.Provider value={this.state.authenticated}>
        {persons}</AuthContext.Provider>
      </WithClass>
    );
  }
}

export default App;
