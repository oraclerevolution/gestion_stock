// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Client from 'App/Models/Client'

export default class ClientsController {

    async index({view}){
        const clients = await Database.from('clients').select('*').where({statut: 0}).orderBy('id', 'desc')
        return view.render('pages/list-customers',{clients})
    }

    async list_commerciaux({view}) {
        const commerciaux = await Database.from('commercials').select('*').where({statut: 0})
        return view.render('pages/add-customers',{commerciaux})
    }

    async create({request, response}){

        const client = await Client.create({
            name: request.input('name'),
            prenoms: request.input('prenoms'),
            telephone: request.input('telephone'),
            commune: request.input('commune'),
            whatsapp: request.input('whatsapp'),
            type_client: request.input('type_client'),
            commercial_id: request.input('commercial_id'),
        })

        await client.save()
        return response.redirect('/list-customers')
    }

    async show({view, params}){
        const client = await Database.from('clients').select('*').where({id: params.id, statut:0})
        const commerciaux = await Database.from('commercials').select('*').where({statut: 0})
        return view.render('pages/update-customers',{client, commerciaux})
    }

    async update({request, response}){
        await Client
            .query()
            .where('id', request.input('id'))
            .update(
                {
                    name: request.input('name'),
                    prenoms: request.input('prenoms'),
                    telephone:request.input('telephone'),
                    commune:request.input('commune'),
                    type_client:request.input('type_client'),
                    whatsapp: request.input('whatsapp'),
                    statut: request.input('statut'),
                    commercial_id: request.input('commercial_id'),
                }
            )
        response.redirect('/list-customers')
    }
}
