import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";

const SalesReport = () => {
  const [totalSale, setTotalSale] = useState({});
  useEffect(() => {
    axios
      .get("https://amazon-clone-votv.onrender.com/admin/salesreport", {
        withCredentials: true,
      })
      .then((res) => {
        setTotalSale(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const chartConfig = {
    type: "line",
    height: 240,
    series: [
      {
        name: "Sales",
        data: totalSale.sales,
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      title: {
        show: "",
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#020617"],
      stroke: {
        lineCap: "round",
        curve: "smooth",
      },
      markers: {
        size: 0,
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
        categories: totalSale.month,
      },
      yaxis: {
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
      },
      grid: {
        show: true,
        borderColor: "#dddddd",
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 5,
          right: 20,
        },
      },
      fill: {
        opacity: 0.8,
      },
      tooltip: {
        theme: "dark",
      },
    },
  };
  return (
    <div className="">
      <div className=" w-full bg-yellow-100 h-[10%] flex justify-center items-center ">
        <p className=" font-bold">Total Sales : ₹ {totalSale.total}</p>
      </div>
      <div className=" w-full flex justify-center h-full items-center mt-[3%] ">
        <Card className="w-[50%] max-sm:h-1/2 max-sm:w-3/4">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="flex  flex-col gap-4 rounded-none md:flex-row md:items-center"
          >
            <div className=" rounded-lg bg-white text-white">
              <img
                width={50}
                src="https://res.cloudinary.com/dunf6rko6/image/upload/v1705728747/seo-report_7289700_sipjfo.png"
                alt=""
              />
            </div>
            <div>
              <Typography variant="h6" color="blue-gray">
                Sales Report
              </Typography>
              <Typography
                variant="small"
                color="gray"
                className="max-w-sm font-normal"
              >
                Total sales/month
              </Typography>
            </div>
          </CardHeader>
          <CardBody className="px-2 pb-0">
            <Chart {...chartConfig} />
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default SalesReport;
