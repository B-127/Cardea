import React,{Component} from "react";
import {Link} from "react-router-dom";                                //Link is basically like an anchor tag
import axios from "axios";

//A javascript arrow function is like a python lambda function. A lambda function (an anonymous function which means it has no name) is one which can have many arguements but only one expression.
//Syntax= lambda arguments: expression
//e.g double= lambda a:a*2

//Arrow function Syntax: const add=(a,b)=>a*b;
//https://medium.com/@bluepnume/learn-about-promises-before-you-start-using-async-await-eb148164a9c8
//https://zendev.com/2018/10/01/javascript-arrow-functions-how-why-when.html

//This file has two different components.
//This is a REACT FUNCTIONAL component. This is different from a class component due to the lack of state and lifecycle functions. So if all we need to do is accept props and return JSX, this is a suitable option.
//For most components we have a seperate file, since this is small we fit everything into one component.

const Exercise = props => (
    <tr>
      <td>{props.exercise.username}</td>
      <td>{props.exercise.description}</td>
      <td>{props.exercise.duration}</td>
      <td>{props.exercise.date.substring(0,10)}</td>
      <td>
        <Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="/#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a> 
      </td>
    </tr>
  )
//We use the substring (0,10) in the date because we only want the date details. YYYY-MM-DD.
//We use a href="/#" to go to the top of a page. 

//This is a CLASS component.
  export default class ExercisesList extends Component {
    constructor(props) {
      super(props);
  
      this.deleteExercise = this.deleteExercise.bind(this)
  
      this.state = {exercises: []};
    }
  
    componentDidMount() {
      axios.get('http://localhost:5000/exercises/')
        .then(response => {
          this.setState({ exercises: response.data })
        })
        .catch((error) => {
          console.log(error);
        })
    }
  
    deleteExercise(id) {
      axios.delete('http://localhost:5000/exercises/'+id)
        .then(response => { console.log(response.data)});
  
      this.setState({
        exercises: this.state.exercises.filter(el => el._id !== id)      //this.state.exercises is the array of exercises. el stands for element. Therefore we are returning all the elements which do not have the id mentioned in the parameter.
      })                                                                 //In the database the id is created automatically as _id, thus we use _id.
    }
  
    exerciseList() {
      return this.state.exercises.map(currentexercise => {              //Map will return something for every element in the array
        return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
      })
    }
  
    render() {
      return (
        <div>
          <h3>Logged Exercises</h3>
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th>Username</th>
                <th>Description</th>
                <th>Duration (Minutes)</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              { this.exerciseList() }
            </tbody>
          </table>
        </div>
      )
    }
  }

