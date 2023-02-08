// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Database from '@ioc:Adonis/Lucid/Database'
import Commercial from "App/Models/Commercial";
import User from "App/Models/User";

export default class CommercialsController {
    async create({request, response}){

        const genRandonString = (length) => {
            var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            var charLength = chars.length;
            var result = '';
            for ( var i = 0; i < length; i++ ) {
               result += chars.charAt(Math.floor(Math.random() * charLength));
            }
            return result;
         }

        const user = await User.create({
            name: request.input('name'),
            email: request.input('email'),
            password:request.input('password'),
            user_type: 2,
        })
        
        const user_added = await user.save()
        const user_id = user_added.id

        const commercial = await Commercial.create({
            name: request.input('name'),
            prenoms: request.input('prenoms'),
            telephone: request.input('telephone'),
            commune: request.input('commune'),
            whatsapp: request.input('whatsapp'),
            reference: genRandonString(7),
            zone_couverture:  request.input('zone_couverture'),
            user_id: user_id,
        })

        await commercial.save()
        return response.redirect('/list-users')
    }

    async index({view}){
        const commerciaux = await Database.from('commercials').select('*').where({statut:0}).orderBy('id', 'asc')
        return view.render('pages/list-users',{commerciaux})
    }

    async show({view, params}){
        const id_users = params.id
        const commercial = await Database.from('commercials').select('*').where({id: id_users})
        const commercial_id = commercial[0].user_id 
        const email_commercial = await Database.from('users').select('email').where({id:commercial_id})
        return view.render('pages/update-user',{commercial,email_commercial})
    }

    async update({request, response}){
        await Commercial
            .query()
            .where('id', request.input('id'))
            .update(
                {
                    name: request.input('name'),
                    prenoms: request.input('prenoms'),
                    telephone:request.input('telephone'),
                    commune:request.input('commune'),
                    whatsapp: request.input('whatsapp'),
                    zone_couverture: request.input('zone_couverture'),
                    isActive: request.input('isActive'),
                }
            )
        response.redirect('/list-users')
    }

    async delete({response, params}){
        await Commercial
            .query()
            .where('id', params.id)
            .update({statut: 1})
        
        response.redirect('/list-users')
    }
}
