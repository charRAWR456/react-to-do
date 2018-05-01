import React, { Component } from 'react';
import classes from './App.css';
import Person from '../components/Persons/Person/Person';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';

class App extends Component {
  state = {
    persons: [
      {id: 'dsf', name:"Jamie", age:"28"},
      {id: 'asd', name:"Gina", age:"34"},
      {id: 'wqrefds', name:"Nick", age:"45"}
    ],
    showPersons: false
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
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

  render() {

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
      <div className={classes.App}>
        <Cockpit
          showPersons={this.state.showPersons}
          persons={this.state.persons}
          toggle={this.togglePersonsHandler}/>
        {persons}
      </div>
    );
  }
}

export default App;
