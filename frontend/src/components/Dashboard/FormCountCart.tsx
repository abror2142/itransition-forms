import ReactApexChart from "react-apexcharts";
import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { getFormCountAnalytics } from "../../utils/api";
import { useTheme } from "../../hooks/useTheme";

interface AnalyticsData {
    count: number;
    date: string;
}

export const FormCountChart = () => {
    const [dates, setDates] = useState<string[]>([]);
    const [count, setCount] = useState<number[]>([]);
    const { authToken } = useAuth();
    const { isDarkMode } = useTheme();

    useEffect(() => {
        const fetchCountAnalytics = async () => {
            if(authToken){
                try {
                    const resp = await getFormCountAnalytics(authToken);
                    const data: AnalyticsData[] = resp.data;
                    setDates(data.map(item => item.date));
                    setCount(data.map(item => item.count));
                } catch(e) {
                    console.log(e)
                } 
            }
        } 
        fetchCountAnalytics();
    }, [])

    const state = {

        series: [{
            name: "Desktops",
            data: count
        }],
        options: {
          chart: {
            height: 350,
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
      <div>
        <div id="chart" className="dark:bg-dark-blue px-4 py-2 rounded-md">
            <ReactApexChart options={state.options} series={state.series} type="line" height={350} />
          </div>
        <div id="html-dist"></div>
      </div>
    );
  }