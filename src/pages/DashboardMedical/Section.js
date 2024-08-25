import React,{useEffect,useState} from 'react';
import { Col, Row } from 'reactstrap';


const Section = props =>  {
    const [username, setusername] = useState("Admin");
    useEffect(() => {
        if (localStorage.getItem("authUser")) {
          if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
            const obj = JSON.parse(localStorage.getItem("authUser"));
            setusername(obj.displayName);
          } else if (
            process.env.REACT_APP_DEFAULTAUTH === "fake" ||
            process.env.REACT_APP_DEFAULTAUTH === "jwt"
          ) {
            const obj = JSON.parse(localStorage.getItem("authUser"));
            setusername(obj.username);
          }else if(process.env.REACT_APP_DEFAULTAUTH === "auth"){
    
            const obj = JSON.parse(localStorage.getItem("authUser"));
           if(obj) setusername(obj?.data?.f_name+' '+obj?.data?.l_name);
    
          }
        }
      }, [props.success]);

    return (
        <React.Fragment>
            <Row className="mb-4">
                <Col lg={12}>
                    <div className="d-flex align-items-center">
                        {/* <img src={avatar} alt="" className="avatar-sm rounded" /> */}
                        <div className="ms-3 flex-grow-1">
                            <h5 className="mb-2 card-title">Hello, {username}</h5>
                            {/* <p className="text-muted mb-0">Ready to jump back in?</p> */}
                        </div>
                        {/* <div>
                            <Link to="#" className="btn btn-primary"><i className="bx bx-plus align-middle"></i> Add New Jobs</Link>
                        </div> */}
                    </div>
                </Col>
            </Row>
        </React.Fragment>
    );
}

export default Section;