// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
// import Application from '@ioc:Adonis/Core/Application'
import Database from '@ioc:Adonis/Lucid/Database'
import TypeProduit from 'App/Models/TypeProduit'

export default class TypeProduitsController {
    
    async index({view}){
        const type_produits = await Database.from('type_produits').select('*').where({statut: 0}).orderBy('id', 'desc')
        return view.render('pages/list-type',{type_produits})
    }

    async addTypeForm({view}){
        const produits = await Database.from('produits').select('*').where({statut: 0})
        return view.render('pages/add-product-type',{produits})
    }

    async show({view, params}){
        const id_type = params.id
        const typeproduit = await Database.from('type_produits').select('*').where({id: id_type})
        const produits = await Database.from('produits').select('*')
        return view.render('pages/update-product-type',{typeproduit,produits})
    }

    async update({request, response}){
        await TypeProduit
            .query()
            .where('id', request.input('id'))
            .update(
                {
                    name_type: request.input('name'),
                    quantite: request.input('quantite'),
                    prix_professionnel:request.input('prix_entreprise'),
                    prix_particulier:request.input('prix_particulier'),
                    produit_id: request.input('produit'),
                }
            )
        response.redirect('/type-produit')
    }

    async create({request, response}){
        
        const typeproduit = await TypeProduit.create({
            name_type: request.input('name'),
            quantite: request.input('quantite'),
            prix_professionnel: request.input('prix_entreprise'),
            prix_particulier: request.input('prix_particulier'),
            produit_id: request.input('produit')
        })

        await typeproduit.save()
        response.redirect('/type-produit')
    }

    async delete({response, params}){
        await TypeProduit
            .query()
            .where('id', params.id)
            .update({statut: 1})
        
        response.redirect('/type-produit')
    }
}
