// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from "@ioc:Adonis/Lucid/Database";
import Bon from "App/Models/Bon";
import Commission from "App/Models/Commission";
import Paiement from "App/Models/Paiement";
import TypeProduit from "App/Models/TypeProduit";
import SoldItem from "App/Models/SoldItem";

export default class PaiementsController {

    async index({view}){
        const paiements = await Database.from('paiements').select('*').orderBy('id','desc')
        return view.render('pages/list-sale',{paiements})
    }

    async makePaiement({request,view, params}){
        const montant_total_bon = await Database.from('bons').select('montant_total').where({id: params.id})
        console.log(montant_total_bon);
        const parameters = request.params()
        return view.render('pages/add-sale',{montant_bon:montant_total_bon[0].montant_total, bon_id:parameters.id})
    }

    async create({request,response}){

        //creation du paiement
        const paiement = await Paiement.create({
            bon_id: request.input('bon_id'),
            montant: request.input('montant'),
            montant_versee: request.input('montant_versee'),
            type_paiement: request.input('type_paiement'),
            date_encaissement: request.input('date_encaissement')
        })
        await paiement.save()

        //changement du statut
        await Bon.query().where('id', request.input('bon_id')).update({statut: 1})
        // response.redirect('/list-users')

        //attribution des commissions
        if (request.input('type_paiement') == '1') {
            //4000 = 150
            //5500 = 250
            //requête pour trouver l'identifiant du commercial
            const bon = await Database.from('bons').where({id: request.input('bon_id')})
            const commercial_id = bon[0].commercial_id
            //requête pour trouver les produits du bon pour faire le calcul des

            const produits_bon = await Database.from('bon_produits').select('*').where({bon_id: request.input('bon_id')})
            let commissions_total = 0
            for (const item of produits_bon) {
              const type_produit = await Database.from('type_produits').select('*').where({id: item.produit_id})
              commissions_total = (commissions_total + type_produit[0].com) * item.quantite
              await TypeProduit
                .query()
                .where('id', item.produit_id)
                .update(
                  {
                    quantite: type_produit[0].quantite - item.quantite,
                  }
                )

              const soldItem = await SoldItem.create({
                produit_id: item.produit_id,
                items_numbers: item.quantite
              })
              await soldItem.save()
            }

            const calcul_pourcentage = commissions_total
            const nouvelle_commission = await Commission.create({
                commercial_id: commercial_id,
                montant: String(calcul_pourcentage)
            })
            await nouvelle_commission.save()
        }

        return response.redirect('/liste-paiements')
    }
}
