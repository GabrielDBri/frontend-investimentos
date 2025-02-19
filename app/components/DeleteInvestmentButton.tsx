import axios from "axios";

interface DeleteInvestmentButtonProps {
  investmentId: number;
  onDeleteSuccess: () => void;
}

export default function DeleteInvestmentButton({ investmentId, onDeleteSuccess }: DeleteInvestmentButtonProps) {
  const handleDelete = async () => {
    if (!confirm("Tem certeza que deseja excluir este investimento?")) return;

    try {
      await axios.delete(`http://localhost:8080/investimentos/${investmentId}`);
      onDeleteSuccess();
    } catch (error) {
      console.error("Erro ao excluir investimento:", error);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
    >
      Excluir
    </button>
  );
}
