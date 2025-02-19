"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import InvestmentTable from "@/app/components/InvestmentTable";
import InvestmentModal from "@/app/components/InvestimentoCadastro";
import Toast from "@/app/components/Toast";

interface Investment {
  id: number;
  nome: string;
  tipoInvestimento: string;
  valorInvestido: number;
  dataInvestimento: string;
}

export default function InvestmentList() {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

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
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-3xl shadow-lg mt-24">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-black">Lista de Investimentos</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition duration-300"
        >
          + Cadastrar Investimento
        </button>
      </div>

      {/* ✅ Tabela de investimentos */}
      <div className="bg-gray-100 p-4 rounded-xl shadow-inner overflow-x-auto">
        <InvestmentTable
          investments={investments}
          onDeleteSuccess={() => {
            fetchInvestments();
            setSuccessMessage("Investimento excluído com sucesso!");
          }}
          onUpdateSuccess={() => {
            fetchInvestments();
            setSuccessMessage("Investimento atualizado com sucesso!");
          }}
        />
      </div>

      {/* ✅ Modal de cadastro */}
      <InvestmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          fetchInvestments();
          setSuccessMessage("Investimento cadastrado com sucesso!");
        }}
      />

      {/* ✅ Exibir mensagens de sucesso */}
      {successMessage && <Toast message={successMessage} onClose={() => setSuccessMessage(null)} />}
    </div>
  );
}
