const doctorIdsByName = {
  'Dra. Marina Alves': 'marina-alves',
  'Dr. Ricardo Melo': 'ricardo-melo',
  'Dra. Camila Torres': 'camila-torres',
}

async function loadDoctors(signal) {
  await new Promise((resolve) => setTimeout(resolve, 220))
  const response = await fetch('/data/doctors.json', { signal })

  if (!response.ok) {
    throw new Error('Não foi possível carregar os profissionais simulados.')
  }

  return response.json()
}

export function getDoctors(signal) {
  return loadDoctors(signal)
}

export async function getDoctorById(id, signal) {
  const doctors = await loadDoctors(signal)
  return doctors.find((doctor) => doctor.id === id) ?? null
}

export function getDoctorIdByName(name) {
  return doctorIdsByName[name]
}
