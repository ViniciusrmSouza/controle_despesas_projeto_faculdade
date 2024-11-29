const despesas = ['🍝 Alimentação', '🚗 Viagem', '👖 Necessidades', '💻 Estudos', '💊 Saúde', '🚌 Transporte', '🎮 Lazer', '🎁 Supérfluos', '🎈 Outros'];

export function AdicionarDespesas(nomeDespesa) {
    despesas.push(nomeDespesa);
}

export default function GetExpenses() {
    return despesas;
}

export const colorMap = {
    '🍝 Alimentação': '#FFD700',
    '🚗 Viagem': '#0000FF',
    '👖 Necessidades': '#008000',
    '💻 Estudos': '#FF0000',
    '💊 Saúde': '#FFC0CB',
    '🚌 Transporte': '#808080',
    '🎮 Lazer': '#00FFFF',
    '🎁 Supérfluos': '#800080',
    '🎈 Outros': '#FFFFFF',
  };