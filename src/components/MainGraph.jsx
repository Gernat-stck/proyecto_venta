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
import { format, subDays } from "date-fns";

// Componentes UI
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";

// Componente principal
export default function Dashboard() {
    const [posts, setPosts] = useState([])
    const [chartData, setChartData] = useState([])
    const [timeRange, setTimeRange] = useState('7')
    const [maxPosts, setMaxPosts] = useState(0)

  // Obtener datos de la API
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        generateChartData(data);
      });
  }, []);

  // Generar datos para la gráfica
  const generateChartData = (data) => {
    const days = parseInt(timeRange);
    const chartData = [];
    let maxValue = 0;
    for (let i = days; i >= 0; i--) {
      const date = subDays(new Date(), i);
      const postsCount = Math.floor(Math.random() * 10) + 1; // Aseguramos que sea al menos 1
      maxValue = Math.max(maxValue, postsCount);
      chartData.push({
        date: format(date, "MM/dd"),
        posts: postsCount,
      });
    }
    setChartData(chartData);
    setMaxPosts(maxValue);
  };

  // Actualizar rango de tiempo
  const handleTimeRangeChange = (value) => {
    setTimeRange(value);
    generateChartData(posts);
  };

  return (
    <div className="w-full mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 border-b border-gray-300">
        Dashboard de Análisis
      </h1>

      {/* Selector de rango de tiempo */}
      <div className="mb-4">
        <Select onValueChange={handleTimeRangeChange} defaultValue={timeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Selecciona rango" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">Última semana</SelectItem>
            <SelectItem value="30">Último mes</SelectItem>
            <SelectItem value="90">Últimos 3 meses</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Gráfica */}
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Publicaciones por día</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[0, maxPosts + Math.ceil(maxPosts * 0.1)]} />{" "}
              {/* Ajustamos el dominio del eje Y */}
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="posts" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
