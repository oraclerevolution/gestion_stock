import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Client from './Client'
import Commission from './Commission'
import User from './User'

export default class Commercial extends BaseModel {
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
  public reference: string

  @column()
  public zone_couverture: string

  @column()
  public user_id: Number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @hasMany(() => Client)
  public client: HasMany<typeof Client>

  @hasMany(() => Commission)
  public commission: HasMany<typeof Commission>

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>
}
