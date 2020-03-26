//O método .up é responsável pela criação da tabela
exports.up = function(knex) {
    return knex.schema.createTable('incidents', function (table) {
        table.increments();
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();

        table.string('ong_id').notNullable();
    
        table.foreign('ong_id').references('id').inTable('ongs');

    })
  };
  
  //O método .down é responsável pela deleção da tabela
  exports.down = function(knex) {
    knex.schema.dropTable('incidents');
  };
  

  //Executa o migrate npx knex migrate:latest
  //Deleta o migrate npx knex migrate:rollback