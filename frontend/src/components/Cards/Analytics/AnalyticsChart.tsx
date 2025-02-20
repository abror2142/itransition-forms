import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "../../../utils/axios";
import { useAuth } from "../../../hooks/useAuth";

export const AnalyticsChart = ({ formId }) => {
    const [data, setData] = useState();
    const [dates, setDates] = useState();
    const [info, setInfo] = useState();
    const { authToken } = useAuth();
    
    useEffect(() => {
        const fetchDates = async () => {
            const url = `api/form/${formId}/fillings`;
            try{
                const resp = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                });
                setData(resp.data);
            } catch(e) {
                console.log(e);
            }
        }
        if(formId){
            fetchDates();
        }
    }, [formId])

    let state = {
        series: [{
            name: "Number of fillings",
            data: dates
        }],
        options: {
          chart: {
            height: 350,
            type: 'line',
            zoom: {
              enabled: false
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'straight'
          },
          title: {
            text: 'Fillings by Days',
            align: 'left'
          },
          grid: {
            row: {
              colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
              opacity: 0.5
            },
          },
          xaxis: {
            categories: info,
          }
        },
    };

    useEffect(() => {
        if(data){
            setDates(data?.map(item => item?.fillings));
            setInfo(data?.map(item => item?.date));
        }
    }, [data])
    console.log(info, dates)
    return (
      <div>
            { 
                info 
                && dates 
                && <div>
                    <div id="chart" className="max-w-lg bg-white px-4 py-2">
                            <ReactApexChart 
                                options={state.options} 
                                series={state.series} 
                                type="line" 
                                height={350} 
                                width={400}
                            />
                        </div>
                    <div id="html-dist"></div>
                </div>
            }
      </div>
    );
  }
