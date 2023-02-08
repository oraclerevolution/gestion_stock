import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Paiement extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public bon_id: number

  @column()
  public montant: string

  @column()
  public montant_versee: string

  @column()
  public type_paiement: number

  @column()
  public statut: number

  @column()
  public date_encaissement: Date

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime
}
