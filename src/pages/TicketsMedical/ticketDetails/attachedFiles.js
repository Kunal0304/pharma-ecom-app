import React from "react"
import PropTypes from "prop-types"
import { Card, CardBody, CardTitle, Table } from "reactstrap"
import { Link } from "react-router-dom"
import { map } from "lodash"
import * as url from "./../../../helpers/url_helper";

const AttachedFiles = ({ files }) => {
  return (
    <Card>
      <CardBody>
        <CardTitle className="mb-4">Attached Files</CardTitle>
        <div className="table-responsive">
          <Table className="table-nowrap align-middle table-hover mb-0">
            <tbody>
              {map(files, (file, i) => (
                <tr key={"_file_" + i}>
                  <td style={{ width: "45px" }}>
                    <div className="avatar-sm">
                      <span className="avatar-title rounded-circle bg-primary bg-soft text-primary font-size-24">
                        <i className="bx bxs-file-doc" />
                      </span>
                    </div>
                  </td>
                  <td>
                    <h5 className="font-size-14 mb-1">
                      <Link to="#" className="text-dark">
                      {file?.image==null?file.pdf:file.image}
                      </Link>
                    </h5>
                    {/* <small>Size : {file?.size}</small> */}
                  </td>
                  <td>
                    <div className="text-center">
                      <Link to={file?.image==null?url.ASSET_URL+'ticket/'+file.pdf:url.ASSET_URL+'ticket/'+file.image} className="text-dark" target="_blank">
                        <i className="bx bx-download h3 m-0" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </CardBody>
    </Card>
  )
}

AttachedFiles.propTypes = {
  files: PropTypes.array,
}

export default AttachedFiles
