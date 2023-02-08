import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'bon_produits'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('produit_id').unsigned().references('id').inTable('type_produits')
      table.string('montant_produit').notNullable()
      table.integer('quantite').notNullable()
      table.integer('bon_id').unsigned().references('id').inTable('bons')

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
