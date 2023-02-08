import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'clients'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name')
      table.string('prenoms')
      table.string('telephone').unique()
      table.string('commune')
      table.string('whatsapp').unique()
      table.integer('type_client') //0 entreprise //1 particulier
      table.integer('statut').defaultTo(0)
      table.integer('commercial_id').unsigned().references('id').inTable('commercials')
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
