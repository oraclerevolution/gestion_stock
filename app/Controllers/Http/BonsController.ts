// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Bon from 'App/Models/Bon'
import BonProduit from 'App/Models/BonProduit'

export default class BonsController {

    async index({view}){
        const bons = await Database.from('bons').select('*').where({statut:0}).orderBy('id','desc')
        return view.render('pages/list-bons',{bons})
    }
    async chooseCommerciaux({view}) {
        const commerciaux = await Database.from('commercials').select('*').where({statut:0}).orderBy('id', 'asc')
        return view.render('pages/choose/choose-commerciaux',{commerciaux})
    }

    async chooseClient({request,view, params}) {
        const clients = await Database.from('clients').select('*').where({statut:0, commercial_id: params.id_com}).orderBy('id', 'asc')
        const parameters = request.params()
        const params_id_com = parameters.id_com
        return view.render('pages/choose/choose-client',{clients, params_id_com})
    }

    async FormulaireBon({request,view}){
        const parameters = request.params()
        return view.render('pages/choose/nouveau-bon',{parameters})
    }

    async create({request, response}) {
        const parameters = request.params()
        console.log(parameters);
        const bon = await Bon.create({
            numero_bon: request.input('numero_bon'),
            client_id: request.input('client_id'),
            commercial_id:request.input('commercial_id'),
            montant_total: request.input('montant_total'),
        })

        await bon.save()
        return response.redirect('/list-bon')
        
    }

    async addProduct({request,view}){
        const parameters = request.params()
        const types_produits = await Database.from('type_produits').select('*').where({statut:0})
        const bon = await Database.from('bons').select('*').where({id:parameters.id})
        const montant_total_bon = bon[0].montant_total
        const bonproduits = await Database.from('bon_produits').select('*').where({bon_id: parameters.id})

        let total = 0
        bonproduits.forEach(element => {
           total += parseInt(element.montant_produit) * element.quantite
        });
        return view.render('pages.add-product-bon',{types_produits, bonproduits, parameters, montant_total_bon, total})
    }

    async createBonProduct({request, response}){
        
        const id_bon = request.input('bon_id')
        const produit_bon = await BonProduit.create({
            produit_id: request.input('type_produit'),
            montant_produit: request.input('montant'),
            quantite:request.input('quantite'),
            bon_id: id_bon,
        })

        produit_bon.save()
        return response.redirect(`/${id_bon}`)
    }
}
