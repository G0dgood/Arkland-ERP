import React from "react";
import { CSVLink } from "react-csv";
import moment from "moment";
import { Button } from "@material-ui/core";
import { AiOutlineDownload } from "react-icons/ai";



const EmployeesDownloader = ({ data }: any) => {



  const headers = [
    { label: "FULL NAME", key: "fullname" },
    { label: "EMAIL", key: "email" },
    { label: "EMPLOYMENT DATE", key: "employment_date" },
    { label: "ROLE", key: "role" },
    { label: "DEPARTMENT", key: "department" },
    { label: "CATEGORY", key: "category" },
    { label: "STATUS", key: "status" },
    { label: "GENDER", key: "gender" },
    { label: "STATE OF ORIGIN", key: "state_of_origin" },
    { label: "QUALIFICATION", key: "qualification" },
    { label: "COUNTRY", key: "country" },
    { label: "CITY", key: "city" },
  ];

  const loopData = (data: any) => {
    const newData: any = [];
    data?.forEach((item: any) => {
      newData?.push({
        fullname: item?.full_name,
        email: item?.email,
        employment_date:
          moment(item?.employment_date).format("DD-MM-YYYY") === "Invalid date"
            ? "No Date Given"
            : moment(item?.employment_date).format("DD-MM-YYYY"),
        role: item?.role,
        department: item?.department?.name,
        category: item?.category,
        status: item?.status,
        gender: item?.gender,
        state_of_origin: item?.state_of_origin,
        qualification: item?.qualification,
        country: item?.country,
        city: item?.city,
      });
    });
    return newData;
  };
  const exportData = loopData(data);

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  const csvdate =
    "EMPLOYEE REPORT  [" + day + "-" + month + "-" + year + "].csv";

  return (
    <CSVLink data={exportData} headers={headers} filename={csvdate}>

      <Button
        variant="contained"
        className="add-experience" >
        <AiOutlineDownload size={25} />
      </Button>
    </CSVLink>
  );
};

export default EmployeesDownloader;


