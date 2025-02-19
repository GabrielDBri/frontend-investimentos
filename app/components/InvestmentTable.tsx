import { useState } from "react";
import EditInvestmentModal from "./EditInvestmentModal";
import DeleteInvestmentButton from "./DeleteInvestmentButton";

interface Investment {
  id: number;
  nome: string;
  tipoInvestimento: string;
  valorInvestido: number;
  dataInvestimento: string;
}

interface InvestmentTableProps {
  investments: Investment[];
  onDeleteSuccess: () => void;
  onUpdateSuccess: () => void;
}

export default function InvestmentTable({ investments, onDeleteSuccess, onUpdateSuccess }: InvestmentTableProps) {
  const [selectedInvestment, setSelectedInvestment] = useState<Investment | null>(null);

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse bg-white shadow-md rounded-xl overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="border-b-2 border-gray-300 p-4 text-left text-black">Nome</th>
            <th className="border-b-2 border-gray-300 p-4 text-left text-black">Tipo</th>
            <th className="border-b-2 border-gray-300 p-4 text-left text-black">Valor Investido</th>
            <th className="border-b-2 border-gray-300 p-4 text-left text-black">Data do Investimento</th>
            <th className="border-b-2 border-gray-300 p-4 text-center text-black">Ações</th>
          </tr>
        </thead>
        <tbody>
          {investments.map((inv) => (
            <tr key={inv.id} className="hover:bg-gray-100 transition duration-200">
              <td className="p-4 border-b border-gray-200 text-black">{inv.nome}</td>
              <td className="p-4 border-b border-gray-200 text-black">{inv.tipoInvestimento}</td>
              <td className="p-4 border-b border-gray-200 text-green-600 font-semibold">
                R$ {inv.valorInvestido.toFixed(2)}
              </td>
              <td className="p-4 border-b border-gray-200 text-black">
                {new Date(inv.dataInvestimento).toLocaleDateString("pt-BR")}
              </td>
              <td className="p-4 border-b border-gray-200 flex gap-2 justify-center">
                <button
                  onClick={() => setSelectedInvestment(inv)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600 transition"
                >
                  Editar
                </button>
                <DeleteInvestmentButton investmentId={inv.id} onDeleteSuccess={onDeleteSuccess} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedInvestment && (
        <EditInvestmentModal
          investment={selectedInvestment}
          onClose={() => setSelectedInvestment(null)}
          onUpdateSuccess={onUpdateSuccess}
        />
      )}
    </div>
  );
}
