export default {
  type: "object",
  properties: {
    nome: { type: 'string' },
    materia: {type: 'string'},
    curso: {type: 'string'},
  },
  required: ['nome', 'materia', 'curso']
} as const;
