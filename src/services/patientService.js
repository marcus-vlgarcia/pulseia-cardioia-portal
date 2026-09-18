export async function getPatients(signal) {
  await new Promise((resolve) => setTimeout(resolve, 420))
  const response = await fetch('/data/patients.json', { signal })

  if (!response.ok) {
    throw new Error('Não foi possível carregar os pacientes simulados.')
  }

  return response.json()
}

export async function getPatientById(id, signal) {
  const patients = await getPatients(signal)
  return patients.find((patient) => String(patient.id) === String(id)) ?? null
}
