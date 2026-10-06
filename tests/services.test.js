import test from 'node:test'
import assert from 'node:assert/strict'
import { appointmentError, isUpcoming, validStoredAppointment } from '../src/services/appointmentService.js'
import { authenticate, restoreSession, clearSession, tokenExpiration } from '../src/services/authService.js'

const appointment = { id: 'test', patient: 'Ana Martins', doctor: 'Dra. Marina Alves', date: '2026-10-07', time: '09:30', type: 'Retorno', notes: '', status: 'Pendente' }
const now = new Date('2026-10-06T12:00:00')

test('agenda rejeita datas inválidas, passado e conflitos de paciente ou médico', () => {
  assert.equal(appointmentError(appointment, [], now), '')
  assert.match(appointmentError({ ...appointment, date: '2026-02-30' }, [], now), /válida/)
  assert.match(appointmentError({ ...appointment, date: '2026-10-05' }, [], now), /futuros/)
  assert.match(appointmentError({ ...appointment, time: '25:00' }, [], now), /válidos/)
  assert.match(appointmentError(appointment, [appointment], now), /mesmo horário/)
  assert.match(appointmentError({ ...appointment, patient: 'Carlos' }, [appointment], now), /mesmo horário/)
  assert.match(appointmentError({ ...appointment, doctor: 'Outro médico' }, [appointment], now), /mesmo horário/)
  assert.equal(appointmentError({ ...appointment, time: '10:30' }, [appointment], now), '')
})

test('consultas passadas não são próximas e registros corrompidos são rejeitados', () => {
  assert.equal(isUpcoming(appointment, now), true)
  assert.equal(isUpcoming({ ...appointment, date: '2026-10-05' }, now), false)
  assert.equal(validStoredAppointment(appointment), true)
  assert.equal(Boolean(validStoredAppointment(null)), false)
  assert.equal(validStoredAppointment({ ...appointment, time: '25:00' }), false)
})

test('login, restauração, dados inválidos, expiração e logout simulados', async () => {
  const values = new Map()
  globalThis.localStorage = { getItem: (key) => values.get(key) ?? null, setItem: (key, value) => values.set(key, value), removeItem: (key) => values.delete(key) }
  const session = await authenticate('admin@cardioia.com', 'cardio123')
  assert.equal(session.user.name, 'Dra. Marina Alves')
  assert.equal(session.token.split('.').length, 3)
  assert.ok(tokenExpiration(session.token) > Date.now())
  assert.deepEqual(restoreSession(), session)
  values.set('cardioia.user', '{invalid')
  assert.equal(restoreSession(), null)
  assert.equal(values.size, 0)
  await authenticate('admin@cardioia.com', 'cardio123')
  clearSession()
  assert.equal(restoreSession(), null)
  assert.equal(tokenExpiration('invalid'), 0)
  values.set('cardioia.fakeToken', `header.${btoa(JSON.stringify({ exp: 1 }))}.fake`)
  values.set('cardioia.user', JSON.stringify(session.user))
  assert.equal(restoreSession(), null)
  await assert.rejects(authenticate('invalid', '1234'), /e-mail válido/)
})
