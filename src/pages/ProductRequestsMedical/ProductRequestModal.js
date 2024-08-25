import React from "react"
import PropTypes from "prop-types"
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table,
} from "reactstrap"


const ProductRequestModal = props => {
  const { isOpen, toggle,productRequest } = props
  return (
    <Modal
      isOpen={isOpen}
      role="dialog"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      toggle={toggle}
    >
      <div className="modal-content">
        <ModalHeader toggle={toggle}>Product Request Details</ModalHeader>
        <ModalBody>
          <p className="mb-2">
            Product Name: <span className="text-primary">{productRequest?.name}</span>
          </p>
          <p className="mb-4">
            Company Name: <span className="text-primary">{productRequest?.company}</span>
          </p>
          <p className="mb-4">
            Chemical  Combination: <span className="text-primary">{productRequest?.chemical_combination}</span>
          </p>

          <div className="table-responsive">
            <Table className="table align-middle table-nowrap">
              <thead>
                <tr>
                  <th scope="col">Type</th>
                  <th scope="col">GST</th>
                  <th scope="col">Category</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">
                    <div>
                     {productRequest?.type_name}
                    </div>
                  </th>
                  <td>
                    <div>
                      <h5 className="text-truncate font-size-14">  {productRequest?.gst}%</h5>
                     
                    </div>
                  </td>
                  <td>  {productRequest?.product_category_name}</td>
                </tr>
              
              </tbody>
            </Table>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button type="button" color="secondary" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </div>
    </Modal>
  )
}

ProductRequestModal.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
}

export default ProductRequestModal
