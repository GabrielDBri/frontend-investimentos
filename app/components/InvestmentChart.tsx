"use client";

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface Investment {
  id: number;
  nome: string;
  tipoInvestimento: string;
  valorInvestido: number;
}

interface InvestmentChartProps {
  investments: Investment[];
}

export default function InvestmentChart({ investments }: InvestmentChartProps) {
  // ✅ Agrupa os valores por tipo de investimento
  const investmentData = investments.reduce((acc, investment) => {
    const found = acc.find((item) => item.tipo === investment.tipoInvestimento);
    if (found) {
      found.valor += investment.valorInvestido;
    } else {
      acc.push({ tipo: investment.tipoInvestimento, valor: investment.valorInvestido });
    }
    return acc;
  }, [] as { tipo: string; valor: number }[]);

  // ✅ Definindo cores para os tipos de investimentos
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28BFA", "#FF4567"];

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-lg mx-auto">
      <h2 className="text-xl font-bold text-black mb-4 text-center">Distribuição dos Investimentos</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={investmentData}
            dataKey="valor"
            nameKey="tipo"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {investmentData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number | string) => {
                const numericValue = Number(value); // 🔹 Converte para número
                return `R$ ${numericValue.toFixed(2)}`;
            }}
            />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
