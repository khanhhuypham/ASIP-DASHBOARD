import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Card, Select } from "antd";
import { Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';

import { useState } from "react";
import { VBarChart } from "../../components/chart/bar/VBarChart";
import { generateRandomArray } from "../../utils/helpers";
import { PieChart } from "../../components/chart/pie/PieChart";
import { LineChart } from "../../components/chart/line/LineChart";
import { HBarChart } from "../../components/chart/bar/HBarChart";


export const Dashboard = () => {

    const [lineChartData, setLineChartData] = useState({
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Dataset 1111',
                data: [33, 53, 85, 41, 44, 65, 65],
                borderColor: '#4A9DE6',
                backgroundColor: '#4A9DE6',
                yAxisID: 'y',
                tension: 0.4,
            },
        ],
    })

    const [vBarChartData, setVBarChartData] = useState({
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
            {
                label: "asdsad",
                data: [700, 500, 900, 750, 700, 500, 200],
                backgroundColor: "#1462B0",
            },
        ],
    })


    const [HBarChartData, setHBarChartData] = useState({
        labels: ['Facebook', 'Zalo', 'Techres', 'Website'],
        datasets: [
            {
                label: 'Facebook',
                data: [700, 500, 900, 750],
                borderColor: ['#2381D4', '#00C7BE', '#FF9500', '#AF52DE'],
                backgroundColor: ['#2381D4', '#00C7BE', '#FF9500', '#AF52DE'],
                borderWidth: 1,
            },
        ],
    })


    const [pieChartData, setPieChartData] = useState({
        labels: ["Facebook", "Zalo", "Techres", "Website"],
        datasets: [
            {
                label: "Dataset 1",
                data: [30, 20, 40, 10],
                backgroundColor: ["#13C296", "#F69641", "#9B51E0", "#2381D4"],
            },
        ],
    })


    const items: { title: string, content: string }[] = [
        { title: "100.000.000.000", content: "TỔNG NHÂN VIÊN" },
        { title: "100", content: "CHIẾN DỊCH ĐANG CHẠY" },
        { title: "100", content: "KHÁCH HÀNG MỚI" }
    ]




    return (


        <div>
            <div >

                <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-2">
                        <Card>
                            <div></div>
                            <div className="grid grid-cols-2 gap-2">
                                <Card></Card>
                                <Card></Card>
                                <Card></Card>
                                <Card></Card>
                            </div>
                        </Card>

                        <Card >

                            <PieChart
                                title="Danh số theo dịch vụ" style={{ maxHeight: "250px" }}
                                data={pieChartData}
                                showFilter={true}
                                filterClousure={(value) => {
                                    setPieChartData({
                                        ...pieChartData, // Spread the existing state to keep other properties unchanged
                                        datasets: [
                                            {
                                                ...pieChartData.datasets[0], // Spread the existing dataset to keep its other properties unchanged
                                                data: generateRandomArray(4, 1, 100), // Update the data property
                                            },
                                        ],
                                    });
                                }}
                            />
                        </Card>
                    </div>

                    <Card >

                        <PieChart
                            title="Danh số theo dịch vụ" style={{ maxHeight: "250px" }}
                            data={pieChartData}
                            showFilter={true}
                            filterClousure={(value) => {
                                setPieChartData({
                                    ...pieChartData, // Spread the existing state to keep other properties unchanged
                                    datasets: [
                                        {
                                            ...pieChartData.datasets[0], // Spread the existing dataset to keep its other properties unchanged
                                            data: generateRandomArray(4, 1, 100), // Update the data property
                                        },
                                    ],
                                });
                            }}
                        />
                    </Card>
                </div>


                <div >

                    <Card>
                        <div></div>
                        <VBarChart
                            title="Lượng khách hàng mới được thêm vào"
                            style={{ maxHeight: "250px" }}
                            data={vBarChartData}
                            showFilter={true}
                            filterClousure={(value) => {
                                setVBarChartData({
                                    ...vBarChartData, // Spread the existing state to keep other properties unchanged
                                    datasets: [
                                        {
                                            ...vBarChartData.datasets[0], // Spread the existing dataset to keep its other properties unchanged
                                            data: generateRandomArray(7, 1, 100), // Update the data property
                                        },
                                    ],
                                });
                            }}

                        />
                    </Card>

                  
                </div>




                <div className="grid grid-cols-2 gap-4">

                    <Card >
                        <LineChart
                            title="Khách hàng mới chốt hợp đồng" style={{ maxHeight: "250px" }} data={lineChartData}
                            showFilter={true}
                            filterClousure={(value) => {
                                setLineChartData({
                                    ...lineChartData, // Spread the existing state to keep other properties unchanged
                                    datasets: [
                                        {
                                            ...lineChartData.datasets[0], // Spread the existing dataset to keep its other properties unchanged
                                            data: generateRandomArray(7, 1, 100), // Update the data property
                                        },
                                    ],
                                });
                            }}
                        />
                    </Card>

                    <Card>

                            <div className="flex gap-2 items-center">

                                <span>Bảng xếp hạng: </span>

                                <Select
                                    className="w-auto"
                                    placeholder="Search to Select"
                                    options={[
                                        {
                                            value: '1',
                                            label: 'Theo tuần',
                                        },
                                        {
                                            value: '2',
                                            label: 'Closed',
                                        },
                                        {
                                            value: '3',
                                            label: 'Communicated',
                                        },
                                        {
                                            value: '4',
                                            label: 'Identified',
                                        },
                                        {
                                            value: '5',
                                            label: 'Resolved',
                                        },
                                        {
                                            value: '6',
                                            label: 'Cancelled',
                                        },
                                    ]}
                                />
                            </div>

                            <Table<DataType> columns={columns} dataSource={data} scroll={{ y: 250 }} pagination={false} />
                    </Card>
                </div>


            </div>
        </div>

    );
};


interface DataType {
    key: string;
    name: string;
    age: number;
}


const columns: TableProps<DataType>['columns'] = [
    {
        title: 'Employee',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Contract Quantity',
        dataIndex: 'age',
        key: 'age',
    },

];

const data: DataType[] = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,

    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
    },
];
