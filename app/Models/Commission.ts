import { DateTime } from 'luxon'
import { BaseModel, column,belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Commercial from './Commercial'

export default class Commission extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public commercial_id: number

  @column()
  public montant: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @belongsTo(() => Commercial)
  public commercial: BelongsTo<typeof Commercial>
}
