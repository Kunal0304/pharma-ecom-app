import React from 'react';
import { Link } from 'react-router-dom';
import * as moment from "moment";
import { Badge } from 'reactstrap';

const FormateDate = (cell) => {

    const dateFormat = "DD MMM YY";
    const date1 = moment(new Date(cell.value)).format(dateFormat);
    return date1;
};

const OrderMenifest = (cell) => {
    return (
        <>
            <Link to={'/orders/' + cell.row.original.id} className="text-body fw-bold">{' '+cell.row.original.details.length + ' items By ' + cell?.row?.original?.customer?.f_name}</Link>
            <p>{cell.row.original.id}  {cell.row.original.invoice_number!=null?'| '+cell.row.original.invoice_number:''} {cell.row.original.payment_method=='razor_pay'?'| Prepaid':'| COD'} <span className="size-8 rounded-circle d-inline-block ml-1" style={{backgroundColor: 'green',height: '8px',width: '8px',lineHeight:'8px'}}></span></p>
        </>
    );
};

const OrderId = (cell) => {
    return (
        <>
            <Link to={'/orders/' + cell.row.original.id} className="text-body fw-bold">{cell.row.original.details.length + ' items By ' + cell?.row?.original?.customer?.f_name}</Link>
            <p>{cell.row.original.id}  {cell.row.original.invoice_number!=null?'| '+cell.row.original.invoice_number:''} {cell.row.original.payment_method=='razor_pay'?'| Prepaid':'| COD'} <span className="size-8 rounded-circle d-inline-block ml-1" style={{backgroundColor: 'green',height: '8px',width: '8px',lineHeight:'8px'}}></span></p>
        </>
    );
};

const TicketID = (cell) => {
    return (
        <Link to={'/tickets/' + cell.value} className="text-body fw-bold">#{cell.value ? cell.value : ''}</Link>
    );
};


const BillingName = (cell) => {
    return cell.value ? cell.value : '';
};

const Date = (cell) => {
    return cell.value ? cell.value : '';
};

const Total = (cell) => {
    return cell.value ? '₹' + cell.value : '';
};

const ProductRequestStatus = (cell) => {

    return (
        <Badge
            className={"font-size-12 badge-soft-" +
                (cell.value === 1 ? "success" : "danger" && cell.value === 2 ? "success" : "danger" && cell.value === 3 ? "warning" : "danger")}
        >

            {cell.value == 0 ? 'Cancelled' : ''}
            {cell.value == 1 ? 'Requested' : ''}
            {cell.value == 2 ? 'Accepted' : ''}
            {cell.value == 3 ? 'Rejected' : ''}

        </Badge>
    );
};

const ProductStatus = (cell) => {
    return (
        <Badge
            className={"font-size-12 badge-soft-" +
                (cell.value === 1 ? "USABLE" : "danger" && cell.value === 0 ? "warning" : "danger")}
        >
            {cell.value == 1 ? 'USABLE' : 'INACTIVE'}
        </Badge>
    );

}

const PaymentStatus = (cell) => {
    return (
        <Badge
            className={"font-size-12 badge-soft-" +
                (cell.value === "Paid" || cell.value === "confirmed" || cell.value === "delivered" || cell.value === "processing" ? "success"  : cell.value === "Refund" || cell.value === "out_of_delivery" ? "warning" : "danger")}
        >
            {cell.value=='out_of_delivery'?'Menifested':cell.value}
        </Badge>
    );
};
const PaymentMethod = (cell) => {
    return (
        <span>
            <i
                className={
                    (cell.value === "Paypal" ? "fab fa-cc-paypal me-1" : "" ||
                        cell.value === "COD" ? "fab fas fa-money-bill-alt me-1" : "" ||
                            cell.value === "Mastercard" ? "fab fa-cc-mastercard me-1" : "" ||
                                cell.value === "Visa" ? "fab fa-cc-visa me-1" : ""
                    )}
            />{" "}
            {cell.value}
        </span>
    );
};
export {
    OrderMenifest,
    ProductStatus,
    ProductRequestStatus,
    FormateDate,
    OrderId,
    TicketID,
    BillingName,
    Date,
    Total,
    PaymentStatus,
    PaymentMethod
};