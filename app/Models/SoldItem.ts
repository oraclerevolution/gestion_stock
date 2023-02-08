import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class SoldItem extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public produit_id: number

  @column()
  public items_numbers: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime
}
