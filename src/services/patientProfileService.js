const conditionDetails = {
  Hipertensão: {
    factors: ['Histórico pressórico informado', 'Rotina de acompanhamento'],
    carePlan: 'Registro demonstrativo para acompanhar consultas e evolução no portal.',
  },
  Arritmia: {
    factors: ['Episódios relatados no cadastro', 'Acompanhamento de ritmo'],
    carePlan: 'Registro demonstrativo para centralizar retornos e observações da agenda.',
  },
  'Avaliação preventiva': {
    factors: ['Prevenção cardiovascular', 'Revisão periódica simulada'],
    carePlan: 'Registro demonstrativo para organizar avaliações preventivas.',
  },
  'Angina de esforço': {
    factors: ['Sintomas cadastrados para demonstração', 'Acompanhamento de rotina'],
    carePlan: 'Registro demonstrativo para acompanhar consultas programadas.',
  },
  'Insuficiência cardíaca': {
    factors: ['Acompanhamento prioritário simulado', 'Histórico de retornos'],
    carePlan: 'Registro demonstrativo para organizar a agenda de acompanhamento.',
  },
  Palpitações: {
    factors: ['Episódios relatados no cadastro', 'Avaliação de rotina simulada'],
    carePlan: 'Registro demonstrativo para organizar avaliações e retornos.',
  },
  Dislipidemia: {
    factors: ['Acompanhamento metabólico simulado', 'Revisão periódica'],
    carePlan: 'Registro demonstrativo para concentrar consultas preventivas.',
  },
  'Pós-infarto': {
    factors: ['Acompanhamento prioritário simulado', 'Revisão de retorno'],
    carePlan: 'Registro demonstrativo para organizar a continuidade do acompanhamento.',
  },
}

const bloodTypes = ['A+', 'O+', 'B+', 'AB+', 'O-', 'A-']

function emailFromName(name) {
  return `${name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/\s+/g, '.')}@paciente.demo`
}

export function buildPatientProfile(patient) {
  const detail = conditionDetails[patient.condition] ?? conditionDetails['Avaliação preventiva']
  const priority = patient.risk === 'alto'
    ? 'Perfil de atenção prioritária no cenário simulado.'
    : patient.risk === 'moderado'
      ? 'Perfil em acompanhamento regular no cenário simulado.'
      : 'Perfil estável no cenário simulado.'

  return {
    record: `PC-${String(patient.id).padStart(4, '0')}`,
    email: emailFromName(patient.name),
    bloodType: bloodTypes[(patient.id - 1) % bloodTypes.length],
    emergencyContact: `Contato de apoio ${String.fromCharCode(64 + patient.id)} · (11) 90000-${String(1000 + patient.id).slice(-4)}`,
    address: 'Endereço demonstrativo · São Paulo, SP',
    factors: detail.factors,
    carePlan: detail.carePlan,
    priority,
    observations: 'Informações fictícias, usadas apenas para representar uma ficha de acompanhamento no projeto acadêmico.',
  }
}
