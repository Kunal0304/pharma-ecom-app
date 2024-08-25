import React from 'react';
import { Link } from 'react-router-dom';

const Idno = (cell) => {
    return  <Link to="#" className="text-body fw-bold">{cell.value ? cell.value : ''}</Link>
};

const Pdate = (cell) => {
    return cell.value ? cell.value : '';
};

const Type = (cell) => {
    return cell.value ? cell.value : '';
};

const Value = (cell) => {
    return cell.value ? cell.value : '';
};

const ValueInUsd = (cell) => {
    return cell.value ? cell.value : '';
};

const Amount = (cell) => {
    return cell.value ? cell.value : '';
};



export {
    Idno,
    Pdate,
    Type,
    Value,
    Amount,
    ValueInUsd,
};