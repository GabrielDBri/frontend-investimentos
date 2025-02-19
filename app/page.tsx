"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import InvestmentChart from "@/app/components/InvestmentChart";

interface Investment {
  id: number;
  nome: string;
  tipoInvestimento: string;
  valorInvestido: number;
}

export default function Home() {
  const [investments, setInvestments] = useState<Investment[]>([]);

  // ✅ Busca os investimentos na API
  const fetchInvestments = async () => {
    try {
      const response = await axios.get("http://localhost:8080/investimentos");
      setInvestments(response.data);
    } catch (error) {
      console.error("Erro ao buscar investimentos:", error);
    }
  };

  useEffect(() => {
    fetchInvestments();
  }, []);

  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gray-50">
      <header className="w-full max-w-5xl text-center">
        <h1 className="text-3xl font-bold text-black">Dashboard de Investimentos</h1>
        <p className="text-gray-600 mt-2">Veja a distribuição dos seus investimentos.</p>
      </header>

      <main className="w-full max-w-5xl flex flex-col items-center gap-8">
        {/* ✅ Gráfico centralizado */}
        <InvestmentChart investments={investments} />
      </main>

    </div>
  );
}
