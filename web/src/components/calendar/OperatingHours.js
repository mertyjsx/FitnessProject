
import React, { Component } from 'react'
import { connect } from 'react-redux'
import "react-datepicker/dist/react-datepicker.css";
import Select from "./Select"
import { updateHours } from '../../store/actions/profileActions'

const weekDays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]

class OperatingHours extends Component {

    constructor(s) {
        super(s)
        this.state = {
            monday: { state: false, edit: false, from: "", to: "" },
            tuesday: { state: false, edit: false, from: "", to: "" },
            sunday: { state: false, edit: false, from: "", to: "" },
            wednesday: { state: false, edit: false, from: "", to: "" },
            thursday: { state: false, edit: false, from: "", to: "" },
            friday: { state: false, edit: false, from: "", to: "" },
            saturday: { state: false, edit: false, from: "", to: "" },
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            if (this.props.profile) {
                const obj = this.props.profile
                this.setState({
                    monday: { state: obj.monday.state, edit: false, from: obj.monday.from, to: obj.monday.to },
                    tuesday: { state: obj.tuesday.state, edit: false, from: obj.tuesday.from, to: obj.tuesday.to },
                    sunday: { state: obj.sunday.state, edit: false, from: obj.sunday.from, to: obj.sunday.to },
                    wednesday: { state: obj.wednesday.state, edit: false, from: obj.wednesday.from, to: obj.wednesday.to },
                    thursday: { state: obj.thursday.state, edit: false, from: obj.thursday.from, to: obj.thursday.to },
                    friday: { state: obj.friday.state, edit: false, from: obj.friday.from, to: obj.friday.to },
                    saturday: { state: obj.saturday.state, edit: false, from: obj.saturday.from, to: obj.saturday.to },
                })
            }
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: { ...this.state[e.target.name], [e.target.id]: e.target.value }
        })
    }

    update = () => {
        this.props.updateHours(this.state)
    }

    render() {

        return (
            <div class="operating-hours__container">
                {weekDays.map(item => {
                    return (
                        <div class="ui fitted toggle checkbox checkbox__container">
                            <input type="checkbox" class="hidden" checked={this.state[item].state} onClick={() => this.setState({ [item]: { ...this.state[item], state: !this.state[item].state } })} readonly="" tabindex="0" />
                            <label>{item}</label>
                            {
                                this.state[item].state ? (
                                    this.state[item].edit ? (
                                        [
                                            <Select first={this.state[item].from} handleChange={this.handleChange} id="from" name={item}></Select>
                                            ,
                                            <Select first={this.state[item].to} handleChange={this.handleChange} id="to" name={item}></Select>
                                            ,
                                            <p class="link" onClick={this.update}>Done</p>
                                        ]
                                    ) : (
                                            [
                                                <label>{this.state[item].from}-{this.state[item].to}</label>,
                                                <p class="link" onClick={() => this.setState({ [item]: { ...this.state[item], edit: true } })}>Edit</p>
                                            ]
                                        )
                                ) : (
                                        <label>Closed</label>
                                    )
                            }
                        </div>
                    )
                })}
                <p onClick={this.update} className="button button--secondary">Save</p>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    // console.log(state);
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile.Hours
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateHours: (cal) => dispatch(updateHours(cal))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OperatingHours)