import React from "react"
import PropTypes from "prop-types"
import { Card, CardBody, CardTitle, Table } from "reactstrap"
import { Link } from "react-router-dom";

const TeamMembers = ({history,ticket}) => {
  return (
    <Card>
      <CardBody>
        <CardTitle className="mb-4">Ticket History</CardTitle>
        <div className="table-responsive">
          <Table className="table align-middle table-nowrap">
          <tbody>
                <tr>
                  <td style={{ width: "50px" }}>
                   
                      <div className="avatar-xs">
                        <span className="avatar-title rounded-circle bg-primary text-white font-size-16">
                          <i className="bx bx-plus"></i>
                        </span>
                      </div>
                   
                  </td> 
                  <td><h5 className="font-size-14 m-0"><Link to="#" className="text-dark">Ticket created by {ticket.added_by=='admin' && 'Pharmwale staff'}{ticket.added_by=='seller' && 'Seller'}{ticket.added_by=='buyer' && 'Buyer'}.</Link></h5></td>
                  <td>
                   
                    <div>
                    {ticket?.created_at}
                    </div>
                  </td>
                </tr>
              </tbody>
            {history.map((item, key) => (
              <tbody key={key}>
                <tr>

                  <td style={{ width: "50px" }}>
                   
                      <div className="avatar-xs">
                        <span className="avatar-title rounded-circle bg-primary text-white font-size-16">
                          <i className="bx bx-plus"></i>
                        </span>
                      </div>
                   
                  </td> 
                  <td><h5 className="font-size-14 m-0"><Link to="#" className="text-dark">Ticket updated by Pharmwale staff.</Link></h5></td>
                  <td>
                    <div>
                      <Link to="#" className="badge bg-primary bg-soft text-primary font-size-11 me-1">
                      {item.buyer_status!=null?'Buyer':''}
                        {item.seller_status!=null?'Seller':''}
                        {item.rto_status!=null?'RTO':''}
                        {item.ticket_status!=null?'Ticket':''}
                      </Link>
                      <Link to="#" className="badge bg-primary bg-soft text-primary font-size-11">
                        {item.buyer_status!=null?item.buyer_status==1?'Open':'Close':''}
                        {item.seller_status!=null?item.seller_status==1?'Open':'Close':''}
                        {item.rto_status!=null?item.rto_status==1?'Open':'Close':''}
                        {item.rto_status!=null?item.ticket_status==1?'Open':'Close':''}
                        </Link>
                    </div>
                    <div>
                    {item.created_at}
                    </div>
                  </td>
                </tr>
              </tbody>
            ))}
          </Table>
        </div>
      </CardBody>
    </Card>
  )
}

TeamMembers.propTypes = {
  team: PropTypes.array,
}

export default TeamMembers
