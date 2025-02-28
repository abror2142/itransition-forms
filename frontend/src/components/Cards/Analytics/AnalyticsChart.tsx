import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useAuth } from "../../../hooks/useAuth";
import { getFormFillingsByDate } from "../../../utils/api";
import { useTheme } from "../../../hooks/useTheme";

interface UserFillings {
  date: string;
  fillings: number;
}

export const AnalyticsChart = ({ formId }: {formId: number}) => {
    const [dates, setDates] = useState<string[]>();
    const [info, setInfo] = useState<number[]>();
    const { authToken } = useAuth();
    const { isDarkMode } = useTheme();

    useEffect(() => {
        const fetchDates = async () => {
            if(authToken){
              try{
                const resp = await getFormFillingsByDate(formId, authToken)
                const data: UserFillings[] = resp.data;
                console.log(data)
                if(data){
                  setDates(data.map(item => item.date));
                  setInfo(data.map(item => item.fillings));
                }
              } catch(e) {
                console.log(e);
              }
            }  
        }
        if(formId){
            fetchDates();
        }
    }, [formId])

    const state = {

      series: [{
          name: "Desktops",
          data: info
      }],
      options: {
        chart: {
          height: 350,
          width: 400,
          type: 'line',
          zoom: {
            enabled: false
          },
          background: 'transparent',
          foreColor: isDarkMode ? '#ffffff' : '#000000', // changes text color
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'straight'
        },
        title: {
          text: 'Created Forms by Days',
          align: 'left'
        },
        grid: {
          row: {
            colors: [isDarkMode ? '#121212' : '#f3f3f3', 'transparent'],
            opacity: 0.5
          },
          borderColor: isDarkMode ? '#374151' : '#e5e7eb'
        },
        colors: isDarkMode ? ['#a78bfa', '#f472b6'] : ['#3b82f6', '#facc15'], 
        tooltip: {
          theme: isDarkMode ? 'dark' : 'light'
        },
        xaxis: {
          categories: dates,
          labels: {
              style: {
                colors: isDarkMode ? '#ffffff' : '#000000'
              }
            }
        },
        yaxis: {
          labels: {
            style: {
              colors: isDarkMode ? '#ffffff' : '#000000'
            }
          }
        }
      }, 
  };

    return (
      <div className="bg-white dark:bg-dark-blue">
            { 
                info 
                && dates 
                && <div>
                    <div id="chart" className="max-w-lg  px-4 py-2">
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
