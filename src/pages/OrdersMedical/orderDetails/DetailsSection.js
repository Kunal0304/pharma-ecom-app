import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, Col, Input } from 'reactstrap';
import { useDispatch } from "react-redux";
import {
  Row,
  Modal,
  Label
} from "reactstrap";
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import TableContainer from '../../../components/Common/TableContainer';

import {
  UncontrolledTooltip,
} from "reactstrap";


import {
  OrderId,
  BillingName,
  Total,
}
  from "./EcommerceOrderCol";
import { updateOrders } from 'store/actions';

const DetailsSection = ({ order_detail }) => {

  const [modal_xlarge, setmodal_xlarge] = useState(false);
  const [order, setOrder] = useState({});

  const dispatch = useDispatch();

  const handleOrderClicks = (data) => {

    setOrder(data)
    setmodal_xlarge(true);

  };

  const handleUpdateQuantity = () => {
    const newobj = {
      qty: order.qty,
      order_id: order.order_id,
      product_id: order.product_id 
    }
    dispatch(updateOrders(newobj));
  }

  const columns = useMemo(
    () => [

      {
        Header: 'Title',
        accessor: 'id',
        width: '150px',
        style: {
          textAlign: "center",
          width: "10%",
          background: "#0000",
        },
        filterable: true,
        Cell: (cellProps) => {
          return <OrderId {...cellProps} />;
        }
      },
      {
        Header: 'Packing',
        accessor: 'pack',
        filterable: true,
        Cell: (cellProps) => {
          return <BillingName {...cellProps} />;
        }
      }
      ,
      {
        Header: 'Expiry	',
        accessor: 'expiry_date',
        filterable: true,
        Cell: (cellProps) => {
          return <BillingName {...cellProps} />;
        }
      },
      {
        Header: 'Offer	',
        accessor: 'discount_type',

      },
      {
        Header: 'MRP	',
        accessor: 'unit_price',

      },
      {
        Header: 'PTR',
        accessor: 'price',
        filterable: true,

      },
      {
        Header: 'Qty',
        accessor: 'qty',

      },
      {
        Header: 'Effective PTR',
        accessor: 'effective_ptr',
        filterable: true,
        Cell: (cellProps) => {
          return <Total {...cellProps} />;
        }
      },
      {
        Header: 'GST',
        accessor: 'tax',
        filterable: true,

      },
      {
        Header: 'Final Price',
        accessor: 'price*qty',
        filterable: true,

      },
      {
        Header: 'Action',
        accessor: 'action',
        disableFilters: true,
        Cell: (cellProps) => {
          return (
            <div className="d-flex gap-3">
              <Link
                to="#"
                className="text-success"
                onClick={() => {
                  const orderData = cellProps.row.original;
                  handleOrderClicks(orderData);
                }}
              >
                <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
                <UncontrolledTooltip placement="top" target="edittooltip">
                  Edit
                </UncontrolledTooltip>
              </Link>

            </div>
          );
        }
      },
    ],
    []
  );

  const columns_next = useMemo(
    () => [

      {
        Header: 'Title',
        accessor: 'id',
        width: '150px',
        style: {
          textAlign: "center",
          width: "10%",
          background: "#0000",
        },
        filterable: true,
        Cell: (cellProps) => {
          return <OrderId {...cellProps} />;
        }
      },
      {
        Header: 'Packing',
        accessor: 'pack',
        filterable: true,
        Cell: (cellProps) => {
          return <BillingName {...cellProps} />;
        }
      }
      ,
      {
        Header: 'Expiry	',
        accessor: 'expiry_date',
        filterable: true,
        Cell: (cellProps) => {
          return <BillingName {...cellProps} />;
        }
      },
      {
        Header: 'Offer	',
        accessor: 'discount_type',

      },
      {
        Header: 'MRP	',
        accessor: 'unit_price',

      },
      {
        Header: 'PTR',
        accessor: 'price',
        filterable: true,

      },
      {
        Header: 'Qty',
        accessor: 'qty',

      },
      {
        Header: 'Effective PTR',
        accessor: 'effective_ptr',
        filterable: true,
        Cell: (cellProps) => {
          return <Total {...cellProps} />;
        }
      },
      {
        Header: 'GST',
        accessor: 'tax',
        filterable: true,

      },
      {
        Header: 'Final Price',
        accessor: 'price*qty',
        filterable: true,

      }
    ],
    []
  );
  return (
    <React.Fragment>
      <Modal size="sm" centered={true} isOpen={modal_xlarge} >
        <Row>
        <Col md={12}>
                        <div className="mb-3 p-3">
                          <Label htmlFor="formrow-email-Input">Quantity</Label>
                          <Input
                            name="quantity"
                            value={order.qty}
                            type="text"
                            placeholder="Enter Quantity"
                            onChange={(e) => setOrder({ ...order, qty: e.target.value })}
                          />
                        </div>
                      </Col>
                    </Row>
        <div className="hstack gap-2 justify-content-center mb-3">
          <button type="button" className="btn btn-danger" onClick={() => handleUpdateQuantity()}>Save Quantity</button>
          <button type="button" className="btn btn-secondary" onClick={() => setmodal_xlarge(false)}>Cancel</button>
        </div>
      </Modal>
      <Col xl={9}>
        <Card>

          <CardBody>
            {order_detail.details != undefined && order_detail.details != null ? <TableContainer
              columns={order_detail.order_status == 'pending' ? columns : columns_next}
              data={order_detail.details}
              isGlobalFilter={true}
              isAddOptions={false}
              handleOrderClicks={handleOrderClicks}
              customPageSize={10}
            /> : <></>}
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
}

export default DetailsSection;