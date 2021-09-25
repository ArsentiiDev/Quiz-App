import React, { Component } from "react";
import ReactDOM from 'react-dom'
import "./assets/style.css";
import quizService from './quizService/index'
import QuestionBox from "./Components/QuestionBox";
import Result from './Components/Result'

class QuizzBee extends Component {
    state = {
        questionBank: [],
        score: 0,
        responses: 0
    }
    getQuestions = () => {
        quizService().then(question => {
            this.setState({
                questionBank: question
            })
        })
    }
    componentDidMount() {
        this.getQuestions();
    }
    computeAnswer = (answer, correct) => {
        console.log(this.state.responses)
        if (answer === correct) {
            this.setState({
                score: this.state.score + 1
            })
        }
        this.setState({
            responses: this.state.responses < 5 ? this.state.responses + 1 : 5
        })
    }
    playAgain = () => {
        console.log("workds")
        this.getQuestions();
        this.setState({
            score:0,
            responses: 0,
        })
    }
    render() {
        return (
            <div className="container">
                <div className="title">Quizbee</div>
                {this.state.questionBank.length > 0 &&
                    this.state.responses < 5 &&
                    this.state.questionBank.map(({ question, answers,
                        correct, questionId }) => (
                        <div>
                            <QuestionBox
                                question={question}
                                options={answers}
                                key={questionId}
                                selected={answer => this.computeAnswer(answer, correct)}
                            />
                        </div>
                    ))}
                    {this.state.responses === 5 ? (<Result score={this.state.score} playAgain={this.playAgain}/>): (<h2></h2>)}
            </div>
        );
    }
}


ReactDOM.render(<QuizzBee />, document.getElementById('root'))