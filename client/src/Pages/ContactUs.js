import React from 'react'

export const ContactUs = () => {
  return (
    <div className="col-md-auto col-lg-auto" style={{ marginRight: "15%", marginLeft: "15%", marginTop: "5%" }}>
        <h4 className="mb-3">Contact Us</h4>
        <form className="needs-validation" noValidate="">
        <div className="row g-3">
            
        <div className="col-12">
            <label htmlFor="title" className="form-label">
            Title <span className="text-muted" />
            </label>
            <input type="text" className="form-control" id="title" placeholder="title"/>
        <div className="invalid-feedback">
        </div>
      </div>
      <div className="col-12">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          className="form-control"
          id="description"
          rows={4}
          placeholder="descripe your issue here"
          defaultValue={""}
        />
      </div>
    </div>
    <hr className="my-4" />
    <div className="text-center">
      <button className="w-25 btn btn-primary btn-lg" type="submit">Send</button>
            </div>
        </form>
    </div>
  )
}
