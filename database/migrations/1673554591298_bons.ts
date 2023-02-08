import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'bons'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('numero_bon').notNullable().unique()
      table.integer('client_id').unsigned().references('id').inTable('clients')
      table.integer('commercial_id').unsigned().references('id').inTable('commercials')
      table.string('montant_total').notNullable()
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
