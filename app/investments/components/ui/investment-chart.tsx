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
  const groupedInvestments = investments.reduce((acc, investment) => {
    const found = acc.find((item) => item.tipo === investment.tipoInvestimento);
    if (found) {
      found.valor += investment.valorInvestido;
    } else {
      acc.push({ tipo: investment.tipoInvestimento, valor: investment.valorInvestido });
    }
    return acc;
  }, [] as { tipo: string; valor: number }[]);

  const totalInvestido = groupedInvestments.reduce((sum, item) => sum + item.valor, 0);

  const investmentDataWithPercentage = groupedInvestments.map((item) => ({
    ...item,
    porcentagem: totalInvestido > 0 ? ((item.valor / totalInvestido) * 100).toFixed(2) : "0.00",
  }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28BFA", "#FF4567"];

  return (
    <div className="bg-white p-6 rounded-xl shadow-md mx-auto w-full max-w-3xl">
      <h2 className="text-xl font-bold text-black mb-4 text-center">Distribuição dos Investimentos</h2>
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={investmentDataWithPercentage}
            dataKey="valor"
            nameKey="tipo"
            cx="50%"
            cy="50%"
            outerRadius={110}
            fill="#8884d8"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`} 
          >
            {investmentDataWithPercentage.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(_, name, entry) => {
              const percent = entry.payload.porcentagem;
              return `${percent}%`;
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
