import React, {Component} from 'react';
import axios from 'axios';
import QuestionBox from './Question';
import Result from './Result';
import './QuizBee.css';
export default class QuizBee extends Component {
    state = {
        quizData: [],
        score: 0,
        responses: 0,
        category: "",
        difficulty: "",
        userEmail: ""
    }
    getQuestions = async () => { 
        const category = this.state.category;
        const difficulty = this.state.difficulty;
        const url = `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`;
        const res = await axios.get(url);
        console.log(res);
        this.setState({
            quizData: res.data.results
        })
    }
    computeAnswer = (answer, correctAnswer) => {
        if(answer === correctAnswer){
            this.setState({
                score: this.state.score + 1
            })
        }
        this.setState({
            responses: this.state.responses < 10 ? this.state.responses + 1 : 10
        })
        console.log(this.state.score)
    }
    playAgain = () =>{
        this.getQuestions();
        this.setState({
            score: 0,
            responses: 0
        })
    }
    setApi = (e) =>{
        this.setState({
            ...this.state,
            [e.target.name] : e.target.value
        })
    }
    fetchApi = (e) => {
        e.preventDefault();
        this.getQuestions();
    }
    registerScore = async (e) => {
        e.preventDefault();
        const body = JSON.stringify({
            score: this.state.score,
            email: this.state.userEmail
        });
        console.log(body);
        const config = {
          headers:{
            'Content-Type': 'application/json'
          }
        }
        const res = await axios.post("/quiz", body, config);
        console.log(res.data.result);
    }
    componentDidMount(){
        this.getQuestions();
    }
    render() {
        return (
            <div className="quizBee">
                <div className="quizbee-inner">
                    <div className="title">
                        <h1><span>Q</span>UIZZICAL</h1>
                    </div>
                    <input type="text" className="quizEmail" name ="userEmail" placeholder="Enter email to save your score..." onChange={this.setApi}/><br />
                    <div className="dropdown">
                        <form className="selection">
                        <label htmlFor="category">Category</label>
                        <select name="category" onChange={this.setApi}>
                            <option value="9">Genral Knowledge</option>
                            <option value="21">Sport</option>
                            <option value="26">Celebrities</option>
                        </select>
                        <label htmlFor="difficulty">Difficulty</label>
                        <select name="difficulty" onChange={this.setApi}>
                            <option name="difficulty" value="easy">Easy</option>
                            <option name="difficulty" value="medium">Medium</option>
                            <option name="difficulty" value="hard">Hard</option>
                        </select>
                        <button type="submit" className="btn-select" onClick={this.fetchApi}>Submit</button>
                        </form> 
                    </div>
                            {
                            this.state.quizData.length > 0 && 
                            this.state.responses < 10 && 
                            this.state.quizData.map(
                                ({question, incorrect_answers, correct_answer}) => 
                                <QuestionBox 
                                question={question} 
                                incorrectOne={incorrect_answers[0]}
                                incorrectTwo={incorrect_answers[1]}
                                incorrectThree={incorrect_answers[2]}
                                correct={correct_answer} 
                                key={question}
                                selected={correctAnswer => this.computeAnswer(correctAnswer, correct_answer)} 
                                /> )
                            }
                            {this.state.responses === 10 ? 
                            (<Result score={this.state.score} playAgain={this.playAgain} registerScore={this.registerScore}/>)
                            : null}
                </div>
            </div>
        )
    }
}