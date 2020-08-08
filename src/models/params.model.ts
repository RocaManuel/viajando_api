export const Params: { [k: string]: any } = Object.freeze({
  'GET': {
    '/api/v1/users': { email: 'string', password: 'string' },
    '/api/v1/trips': { id: 'string' }
  },
  'POST': {
    '/api/v1/trips': {
      driver_id: 'number',
      car_id: 'number',
      passenger_ammount: 'number',
      from: 'string',
      to: 'string',
      city_name: 'string',
      price: 'number',
      start_on: 'string',
      end_on: 'string',
      is_periodic: 'boolean',
      max_radio_killometer: 'number',
      periodic_days: 'number'
    },
    '/api/v1/cars': {
      driver_id: 'number',
      car_size: 'number',
      car_model: 'string',
      car_age: 'string'
    }
  }
})
