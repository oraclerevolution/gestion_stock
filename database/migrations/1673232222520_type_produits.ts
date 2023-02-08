import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'type_produits'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name_type')
      table.integer('quantite')
      table.string('prix_professionnel')
      table.string('prix_particulier')
      table.integer('statut').defaultTo(0)
      table.integer('com')
      table.integer('produit_id').unsigned().references('id').inTable('produits')

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
