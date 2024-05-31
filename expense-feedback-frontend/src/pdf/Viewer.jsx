import React, { useEffect, useState } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import './viewer.css'
import pdf from "../pdf/policies.pdf";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const Viewer = () => {
  const [totalPages, settotalPages] = useState(0);
  const [pageNumber, setpageNumber] = useState(1); 

  useEffect(() => {


    pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  }, []);
  /**
   *
   * @param {Object} event
   *
   * this function will be called when pdf is loaded
   */
  function onDocLoad(event) {
    console.log("Pdf loaded: ", event.numPages);
    settotalPages(event.numPages);
  }

  const changePage = (param) => {
    if (param === "prev") {
      setpageNumber((prev) => prev - 1);
    }

    if (param === "next") {
      setpageNumber((prev) => prev + 1);
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdf;
    link.download = 'policies.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className=" w-full h-screen flex justify-start items-start overflow-hidden">
      <div className="border-r-2 border-gray-400 px-3 w-60 p-2 h-full">
        <div style={{color: 'black'}} className="px-2 py-3 border-b-2 text-center font-semibold text-lg">
          Pages
        </div>
        <div className="h-full">
          <Document
            className={
              "flex flex-col justify-start items-center overflow-auto h-full"
            }
            file={pdf}
            onLoadSuccess={onDocLoad}
          >
            {
              Array(totalPages+1)
                .fill()
                .map((_, index) => (
                  <div
                    onClick={() => {
                      setpageNumber(index);
                    }}
                    className={`border-[4px] cursor-pointer relative rounded my-2 ${
                      pageNumber === index ? "border-green-700" : ""
                    }`}
                  >
                    <Page
                      height={180}
                      pageIndex={index + 1}
                      pageNumber={index}
                    ></Page>
                  </div>
                ))
            }
          </Document>
        </div>
      </div>
      <div className="w-full h-full">
        <div className="w-full bg-slate-100 h-full">
          <div className="bg-white h-16 py-2 px-4 flex justify-between items-center">
            <div className="font-semibold text-lg" style={{color: 'black'}}>Policies PDF</div>
            <div className="flex justify-center items-center gap-1">
              <div className="flex justify-center items-center gap-1">
                <IoIosArrowBack
                  className="cursor-pointer"
                  style={{color: 'black'}}
                  onClick={() => changePage("prev")}
                />
                <div className="px-3 py-1 rounded" style={{color: 'black'}}>{pageNumber}</div>
                <p style={{color: 'black'}}>of</p>
                <div className="px-3 py-1 rounded" style={{color: 'black'}}>{totalPages}</div>
                <IoIosArrowForward
                  className="cursor-pointer"
                  style={{color: 'black'}}
                  onClick={() => changePage("next")}
                />
              </div>
            </div>
            <div>
              <button className="bg-black text-white px-6 cursor-pointer py-2 rounded" onClick={handleDownload}>
                Download
              </button>
            </div>
          </div>
          <div className="w-full bg-slate-100 p-4 h-full overflow-auto flex justify-center items-start">
            <Document file={pdf}>
              <Page pageNumber={pageNumber} pageIndex={pageNumber}></Page>
            </Document>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Viewer;
