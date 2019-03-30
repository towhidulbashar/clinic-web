import React, { Component } from "react";
import {Button} from 'primereact/button';
import {Calendar} from 'primereact/calendar';
import {InputText} from 'primereact/inputtext';
import {InputTextarea} from 'primereact/inputtextarea';
import {SelectButton} from 'primereact/selectbutton';
import Joi from "joi-browser";
import "./patient.css";
import patientService from "./patientService";
import { ValidationError } from '../common/ValidationError';


class Patient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            age: '',
            gender: '',
            bloodGroup: '',
            dateOfBirth: '',
            mobileNumber: '',
            address: '',
            rx: '',
            nameError: '',  
            genderError: '',          
            mobileNumberError: ''
        };
    }
    joiSchema = {
        name: Joi.string().label('Name').trim().max(1024).required(),       
        mobileNumber: Joi.string().label('Mobile Number').trim()            
            .allow('').strict().min(11).max(16),
        gender: Joi.string().label('Gender').required()
    };
    handleChange = e => {
        const key = e.target.name;
        const validateInputWrapper = () => {
            this.validateInput(key);
        };
        this.setState({ [e.target.name]: e.target.value }, () => validateInputWrapper());
    };
    validateInput = (key) => {
        if(`${key}Error` in this.state){
            const options = { abortEarly: false };
            const result = Joi.validate(this.state[key], this.joiSchema[key], options);
            this.setState({[`${key}Error`]: result.error });
        }
    };
    isDisabled = () => {
        const options = { abortEarly: false, allowUnknown: true };
        const result = Joi.validate(this.state, this.joiSchema, options);
        return Boolean(result.error);
    };
    handleSubmit = event => {
        event.preventDefault();
        patientService.save(this.state)
            .then(()=> alert('Patient saved'))
            .catch(error => console.error('Patient save failed. ', error));
    };
    clearState = () => {
        this.setState({
            name: '',
            age: '',
            gender: '',
            bloodGroup: '',
            dateOfBirth: '',
            mobileNumber: '',
            address: '',
            rx: '',
            nameError: '',
            genderError: '',            
            mobileNumberError: ''
        });
    };
    componentDidMount(){
        patientService.get()
        .then(res => console.log(res))
        .catch(e => console.log('get: ', e));
    }
    render() {
        const isDisabled = this.isDisabled();
        return (<form className="p-grid" autoComplete="off" onSubmit={this.handleSubmit}>  
            <div className="p-lg-offset-1 p-col-12 p-lg-10">
                <div className="">
                    <h1>New Patient</h1>
                </div>
            </div>

            <div className="p-lg-offset-1 p-col-12 p-lg-10"> 
                <div className="card card-w-title">
                    <h1>Personal Information</h1>
                    <div>
                        <span className="first">Name<span className="required">*</span> </span>
                    </div>
                    <InputText onChange={e => this.handleChange(e)}
                        name="name"
                        value={this.state.name}
                        placeholder="Patient's full name"                        
                        className={`p-col-12 ${this.state.nameError ? 'p-error' : ''}`} />
                    <ValidationError error={this.state.nameError} />

                    <div>
                        <span>Age</span>
                    </div>
                    <InputText onChange={e => this.handleChange(e)}
                        name="age" 
                        value={this.state.age}
                        placeholder="Patient's age" keyfilter="pnum"
                        className="p-col-12" />

                    <div>
                        <span>Gender<span className="required">*</span></span>
                    </div>
                    <SelectButton
                        onChange={ e => this.handleChange(e)}
                        options={[
                            { label: 'Female', value: 'Female' },
                            { label: 'Male', value: 'Male' },
                            { label: 'Other', value: 'Other' }
                        ]} 
                        name="gender"
                        value={this.state.gender}
                        className="p-col-12 p-lg-12"
                        />
                    <ValidationError error={this.state.genderError} />

                    <div>
                        <span>Blood Group</span>
                    </div>                    
                    <SelectButton 
                        onChange={e => this.handleChange(e)}
                        name="bloodGroup"
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
                        value={this.state.bloodGroup}
                        className="p-col-12 p-lg-12"
                        ></SelectButton>
                    <div>
                        <span>Date of Birth</span>
                    </div>
                    <Calendar className="p-col-12 p-fluid"                    
                        value={this.state.dateOfBirth} 
                        onChange={(e) => this.setState({dateOfBirth: e.value})} 
                        monthNavigator={true} yearNavigator={true} yearRange="1918:2018" />
                    <div>
                        <span>Mobile Number</span>
                    </div>
                    <InputText onChange={e => this.handleChange(e)}
                        name="mobileNumber"
                        value={this.state.mobileNumber}
                        placeholder="Patient's mobile number"
                        className={`p-col-12 ${this.state.mobileNumberError ? 'p-error' : ''}`}
                        maxLength="16"/>
                    <ValidationError error={this.state.mobileNumberError} />

                    <div>
                        <span>Address</span>
                    </div>
                    <InputTextarea className="p-col-12"
                        onChange={e => this.handleChange(e)}
                        name="address"
                        value={this.state.address}
                        placeholder="Patient's address"
                        autoResize={true}
                        maxLength="10240"/>                        
                </div>

                <div className="card card-w-title">
                    <h1>Prescription</h1>
                    <div>
                        <span className="first">&#8478;</span>
                    </div>
                    <InputTextarea className="p-col-12"
                        onChange={e => this.handleChange(e)}
                        name="rx"
                        value={this.state.rx}
                        placeholder="Prescription"
                        autoResize={true}/>
                </div>
                <div className="card card-w-title">
                    <Button label="Save" disabled={isDisabled} />
                    <Button label="Clear" type="button"
                        onClick={() => this.clearState()}
                        className="p-button-warning" />
                </div>
            </div>
        </form>);
    }
}
export default Patient;