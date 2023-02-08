import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'commercials'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name')
      table.string('prenoms')
      table.string('telephone').unique()
      table.string('commune')
      table.string('whatsapp')
      table.string('reference')
      table.string('zone_couverture')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('isActive').defaultTo(0)
      table.integer('statut').defaultTo(0)
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
