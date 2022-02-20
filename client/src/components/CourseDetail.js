import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Context } from '../Context';
import ReactMarkdown from 'react-markdown';


function CourseDetail() {
    const history = useHistory();
    const context = useContext(Context);
    const authUser = context.authenticatedUser;
    const {id} = useParams();

   //Component State
   const [courseDetails, setCourseDetails] = useState();
   const [isLoading, setLoadingState] = useState(true);

    /* // Retrieve course data
    useEffect(() => {
        let isApiSubscribed = true;
        context.data.getCourse(id)
            .then(response => {
                if(isApiSubscribed) {
                    if(response.status === 404) {
                        history.push('/notfound');
                    } else {
                        setCourseDetails(response.course);
                    }    
                }
            })
            .catch(error => {
                console.error(error);
                history.push('./error');
            });
            return () => {
                isApiSubscribed = false;
            };
    },[context.data, history, id]); */

    // Retrieve course data
    useEffect(() => {
        
        context.data.getCourse(id)
            .then (response => {
                    if(response.status === 404) {
                        history.push('/notfound');
                    }
                    if(response){
                        setCourseDetails(response.course);
                        setLoadingState(false);   //Indicates loading is done and page can be rendered
                    }    
            })
            .catch(error => {
                console.error(error);
                history.push('./error');
            });  

    },[context, history, id]);

    return (
        isLoading ?
            <h2>Loading...</h2>
        :    
        
       <React.Fragment>
            <div className="actions--bar">
                <div className="wrap">
                    <Link className="button" to="/courses/:id/update/">Update Course</Link>
                    <Link className="button" to="/courses">Delete Course</Link>
                    <Link className="button button-secondary" to="/courses">Return to List</Link>
                </div>
            </div>
            
            <div className="wrap">
                <h2>Course Detail</h2>
                <form>
                    <div className="main--flex">
                        <div>
                            <h3 className="course--detail--title">Course</h3>
                            <h4 className="course--name">{courseDetails.title}</h4>
                            <p>{courseDetails.User.firstName} {courseDetails.User.lastName}</p>
                            <p>{courseDetails.description}</p>
                        </div>
                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            <p>{courseDetails.estimatedTime}</p>

                            <h3 className="course--detail--title">Materials Needed</h3>
                            <ReactMarkdown className="course--detail--list">
                                {courseDetails.materialsNeeded}    
                            </ReactMarkdown>
                        </div>
                    </div>
                </form>
            </div>
    </React.Fragment>
    
    );
}

export default CourseDetail;