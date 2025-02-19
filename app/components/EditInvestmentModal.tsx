import { useState, useEffect } from "react";
import axios from "axios";
import InvestmentForm from "./InvestmentForm";

interface EditInvestmentModalProps {
  investment: {
    id: number;
    nome: string;
    tipoInvestimento: string;
    valorInvestido: number;
    dataInvestimento: string;
  };
  onClose: () => void;
  onUpdateSuccess: () => void;
}

export default function EditInvestmentModal({ investment, onClose, onUpdateSuccess }: EditInvestmentModalProps) {
  const [formData, setFormData] = useState({
    nome: investment.nome,
    tipoInvestimento: investment.tipoInvestimento,
    valorInvestido: investment.valorInvestido.toString(),
    dataInvestimento: investment.dataInvestimento,
  });

  useEffect(() => {
    setFormData({
      nome: investment.nome,
      tipoInvestimento: investment.tipoInvestimento,
      valorInvestido: investment.valorInvestido.toString(),
      dataInvestimento: investment.dataInvestimento,
    });
  }, [investment]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/investimentos/${investment.id}`, {
        nome: formData.nome,
        tipoInvestimento: formData.tipoInvestimento,
        valorInvestido: parseFloat(formData.valorInvestido),
        dataInvestimento: formData.dataInvestimento,
      });

      onUpdateSuccess();
      onClose();
    } catch (error) {
      console.error("Erro ao atualizar investimento:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4 text-black">Editar Investimento</h2>
        <InvestmentForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} isEdit />
        <button onClick={onClose} className="w-full mt-2 bg-gray-500 text-white p-2 rounded-md">
          Cancelar
        </button>
      </div>
    </div>
  );
}
