import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import BonProduit from './BonProduit'

export default class Bon extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public numero_bon: string

  @column()
  public client_id: Number

  @column()
  public commercial_id: Number

  @column()
  public montant_total: string

  @hasMany(() => BonProduit)
  public bon_produit: HasMany<typeof BonProduit>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime
}
