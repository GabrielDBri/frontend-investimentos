import { useState } from "react";

interface InvestmentFormProps {
  formData: {
    nome: string;
    tipoInvestimento: string;
    valorInvestido: string;
    dataInvestimento: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isEdit?: boolean; // Se for edição, muda o título do formulário e o botão
}

export default function InvestmentForm({ formData, handleChange, handleSubmit, isEdit = false }: InvestmentFormProps) {
  const [errors, setErrors] = useState({
    dataInvestimento: false,
  });

  const validateForm = () => {
    const today = new Date().toISOString().split("T")[0]; // Pega a data de hoje no formato YYYY-MM-DD

    const newErrors = {
      dataInvestimento: formData.dataInvestimento > today, // Verifica se a data é futura
    };

    setErrors(newErrors);
    return !Object.values(newErrors).includes(true);
  };

  const handleSubmitWithValidation = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmitWithValidation} className="space-y-4">
      <div>
        <label className="block text-black text-sm font-medium">Nome</label>
        <input
          type="text"
          name="nome"
          placeholder="Digite o nome"
          value={formData.nome}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded-md text-black"
        />
      </div>

      <div>
        <label className="block text-black text-sm font-medium">Tipo de Investimento</label>
        <select
          name="tipoInvestimento"
          value={formData.tipoInvestimento}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded-md text-black"
        >
          <option value="">Selecionar</option>
          <option value="ACAO">Ação</option>
          <option value="FUNDO">Fundo</option>
          <option value="TITULO">Título</option>
        </select>
      </div>

      <div>
        <label className="block text-black text-sm font-medium">Valor Investido</label>
        <input
          type="number"
          name="valorInvestido"
          placeholder="Digite o valor"
          value={formData.valorInvestido}
          onChange={handleChange}
          min="0.01"
          step="0.01"
          required
          className="w-full p-2 border border-gray-300 rounded-md text-black"
        />
      </div>

      <div>
        <label className="block text-black text-sm font-medium">Data do Investimento</label>
        <input
          type="date"
          name="dataInvestimento"
          value={formData.dataInvestimento}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded-md text-black"
        />
        {errors.dataInvestimento && (
          <p className="text-red-500 text-xs mt-1">A data deve ser hoje ou no passado.</p>
        )}
      </div>

      <button
        type="submit"
        className={`w-full p-2 rounded-md transition ${
          isEdit ? "bg-yellow-500 text-white hover:bg-yellow-600" : "bg-green-500 text-white hover:bg-green-600"
        }`}
      >
        {isEdit ? "Atualizar Investimento" : "Cadastrar Investimento"}
      </button>
    </form>
  );
}
