import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Produit from './Produit'


export default class TypeProduit extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name_type: string

  @column()
  public quantite: string

  @column()
  public prix_professionnel: string

  @column()
  public prix_particulier: string

  @column()
  public statut: number

  @column()
  public produit_id: number

  @column()
  public com: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @belongsTo(() => Produit)
  public produit: BelongsTo<typeof Produit>
}
