import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { format, subDays, subHours } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import useAxios from "../Hooks/useAxios";

export default function Dashboard() {
  const [sales, setSales] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [timeRange, setTimeRange] = useState("7"); // Default is last 7 days
  const [maxTotal, setMaxTotal] = useState(0);
  const { fetchData } = useAxios();

  // Obtener datos de la API con el custom hook useAxios
  useEffect(() => {
    const getSalesData = async () => {
      try {
        const response = await fetchData({
          url: "/invoices",
          method: "get",
        });
        setSales(response.data);
        generateChartData(response.data);
      } catch (error) {
        console.error("Error fetching sales data:", error);
      }
    };

    getSalesData();
  }, [timeRange, fetchData]);

  // Generar datos para la gráfica
  const generateChartData = (data) => {
    let chartData = [];
    let maxValue = 0;

    if (timeRange === "24h") {
      // Datos para las últimas 24 horas
      for (let i = 23; i >= 0; i--) {
        const date = subHours(new Date(), i);
        const dateFormatted = format(date, "yyyy-MM-dd HH");
        const salesForHour = data.filter(
          (sale) =>
            format(new Date(sale.created_at), "yyyy-MM-dd HH") === dateFormatted
        );
        const totalForHour = salesForHour.reduce(
          (total, sale) => total + parseFloat(sale.total),
          0
        );
        maxValue = Math.max(maxValue, totalForHour);

        chartData.push({
          date: format(date, "HH:mm"),
          total: totalForHour,
        });
      }
    } else {
      // Datos para los últimos X días
      const days = parseInt(timeRange);
      for (let i = days; i >= 0; i--) {
        const date = subDays(new Date(), i);
        const dateFormatted = format(date, "yyyy-MM-dd");
        const salesForDay = data.filter(
          (sale) =>
            format(new Date(sale.created_at), "yyyy-MM-dd") === dateFormatted
        );
        const totalForDay = salesForDay.reduce(
          (total, sale) => total + parseFloat(sale.total),
          0
        );
        maxValue = Math.max(maxValue, totalForDay);

        chartData.push({
          date: format(date, "MM/dd"),
          total: totalForDay,
        });
      }
    }

    setChartData(chartData);
    setMaxTotal(maxValue);
  };

  // Actualizar rango de tiempo
  const handleTimeRangeChange = (value) => {
    setTimeRange(value);
  };

  return (
    <div className="w-full mx-auto p-4">
      <h1 className="text-3xl text-white font-bold mb-4 border-b border-gray-300">
        Dashboard de Análisis
      </h1>

      <div className="mb-4">
        <Select onValueChange={handleTimeRangeChange} defaultValue={timeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Selecciona rango" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="24h">Últimas 24 horas</SelectItem>
            <SelectItem value="7">Última semana</SelectItem>
            <SelectItem value="30">Último mes</SelectItem>
            <SelectItem value="90">Últimos 3 meses</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Total de Ventas por período seleccionado</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[0, maxTotal + Math.ceil(maxTotal * 0.1)]} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="total" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
