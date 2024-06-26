import { useEffect, useState } from 'react';
import html2canvas from 'html2canvas';
import { parseISO, startOfDay, startOfWeek, startOfMonth, format } from 'date-fns';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import './index.css';

const ChartComponent = ({ timeframe }) => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    const exportChart = () => {
        const chartElement = document.getElementById('chart');
        if (chartElement) {
            html2canvas(chartElement).then(canvas => {
                const link = document.createElement('a');
                link.href = canvas.toDataURL('image/png');
                link.download = 'chart.png';
                link.click();
            });
        }
    };


    useEffect(() => {
        fetch('/data.json')
            .then(response => response.json())
            .then(data => setData(data));
    }, []);

    useEffect(() => {
        filterData();
    }, [data, timeframe]);

    const filterData = () => {
        const groupedData = {};

        data.forEach(item => {
            const date = parseISO(item.timestamp);
            let key;
            if (timeframe === 'daily') {
                key = format(startOfDay(date), 'yyyy-MM-dd');
            } else if (timeframe === 'weekly') {
                key = format(startOfWeek(date), 'yyyy-MM-dd');
            } else if (timeframe === 'monthly') {
                key = format(startOfMonth(date), 'yyyy-MM-dd');
            }
            if (!groupedData[key]) {
                groupedData[key] = { timestamp: key, value: 0, count: 0 };
            }
            groupedData[key].value += item.value;
            groupedData[key].count += 1;
        });
        //console.log(groupedData);
        const processedData = Object.values(groupedData).map(item => ({
            timestamp: item.timestamp,
            value: item.value / item.count
        }));

        setFilteredData(processedData);
        //console.log(filteredData);

    };


    return (
        <div className='main-container'>
            <button onClick={exportChart} className='export'>Export as PNG</button>
            <ResponsiveContainer width="90%" height={400} id="chart" className='linechart'>
                <LineChart data={filteredData} >
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="timestamp" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" className='line'/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ChartComponent;
