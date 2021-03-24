class App extends React.Component {
    state = {
        flashcards:[]
    }

    componentDidMount = () => {
        axios.get('/flashcards').then(
            (response) => {
                this.setState({
                    flashcards:response.data
                })
            }
        )
    }

    createFlashcard = (event) => {
        event.preventDefault();
        axios.post(
            '/flashcards',
            {
                question:this.state.newFlashcardQuestion,
                tips:this.state.newFlashcardTips,
                answer:this.state.newFlashcardAnswer,
                examples:this.state.newFlashcardExamples

            }
        ).then(
            (response) => {
                this.setState({
                    flashcards:response.data,
                    question: '',
                    tips: '',
                    answer: '',
                    examples: ''
                })
            }
        )
        event.target.reset()
        window.location.reload(true);
    }

    changeNewFlashcardTips = (event) => {
        this.setState({
            newFlashcardTips:event.target.value
        });
    }

    changeNewFlashcardQuestion = (event) => {
        this.setState({
            newFlashcardQuestion:event.target.value
        });
    }

    changeNewFlashcardAnswer = (event) => {
        this.setState({
            newFlashcardAnswer:event.target.value
        });
    }

    changeNewFlashcardExamples = (event) => {
        this.setState({
            newFlashcardExamples:event.target.value
        });
    }

    deleteFlashcard = (event) => {
        axios.delete('/flashcards/' + event.target.value).then(
            (response) => {
                this.setState({
                    flashcards:response.data
                })
            }
        )

    }

    updateFlashcard = (event) => {
        event.preventDefault();
        const id = event.target.getAttribute('id');
        axios.put(
            '/flashcards/' + id,
            {
                question:this.state.updateFlashcardQuestion,
                tips:this.state.updateFlashcardTips,
                answer:this.state.updateFlashcardAnswer,
                examples:this.state.updateFlashcardExamples

            }
        ).then(
            (response) => {
                this.setState({
                    flashcards:response.data,
                    question:'',
                    tips:'',
                    answer: '',
                    examples: ''
                })
            }
        )
        event.target.reset()
        window.location.reload(true)
    }

    changeUpdateFlashcardQuestion = (event) => {
        this.setState(
            {
                updateFlashcardQuestion:event.target.value
            }
        )
    }

    changeUpdateFlashcardTips = (event) => {
        this.setState(
            {
                updateFlashcardTips:event.target.value
            }
        )
    }

    changeUpdateFlashcardAnswer = (event) => {
        this.setState(
            {
                updateFlashcardAnswer:event.target.value
            }
        )
    }

    changeUpdateFlashcardExamples = (event) => {
        this.setState(
            {
                updateFlashcardExamples:event.target.value
            }
        )
    }

    render = () => {
        return <div className='main'><br />
            <div className='itemBox'>
                {
                    this.state.flashcards.map(
                        (card, index) => {
                            return <div className='item' key={index}>

                            <details>
                                <summary>{card.question}</summary><br />
                                Pro Tips: <i>{card.tips}</i><br />
                                My Answers: <b>{card.answer}</b><br />
                                Examples: <b>{card.examples}</b><br />
                                <details>
                                <summary id='gold'>Edit Details</summary><br />

                                <form id={card.id} onSubmit={this.updateFlashcard}>
                                    <input id='gray' onKeyUp={this.changeUpdateFlashcardQuestion} type="text" defaultValue={card.question} /><br/>
                                    <input id='gray' onKeyUp={this.changeUpdateFlashcardTips} type="text" defaultValue={card.tips} /><br/>
                                    <input id='gray' onKeyUp={this.changeUpdateFlashcardAnswer} type='text' defaultValue={card.answer} /><br />
                                    <input id='gray' onKeyUp={this.changeUpdateFlashcardExamples} type='text' defaultValue={card.examples} /><br />
                                    <input id='update' type="submit" value="Update Flashcard"/>
                                </form>
                                <button id='delete' value={card.id} onClick={this.deleteFlashcard}>DELETE</button>
                                </details>
                              </details>
                            </div>
                        }
                    )
                }
            </div>
            <br /><br />
            <form onSubmit={this.createFlashcard}>
                <textarea rows='5' cols='40' onKeyUp={this.changeNewFlashcardQuestion} type="text" placeholder="interview question" /><br/>
                <textarea rows='5' cols='40' onKeyUp={this.changeNewFlashcardTips} type="text" placeholder="pro tips" /><br/>
                <textarea rows='5' cols='40' onKeyUp={this.changeNewFlashcardAnswer}
                type='text' placeholder='your answers' /><br />
                <textarea rows='5' cols='40' onKeyUp={this.changeNewFlashcardExamples}
                type='text' placeholder='specific examples' /><br />
                <input id='create' type="submit" value="Create A New Flashcard" />
            </form><br /><br />
        </div>
    }
}

ReactDOM.render(
    <App></App>,
    document.querySelector('main')
)
