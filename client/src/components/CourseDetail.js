import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Context } from '../Context';
import ReactMarkdown from 'react-markdown';


const CourseDetail = () => {
    const history = useHistory();
    const context = useContext(Context);
    const authUser = context.authenticatedUser;
    const {id} = useParams();

   //Component State
   const [courseDetails, setCourseDetails] = useState([]);
   const [user, setUser] = useState('');
   const [isLoading, setLoadingState] = useState(true);
   

    // Retrieve course data
    useEffect(() => {
        context.data.getCourse(id)
            .then (response => {
                    if(response.status === 404) {
                        history.push('/notfound');
                    } else {
                        setCourseDetails(response.course);
                        setUser(response.course.User);
                        setLoadingState(false);   //Indicates loading is done and page can be rendered
                    }    
            })
            .catch(error => {
                console.error(error);
                history.push('./error');
            });  
    },[context, history, id]);

     
console.log(isLoading);


/* 
  if(!isLoading){
        //console.log(courseDetails.id); 
        console.log(authUser.emailAddress); //Logged in user's emailaddress
        console.log(user);  
        //console.log(courseDetails.id);
        console.log(authUser.id);
    }  */


   const handleCourseDelete = () => {
        context.data.deleteCourse(courseDetails.id, authUser.emailAddress, authUser.password)
            .then(response => {
                if(response.status === 204){
                    console.log('Course deleted');
                    history.push('/courses');
                } else if(response.status === 401) {
                    history.push('/forbidden')
                    console.log('You are not authorized to view this page!')
                } else if(response.status === 404) {
                    history.push('./notfound');
                    console.log('Page not found!')
                }else if(response.status === 500) {
                    history.push('/error');
                    console.log('An unexpected error has occurred!')
                } else {
                    throw new Error();
                }
            })
            .catch(error => {
                console.log(error);
                history.push('./error');
            })
    };

    console.log(authUser);
    console.log(authUser.emailAddress);
    console.log(authUser.password);
    console.log(authUser.id);
 

    return (
        isLoading ?
            <h2>Loading...</h2>
        :    
        
       <React.Fragment>
            <div className="actions--bar">
                <div className="wrap">
                    { authUser && user.emailAddress === authUser.emailAddress ? (
                        <React.Fragment>
                            <Link className="button" to="/courses/update/">Update Course</Link>    {/* Need to change link later */}
                            <button className="button" onClick={handleCourseDelete} >Delete Course</button>
                            <Link className="button button-secondary" to="/courses">Return to List</Link>  
                        </React.Fragment>
                    )
                    :
                        <Link className="button button-secondary" to="/courses">Return to List</Link>
                    }

                </div>
            </div>
            
            <div className="wrap">
                <h2>Course Detail</h2>
                <form>
                    <div className="main--flex">
                        <div>
                            <h3 className="course--detail--title">Course</h3>
                            {courseDetails ?
                            <h4 className="course--name">{courseDetails.title}</h4>
                            : <h4>Loading...</h4>
                            }
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