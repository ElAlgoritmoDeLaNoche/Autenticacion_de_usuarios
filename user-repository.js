import DBLocal from 'db-local'
import crypto from 'crypto'
const { Schema } = new DBLocal({ path: './db' })

const User = Schema('User', {
  _id: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

export class UserRepository {
  static create ({ username, password }) {
    // 1- Validaciones de username (opcional: usar zod)
    if (typeof username !== 'string') throw new Error('Username must be a string')
    if (username.length < 3) throw new Error('Username must be at least 3 characters long')

    // 1.1- Validaciones de password (opcional: usar zod)
    if (typeof password !== 'string') throw new Error('Password must be a string')
    if (password.length < 6) throw new Error('Password must be at least 6 characters long')

    // 2- Validar que el usuario no exista en la base de datos
    const user = User.findOne({ username })
    if (user) throw new Error('User already exists')

    const id = crypto.randomUUID()

    User.create({
      _id: id,
      username,
      password
    }).save()

    return id
  }

  // static login ({ username, password }) {}
}
