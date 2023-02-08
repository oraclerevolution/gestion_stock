import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Commercial from './Commercial'
import User from './User'

export default class Client extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public prenoms: string
  
  @column()
  public telephone: string
  
  @column()
  public commune: string
  
  @column()
  public whatsapp: string
  
  @column()
  public type_client: Number
  
  @column()
  public commercial_id: Number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @belongsTo(() => Commercial)
  public commercial: BelongsTo<typeof Commercial>

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>
}
