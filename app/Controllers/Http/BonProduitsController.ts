// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from "@ioc:Adonis/Lucid/Database";
import BonProduit from "App/Models/BonProduit";


export default class BonProduitsController {
    async addProductBon({view}){
        return view.render('pages/bons/add-product-bon')
    }
}
