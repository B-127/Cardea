import React,{Component} from "react";
import Datepicker from "react-datepicker";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";

export default class CreateExercise extends Component{
    constructor(props){
        super(props);

        //If we usually enter console.log(this) without the code right below, we get an empty value.To prevent this we use bind() which binds this to the context of the surrounding code where it’s defined.
        //Binding this to each of these methods so that it would be refering to the right thing.
        this.onChangeUsername=this.onChangeUsername.bind(this);
        this.onChangeDescription=this.onChangeDescription.bind(this);
        this.onChangeDuration=this.onChangeDuration.bind(this);
        this.onChangeDate=this.onChangeDate.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        
        //State is basically how we create variables in react. Whenever we update the state, the webpage is updated automatically.

        this.state={
            userName:'',
            description:'',
            duration:0,
            date: new Date(),
            users:[]
        }
    }

    //This is a React lifecycle method. This component did mount will load before anything loads onto the screen.
    componentDidMount(){
        axios.get('http://localhost:5000/users')
        .then(response=>{
            if (response.data.length>0){                        //Checking if there is atleast one user in the database.
                this.setState({
                    users: response.data.map(user=>user.username),                   //map returns an array
                    username:response.data[0].username                               //data[0] makes the username to be set to the first value in the database
                })
            }                           
        })
    }

    //Now we need to add methods to edit the state variables.

    //going to set the username to the value present inside the textbox.
    onChangeUsername(e){
        this.setState({
            username:e.target.value
        })
    }

    onChangeDescription(e){
        this.setState({
            description:e.target.value
        })
    }

    onChangeDuration(e){
        this.setState({
            duration:e.target.value
        })
    }

    onChangeDate(date){
        this.setState({
            date:date
        })
    }

    //We can create variables to be used locally inside a function though.
    onSubmit(e){
        e.preventDefault(); //Prevents default action taken when submitting a form.

        const exercise={
            username:this.state.username,
            description:this.state.description,
            duration:this.state.duration,
            date:this.state.date,
        }

        console.log(exercise);

        axios.post('http://localhost:5000/exercises/add', exercise)
            .then(res => console.log(res.data))

        window.location="/";   //Takes user back to the homepage after creating the list of exercises.

    }

    render(){
        return(
            <div>
                <h3>Create New Exercise</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <select ref="userInput" required className="form-control" value={this.state.username} onChange={this.onChangeUsername}> 
                        {
                            this.state.users.map(function(user){
                                return <option
                                    key={user}
                                    value={user}>{user}
                                </option>
                            })
                        }
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text" required className="form-control" value={this.state.description} onChange={this.onChangeDescription}/>
                    </div>

                    <div className="form-group">
                        <label>Duration (minutes): </label>
                        <input type="text" required className="form-control" value={this.state.duration} onChange={this.onChangeDuration}/>
                    </div>

                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <Datepicker selected={this.state.date} onChange={this.onChangeDate}/>
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="submit" className="btn btn-primary" value="Create Exercise Log"/>
                    </div>
                </form>
            </div>
        )
    }
}