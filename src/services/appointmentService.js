export function localDate(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

export function isUpcoming(appointment, now = new Date()) {
  return new Date(`${appointment.date}T${appointment.time}:00`) >= now
}

export function appointmentError(appointment, appointments = [], now = new Date()) {
  if (!appointment || typeof appointment.patient !== 'string' || !appointment.patient.trim() ||
      typeof appointment.doctor !== 'string' || !appointment.doctor.trim()) {
    return 'Selecione um paciente e um profissional.'
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(appointment.date) || !/^([01]\d|2[0-3]):[0-5]\d$/.test(appointment.time)) {
    return 'Informe uma data e um horário válidos.'
  }
  const date = new Date(`${appointment.date}T${appointment.time}:00`)
  if (Number.isNaN(date.getTime()) || localDate(date) !== appointment.date) {
    return 'Informe uma data válida.'
  }
  if (date < now) return 'Escolha uma data e um horário futuros.'
  if (appointments.some((item) => item.date === appointment.date && item.time === appointment.time &&
    (item.doctor === appointment.doctor || item.patient === appointment.patient))) {
    return 'Já existe uma consulta para este paciente ou profissional no mesmo horário.'
  }
  return ''
}

export function validStoredAppointment(item) {
  return item && ['id', 'patient', 'doctor', 'date', 'time', 'type', 'notes'].every((key) => typeof item[key] === 'string') &&
    ['Pendente', 'Confirmada'].includes(item.status) &&
    /^\d{4}-\d{2}-\d{2}$/.test(item.date) &&
    /^([01]\d|2[0-3]):[0-5]\d$/.test(item.time) &&
    !Number.isNaN(new Date(`${item.date}T${item.time}:00`).getTime())
}
