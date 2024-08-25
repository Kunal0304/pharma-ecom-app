import React,{useState} from "react";
import PropTypes from "prop-types";
import { Card, CardBody, CardTitle, Input, FormGroup } from "reactstrap";
import { Link } from "react-router-dom";
import { map } from "lodash";
import {  useDispatch } from "react-redux";
import {
  addTicketMessage
} from "store/actions";
const Comments = ({ comments,ticket }) => {
  const dispatch = useDispatch();
  const [comment,setComment] = useState("")
  
  function submit(){
if(comment!=''){
  dispatch(addTicketMessage({message:comment,ticket_id:ticket.id,ticket_number:ticket.ticket_number}));
  setComment('');
}

  }
  return (
    <Card>
      <CardBody>
        <CardTitle className="mb-4">Comments</CardTitle>
        {map(comments, (comment, index) => (
          <>
            {comment?.added_by == 'admin' ? <div className="d-flex mb-4" key={index}>
              <div className="me-3">

                <div className="avatar-xs">
                  <span className="avatar-title rounded-circle bg-soft bg-primary text-primary font-size-16">
                    AD
                  </span>
                </div>

              </div>

              <div className="flex-grow-1">
                <h5 className="font-size-13 mb-1">Admin Staff</h5>
                <p className="text-muted mb-1">{comment?.message}</p>

              </div>
            </div> :
              <div className="d-flex mt-3">
                <div className="avatar-xs me-3">

                  <span className="avatar-title rounded-circle bg-soft bg-primary text-primary font-size-16">
                    SL
                  </span>

                </div>
                <div className="flex-grow-1">
                  <h5 className="font-size-13 mb-1">Seller</h5>
                  <p className="text-muted mb-1">
                    {comment?.message}
                  </p>
                </div>


              </div>}


          </>
        ))}

        <div className="d-flex mt-3">
          <div className="flex-grow-1">
            <FormGroup className="mb-4" row>


              <Input
                id="comment"
                name="comment"
                type="text"
                value={comment}
                onInput={(e)=>setComment(e.target.value)}
                placeholder="Enter Message..."
                className="form-control"
              />

            </FormGroup>
          </div>

          <div className="ms-3">
            <Link to="" className="text-primary" onClick={()=>submit()}>
              Reply
            </Link>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

Comments.propTypes = {
  comments: PropTypes.array,
};

export default Comments;
