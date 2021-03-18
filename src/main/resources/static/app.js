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
                answer:this.state.newFlashcardAnswer
            }
        ).then(
            (response) => {
                this.setState({
                    flashcards:response.data,
                    question: '',
                    tips: '',
                    answer: ''
                })
            }
        )
        event.target.reset()
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
                answer:this.state.updateFlashcardAnswer
            }
        ).then(
            (response) => {
                this.setState({
                    flashcards:response.data,
                    question:'',
                    tips:'',
                    answer: ''
                })
            }
        )
        event.target.reset()
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

    render = () => {
        return <div className='main'>
            <form onSubmit={this.createFlashcard}>
                <input onKeyUp={this.changeNewFlashcardQuestion} type="text" placeholder="question" /><br/>
                <input onKeyUp={this.changeNewFlashcardTips} type="text" placeholder="tips" /><br/>
                <input onKeyUp={this.changeNewFlashcardAnswer}
                type='text' placeholder='your answers' /><br />
                <input id='create' type="submit" value="Create New Flashcard" />
            </form><br />
            <h2>List of Interview Questions:</h2>
            <div className='itemBox'>
                {
                    this.state.flashcards.map(
                        (card, index) => {
                            return <div className='item' key={index}>

                            <details>
                                <summary>{card.question}</summary>
                                Tips: <i>{card.tips}</i><br />
                                Answers: {card.answer}

                                <details>
                                <summary>Edit Details</summary>

                                <form id={card.id} onSubmit={this.updateFlashcard}>
                                    <input onKeyUp={this.changeUpdateFlashcardQuestion} type="text" placeholder="question"/><br/>
                                    <input onKeyUp={this.changeUpdateFlashcardTips} type="text" placeholder="tips"/><br/>
                                    <input onKeyUp={this.changeUpdateFlashcardAnswer} type='text' placeholder='answers' /><br />
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
        </div>
    }
}

ReactDOM.render(
    <App></App>,
    document.querySelector('main')
)
