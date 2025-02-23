import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "../../../utils/axios";
import { useAuth } from "../../../hooks/useAuth";

export const UserFillingsChart = ({ formId }: {formId: string}) => {
    const [data, setData] = useState();
    const { authToken } = useAuth();
    
    useEffect(() => {
        const fetchDates = async () => {
            const url = `api/form/${formId}/filled`;
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
        series: [data?.filled, data?.total-data?.filled],
        options: {
          chart: {
            width: 380,
            type: 'pie',
          },
          labels: ['Filled', 'Not Filled'],
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom'
              }
            }
          }]
        },  
    }

    return (
      <div>
            { 
                data
                && <div>
                    <div id="chart" className="max-w-lg bg-white px-4 py-2">
                            <ReactApexChart 
                                options={state.options} 
                                series={state.series} 
                                type="pie" 
                                width={380} 
                            />
                        </div>
                    <div id="html-dist"></div>
                </div>
            }
      </div>
    );
}