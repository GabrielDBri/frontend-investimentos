import { useState } from "react";
import InvestmentForm from "./InvestmentForm";
import axios from "axios";

interface InvestmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function InvestmentModal({ isOpen, onClose, onSuccess }: InvestmentModalProps) {
  const [formData, setFormData] = useState({
    nome: "",
    tipoInvestimento: "",
    valorInvestido: "",
    dataInvestimento: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/investimentos", {
        nome: formData.nome,
        tipoInvestimento: formData.tipoInvestimento,
        valorInvestido: parseFloat(formData.valorInvestido),
        dataInvestimento: formData.dataInvestimento,
      });

      setFormData({ nome: "", tipoInvestimento: "", valorInvestido: "", dataInvestimento: "" });
      onSuccess(); // Atualiza a lista
      onClose(); // Fecha o modal
    } catch (error) {
      console.error("Erro ao cadastrar investimento:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold text-black mb-4">Cadastrar Investimento</h2>
        <InvestmentForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
        <button onClick={onClose} className="mt-4 w-full bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600">
          Fechar
        </button>
      </div>
    </div>
  );
}
