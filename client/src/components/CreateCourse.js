import React, { useState, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Context } from '../Context';
import Form from './Form';

function CreateCourse () {

    const context = useContext(Context);
    const history = useHistory();
    const location = useLocation();
    const authUser = context.authenticatedUser;
    




    const { from } = location.state || { from: { pathname: "/"} }



    // Component states
    const[course, setCourse] = useState('');
    

    
        return (

            
            <div className="wrap">
                <h2>Create Course</h2>
                <Form
                    submitButtonText = "Create Course"
                    //submit = {this.submit}
                    //cancel = {this.cancel}
                    //errors = {errors}

                    elements = {() => (
                        <React.Fragment>
                            <div className="main--flex">
                                <div>
                                    <label for="courseTitle">Course Title</label>
                                    <input id="courseTitle" name="courseTitle" type="text" value="" />

                                    <p>By Joe Smith</p>

                                    <label for="courseDescription">Course Description</label>
                                    <textarea id="courseDescription" name="courseDescription"></textarea>
                                </div>
                                <div>
                                    <label for="estimatedTime">Estimated Time</label>
                                    <input id="estimatedTime" name="estimatedTime" type="text" value="" />

                                    <label for="materialsNeeded">Materials Needed</label>
                                    <textarea id="materialsNeeded" name="materialsNeeded"></textarea>
                                </div>
                            </div>
                        </React.Fragment>
                    )}/>
            </div>
            
        );

}

export default CreateCourse;