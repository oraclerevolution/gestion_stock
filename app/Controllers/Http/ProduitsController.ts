// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from '@ioc:Adonis/Core/Application'
import Database from '@ioc:Adonis/Lucid/Database'
import Produit from "App/Models/Produit";

export default class ProduitsController {
    async create({request, response}){
            const coverImage = request.file('image',{
                size: '3mb',
                extnames: ['jpg', 'PNG', 'jpeg', 'JPEG', 'png', 'gif'],
            })

            const imageName = `product-${Date.now()}.${coverImage.extname}`

            if (!coverImage) {
                return
            }

            if (!coverImage.isValid) {
                return coverImage.errors
            }

            const produit = await Produit.create({
                name: request.input('name'),
                code: request.input('code'),
                prix_entreprise: request.input('prix_entreprise'),
                prix_particulier: request.input('prix_particulier'),
                quantite: request.input('quantite'),
                image: imageName,
                description: request.input('description')
            })

            await coverImage.move(Application.publicPath('uploads'))
            await produit.save()
            return response.redirect('/list-product')
    }

    async index({view}){
        const produits = await Database.from('produits').select('*').where({statut: 0}).orderBy('id', 'desc')
        return view.render('pages/list-product',{produits})
    }

    async show({view, params}){
        const id_produit = params.id
        const produit = await Database.from('produits').select('*').where({id: id_produit})
        return view.render('pages/update-product',{produit})
    }

    async update({request, view}){
       const produit: any = await Produit.find(request.input('id'))
       
       const coverImage = request.file('image',{
            size: '3mb',
            extnames: ['jpg', 'PNG', 'jpeg', 'JPEG', 'png', 'gif'],
        })

        const imageName = `product-${Date.now()}.${coverImage.extname}`

        if (!coverImage) {
            return
        }

        if (!coverImage.isValid) {
            return coverImage.errors
        }

       produit.name = request.input('name')
       produit.code = request.input('code')
       produit.prix_entreprise = request.input('prix_entreprise')
       produit.prix_particulier = request.input('prix_particulier')
       produit.quantite = request.input('quantite')
       produit.description = request.input('description')
       produit.image = imageName

       await coverImage.move(Application.publicPath('/assets/uploads'))
       produit.save()

        const produits = await Database.from('produits').select('*').orderBy('id', 'desc')
        return view.render('pages/list-product',{produits})
       // response.redirect('/list-product')
    }

    async delete({response, params}){
        await Produit
            .query()
            .where('id', params.id)
            .update({statut: 1})
        
        response.redirect('/list-product')
    }
}
