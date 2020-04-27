import KeepService from '../keepServices/keepService.js'

import InfoFormElement from './InfoFormElement.jsx'
import Colors from './Colors.jsx'


export default class AddNote extends React.Component {

    state = {
        type: 'NoteText',
        isPinned: false,
        info: {
            title: '',
            txt: ''
        },
        style: {
            backgroundColor: "white"
        }
    }

    changeType = (type) => {
        this.setState({ type })
    }

    addNote = (ev) => {
        ev.preventDefault()

        KeepService.addNote(this.state)
        this.props.getNotes()
    }

    handleChange = ({ target }) => {
        console.log(target)
        const field = target.name
        var value = target.value

        if (field === 'todos') {
            var todos = this.state.note.info.todos
            note = {
                txt: value,
                doneAt: null
            }
            todos.push(note)
            value = todos
        }

        this.setState(prevState => ({
            info: { ...prevState.info, [field]: value }
        }))
    }

    pinNote = () => {
        this.setState(({ isPinned }) => ({ isPinned: !isPinned }), () => { console.log('isPinned:', this.state.isPinned) })
    }

    render() {
        const { type, info, isPinned } = this.state

        const isPinStyle = {
            backgroundColor: isPinned ? '#ffd15c ' : 'white'
        }
        return (
            <section className="add-note">
                <form onSubmit={this.addNote}>
                    <div>
                        <button className="btn-pin-note-add" onClick={this.pinNote} type="button" style={isPinStyle}></button>
                        <input type="text" name="title" value={info.title} onChange={this.handleChange} placeholder="Write title..." />
                    </div>
                    <InfoFormElement type={type} state={this.state} handleChange={this.handleChange} />

                    <div className="panel-btns">
                        <div className="box-btns">
                            <div className="types">
                                <button className="btn-text" type="button" onClick={() => { this.changeType('NoteText') }}></button>
                                <button className="btn-img" type="button" onClick={() => { this.changeType('NoteImg') }}></button>
                                <button className="btn-list" type="button" onClick={() => { this.changeType('NoteText') }}></button>
                                <button className="btn-video" type="button" onClick={() => { this.changeType('NoteVideo') }}></button>
                            </div>
                            <div className="colors">
                                {/* <Colors /> */}
                                <button className="btn-note-background" type="button"></button>
                            </div>
                        </div>
                        <div className="actions-btn">
                            <button className="btn-submit" type="submit" ><img src="../../assets/img/ok.png" />OK</button>
                            {/* <button className="btn-close" type="button" ><img src="../../assets/img/close.png" />Close</button> */}
                        </div>
                    </div>
                </form>

            </section>
        )
    }
}
