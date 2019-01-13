import React, { Component } from "react";
import {Button} from 'primereact/button';
import {Calendar} from 'primereact/calendar';
import {InputText} from 'primereact/inputtext';
import {InputTextarea} from 'primereact/inputtextarea';
import {SelectButton} from 'primereact/selectbutton';
import patientService from "../services/patientService";

class Patient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            age: '',
            gender: '',
            bloodGroup: '',
            dateOfBirth: '',
            rx: ''
        };
    }    
    handleSubmit = event => {
        event.preventDefault();
        patientService.save(this.state)
            .then(()=> alert('Patient saved'))
            .catch(error => console.error('Patient save failed. ', error));
    };
    render() {
        return (<form className="p-grid" onSubmit={this.handleSubmit}>  
            <div className="p-lg-offset-1 p-col-12 p-lg-10">
                <div className="">
                    <h1>New Patient</h1>
                </div>
            </div>

            <div className="p-lg-offset-1 p-col-12 p-lg-10"> 
                <div className="card card-w-title">
                    <h1>Personal Information</h1>
                    <div>
                        <span className="first">Name</span>
                    </div>
                    <InputText onChange={(e) => this.setState({name: e.target.value})} 
                        value={this.state.name}
                        placeholder="Patient's full name"
                        className="p-col-12" />

                    <div>
                        <span>Age</span>
                    </div>
                    <InputText onChange={(e) => this.setState({age: e.target.value})} 
                        value={this.state.age}
                        placeholder="Patient's age" keyfilter="pnum"
                        className="p-col-12" />

                    <div>
                        <span>Gender</span>
                    </div>
                    <SelectButton className="p-col-12 p-lg-12"
                        value={this.state.gender}
                        options={[
                            { label: 'Female', value: 'Female' },
                            { label: 'Male', value: 'Male' },
                            { label: 'Other', value: 'Other' }
                        ]} 
                        onChange={(e) => this.setState({gender: e.value})} />
                    
                    <div>
                        <span>Blood Group</span>
                    </div>                    
                    <SelectButton className="p-col-12 p-lg-12"
                        value={this.state.bloodGroup}
                        options={[
                            { label: 'A+', value: 'A+' },
                            { label: 'A-', value: 'A-' },
                            { label: 'B+', value: 'B+' },
                            { label: 'B-', value: 'B-' },
                            { label: 'O+', value: 'O+' },
                            { label: 'O-', value: 'O-' },
                            { label: 'AB+', value: 'AB+' },
                            { label: 'AB-', value: 'AB-' },
                            { label: 'h/h', value: 'h/h' },
                            { label: 'Other', value: 'Other' },
                        ]} 
                        onChange={(e) => this.setState({bloodGroup: e.value})} ></SelectButton>
                    <div>
                        <span>Date of Birth</span>
                    </div>
                    <Calendar className="p-col-12 p-fluid"
                        value={this.state.dateOfBirth} 
                        onChange={(e) => this.setState({dateOfBirth: e.value})} 
                        monthNavigator={true} yearNavigator={true} yearRange="1918:2018" />
                </div>

                <div className="card card-w-title">
                    <h1>Prescription</h1>
                    <div>
                        <span className="first">&#8478;</span>
                    </div>
                    <InputTextarea className="p-col-12"
                        onChange={(e) => this.setState({rx: e.target.value})} 
                        value={this.state.rx}
                        placeholder="Prescription"
                        autoResize={true}/>
                </div>
                <div className="card card-w-title">
                    <Button label="Save" />
                    <Button label="Clear" 
                        onClick={() => {this.setState({
                            name: '',
                            age: '',
                            gender: '',
                            bloodGroup: '',
                            dateOfBirth: '',
                            rx: ''
                        })}}
                        className="p-button-warning" />
                </div>
            </div>
        </form>);
    }
}
export default Patient;