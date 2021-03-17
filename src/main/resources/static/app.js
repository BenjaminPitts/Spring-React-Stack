class App extends React.Component {
    state = {
        people:[]
    }

    componentDidMount = () => {
        axios.get('/people').then(
            (response) => {
                this.setState({
                    people:response.data
                })
            }
        )
    }

    createPerson = (event) => {
        event.preventDefault();
        axios.post(
            '/people',
            {
                name:this.state.newPersonName,
                age:this.state.newPersonAge,
            }
        ).then(
            (response) => {
                this.setState({
                    people:response.data,
                    name: '',
                    age: ''
                })
            }
        )
        event.target.reset()
    }

    changeNewPersonAge = (event) => {
        this.setState({
            newPersonAge:event.target.value
        });
    }

    changeNewPersonName = (event) => {
        this.setState({
            newPersonName:event.target.value
        });
    }

    deletePerson = (event) => {
        axios.delete('/people/' + event.target.value).then(
            (response) => {
                this.setState({
                    people:response.data
                })
            }
        )

    }

    updatePerson = (event) => {
        event.preventDefault();
        const id = event.target.getAttribute('id');
        axios.put(
            '/people/' + id,
            {
                name:this.state.updatePersonName,
                age:this.state.updatePersonAge,
            }
        ).then(
            (response) => {
                this.setState({
                    people:response.data,
                    name:'',
                    age:null,
                })
            }
        )
        event.target.reset()
    }

    changeUpdatePersonName = (event) => {
        this.setState(
            {
                updatePersonName:event.target.value
            }
        )
    }

    changeUpdatePersonAge = (event) => {
        this.setState(
            {
                updatePersonAge:event.target.value
            }
        )
    }

    render = () => {
        return <div className='main'>
            <h2>Create Person</h2>
            <form onSubmit={this.createPerson}>
                <input onKeyUp={this.changeNewPersonName} type="text" placeholder="name" /><br/>
                <input onKeyUp={this.changeNewPersonAge} type="number" placeholder="age" /><br/>
                <input type="submit" value="Create Person" />
            </form><br />
            <h2>List of People</h2>
            <div className='itemBox'>
                {
                    this.state.people.map(
                        (person, index) => {
                            return <div className='item' key={index}>

                                Name: {person.name}<br />
                                Age: {person.age}

                                <details>
                                <summary>Edit {person.name}'s Details</summary>

                                <form id={person.id} onSubmit={this.updatePerson}>
                                    <input onKeyUp={this.changeUpdatePersonName} type="text" placeholder="name"/><br/>
                                    <input onKeyUp={this.changeUpdatePersonAge} type="number" placeholder="age"/><br/>
                                    <input type="submit" value="Update Person"/>
                                </form>
                                <button id='delete' value={person.id} onClick={this.deletePerson}>DELETE</button>
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
