import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { getFormFillingsTotal } from "../../../utils/api";
import { useAuth } from "../../../hooks/useAuth";
import { useTheme } from "../../../hooks/useTheme";

export const UserFillingsChart = ({ formId }: {formId: number}) => {
    const [data, setData] = useState();
    const { authToken } = useAuth();
    const { isDarkMode } = useTheme();
    useEffect(() => {
        const fetchDates = async () => {
          if(authToken && formId !== null){
            try {
                const resp = await getFormFillingsTotal(formId, authToken);
                setData(resp.data);
            } catch(e) {
                console.log(e);
            }
          }
        }
        fetchDates();
    }, [formId])

    let state = {
        series: [data?.filled, data?.total-data?.filled],
        options: {
          chart: {
            width: 400,
            type: 'pie',
            foreColor: isDarkMode ? '#ffffff' : '#000000',
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
      <div className="dark:bg-dark-blue bg-white mx-auto">
            { 
                data
                && <div>
                    <div id="chart" className="max-w-lg px-4 py-2">
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