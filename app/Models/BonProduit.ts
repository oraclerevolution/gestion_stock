import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Bon from './Bon'

export default class BonProduit extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public produit_id: Number

  @column()
  public montant_produit: string

  @column()
  public quantite: string

  @column()
  public bon_id: Number

  @belongsTo(() => Bon)
  public bon: BelongsTo<typeof Bon>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

}
