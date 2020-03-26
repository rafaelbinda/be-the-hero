const connection = require('../database/connection')

module.exports = {

    /*Rota de listagem*/
    async index(request, response)  {

        /*Realizo a paginacao para que retorne 5 resultados por página*/
        const { page = 1} = request.query;

        /*Realizo a contagem de registros existentes no total*/
        const [ count ] = await connection('incidents').count();
 
        const incidents = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .limit(5)
        .offset((page-1) * 5)
        .select([
                    'incidents.*',
                    'ongs.name',   
                    'ongs.email',
                    'ongs.whatsapp',
                    'ongs.city',
                    'ongs.uf'              
                ]);

        /*Realizo o retorno do total pelo header*/    
        response.header('X-Total-Count', count['count(*)'])

        return response.json(incidents);
    } ,

    /*Rota de insert*/    
    async create(request, response)  {

        const { title, description, value} = request.body;
        
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });

        return response.json({ id });
    },

    /*Rota de deleção*/
    async delete(request, response)  {
        const { id } = request.params;

        console.log(id)

        const ong_id = request.headers.authorization;
        console.log(ong_id)
        const inicident = await connection('incidents')
        .where('id', id)
        .select('ong_id')
        .first();

        if (inicident.ong_id !== ong_id ) {
            return response.status(401).json({ error: 'Operation not permitted'});
        }
        
        await connection('incidents').where('id', id).delete();

        return response.status(204).send();
    } 

};