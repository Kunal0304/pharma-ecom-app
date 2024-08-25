import React, { useEffect } from "react";
import PropTypes from "prop-types";
import withRouter from "components/Common/withRouter";
import { isEmpty } from "lodash";
import { Col, Container, Row } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb";

import {
  getTicketDetails as onGetTicketDetail,
} from "store/actions";
import ProjectDetail from "./projectDetail";
import TeamMembers from "./teamMembers";
import AttachedFiles from "./attachedFiles";
import Comments from "./comments";

//redux
import { useSelector, useDispatch } from "react-redux";

const TicketDetails = props => {

  //meta title
  document.title = "Ticket Details | Pharmwale";

  const dispatch = useDispatch();

  const { ticket_detail } = useSelector(state => ({
    ticket_detail: state.OrderReducer.ticket_detail,
  }));

  const params = props.router.params;

  useEffect(() => {
   
    if (params && params.id) {
      console.log(params,'params')
      dispatch(onGetTicketDetail(params.id));
    } 

  }, [onGetTicketDetail]);



  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Ticket" breadcrumbItem="Ticket Detail" />

          {!isEmpty(ticket_detail) && (
            <>
              <Row>
                <Col lg="12">
                  <ProjectDetail ticket={ticket_detail} />
                 
                
                
                </Col>
                </Row>
                <Row>

                <Col lg="4">
                  <TeamMembers history={ticket_detail?.history} ticket={ticket_detail} />
                </Col>

                <Col lg="8">
                
                  <AttachedFiles files={ticket_detail?.images} />
              
                  <Comments comments={ticket_detail?.message} ticket={ticket_detail} />
                
                </Col>
               
              </Row>

            </>
          )}
        </Container>
      </div>
    </React.Fragment>
  );
};

TicketDetails.propTypes = {
  match: PropTypes.object,
};

export default withRouter(TicketDetails);
