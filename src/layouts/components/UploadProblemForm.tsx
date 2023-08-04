"use client"

import { UploadDropzone } from "@/lib/uploadthing";
import { useState } from 'react'
import "@uploadthing/react/styles.css";

const UploadProblemForm = () => {

  const [url, setUrl] = useState<string>("");

  return (
    <>
      <section className="section-sm">
        <div className="container">
          <div className="row">
            <div className="mx-auto md:col-10 lg:col-6 text-center">
              <form action={""} method="POST">
                <div className="mb-6">
                  <label htmlFor="title" className="form-label">
                    שם השאלה
                  </label>
                  <input
                    id="title"
                    className="form-input"
                    type="text"
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="course" className="form-label">
                    קורס
                  </label>
                  <input
                    id="mail"
                    className="form-input"
                    type="email"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="chapter" className="form-label">
                    פרק
                  </label>
                  <input
                    id="chapter"
                    className="form-input"
                    type="chapter"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="difficulty" className="form-label">
                    רמת קושי
                  </label>
                  <input
                    id="difficulty"
                    className="form-input"
                    type="difficulty"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="url" className="form-label">
                    קישור לשאלה
                  </label>
                  <input
                    id="url"
                    className="form-input"
                    type="url"
                  />
                </div>
                <UploadDropzone
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    if (res) {
                      // const json = JSON.stringify(res[0].fileUrl)
                      setUrl(res[0].fileUrl);
                      console.log(url)
                      // console.log("Files: ", res[0].fileUrl);
                    }
                  }}
                  onUploadError={(error: Error) => {
                    // Do something with the error.
                    alert(`ERROR! ${error.message}`);
                  }}
                />
                <button type="submit" className="btn btn-primary">
                  העלאה
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default UploadProblemForm;
