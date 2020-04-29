import KeepService from '../keepServices/keepService.js'

import InfoFormElement from './InfoFormElement.jsx'
import Colors from './Colors.jsx'

const { Link } = ReactRouterDOM


export default class AddNote extends React.Component {

    state = {
        isColorsShow: false,
        note: {
            type: 'NoteText',
            isPinned: false,
            info: {
                title: ''
            },
            style: {
                backgroundColor: 'white'
            }
        }
    }
    componentDidMount() {
        console.log(this.props.isEditNote)
        console.log('this.props.note', this.props.note)
        if (this.props.isEditNote) {
            this.resetEditNote()
        }
    }

    resetEditNote = () => {
        this.setState({ note: this.props.note }, () => { console.log('state:', this.state) })
    }

    changeType = (type) => {
        this.clearForm()
        this.setState(prevState => ({
            note: { ...prevState.note, type }
        }))
    }

    addNote = (ev) => {
        ev.preventDefault()
        console.log(this.state.note);
        KeepService.addNote(this.state.note)
        this.clearForm()
        this.props.getNotes()
    }

    editedNote = () => {
        const note = this.state.note
        KeepService.deleteNote(note.id)
        KeepService.addNote(note)
        this.props.history.push('/keep')
    }

    clearForm = () => {
        const note = {
            type: 'NoteText',
            isPinned: false,
            info: {
                title: '',
                txt: '',
                url: ''
            },
            style: {
                backgroundColor: 'white'
            }
        }
        this.setState({ note })
    }

    handleChange = ({ target }) => {
        const field = target.name
        var value = target.value

        if (field === 'todos') {
            const todo = {
                id: this.state.todos ? this.state.todos.length : 0,
                txt: value,
                doneAt: null
            }
            var todos = this.state.todos
            todos.push(todo)
            value = todos
        }

        this.setState(prevState => ({
            note: { ...prevState.note, info: { ...prevState.note.info, [field]: value } }
        }), () => { console.log(this.state.note) })
    }

    pinNote = () => {

        const isPinned = !this.state.note.isPinned
        this.setState(prevState => ({
            note: { ...prevState.note, isPinned }
        }))
    }

    changeColor = (color) => {
        this.setState(prevState => ({
            note: { ...prevState.note, style: { ...prevState.note.style, backgroundColor: color } }
        }))
    }

    onColorPlate = () => {
        this.setState(({ isColorsShow }) => ({ isColorsShow: !isColorsShow }))
    }

    addTodo = () => {

    }

    render() {
        const { type, info, isPinned, style } = this.state.note
        const { note, isColorsShow } = this.state
        const { isEditNote } = this.props

        const pinStyle = {
            backgroundColor: isPinned ? '#ffd15c ' : 'white'
        }
        return (
            <section className="add-note" style={style}>
                <form onSubmit={isEditNote ? this.editedNote : this.addNote}>
                    <section className="add-note-top">
                        <div>
                            <button className="btn-pin-note-add" onClick={this.pinNote} type="button" style={pinStyle}></button>
                            <input type="text" name="title" value={info.title} onChange={this.handleChange} placeholder="Write title..." />
                        </div>
                        <InfoFormElement type={type} note={note} handleChange={this.handleChange} />
                    </section>
                    <section className="add-note-bottom">
                        <div className="panel-btns">
                            <div className="box-btns">
                                <div className="types">
                                    <button className="btn-text" type="button" onClick={() => { this.changeType('NoteText') }}></button>
                                    <button className="btn-img" type="button" onClick={() => { this.changeType('NoteImg') }}></button>
                                    <button className="btn-list" type="button" onClick={() => { this.changeType('NoteTodos') }}></button>
                                    <button className="btn-video" type="button" onClick={() => { this.changeType('NoteVideo') }}></button>
                                </div>
                                <div className="colors">
                                    {isColorsShow && <Colors changeColor={this.changeColor} onColorPlate={this.onColorPlate} addTodo={this.addTodo} />}
                                    <button className="btn-note-background" type="button" onClick={this.onColorPlate}></button>
                                </div>
                            </div>
                            <div className="actions-btn">
                                {isEditNote ?
                                    <button className="btn-clear" type="button" onClick={this.resetEditNote}><img src="../../assets/img/reset.png" />Reset</button> :
                                    <button className="btn-clear" type="button" onClick={this.clearForm}><img src="../../assets/img/clear.png" />Clear</button>
                                }
                                <button className="btn-submit" type="submit" ><img src="../../assets/img/ok.png" />OK</button>
                            </div>
                        </div>
                        {isEditNote && <Link className="btn-cancel" type="button" to={'/keep'}><img src="../../assets/img/clear.png" />Cancel</Link>}
                    </section>
                </form>
            </section>
        )
    }
}
