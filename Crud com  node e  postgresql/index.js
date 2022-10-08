// biblioteca
const { Client } = require("pg");

//pg é uma biblioteca do node para trabalhar com postgres
const client = require("pg").Client;
const cliente = new client({
  user: "postgres",
  password: "xxxxxxx",
  host: "127.0.0.1",
  port: 5433,
  database: "Cadastros",
});


/*--- functions ---*/

/*--- deleta usuarios pela senha do email ---*/
// delCadastrados("teste1"); 
// delCadastrados("teste2");
// delCadastrados("teste3");

/*--- adiciona usuarios ---*/
// insCadastrados("ususario1", "11/01/2001", "us1@gmail.com", "teste1", 26999143231);
// insCadastrados("ususario2", "12/02/2002", "us2@gmail.com", "teste2", 22999245232);
// insCadastrados("ususario3", "13/03/2003", "us3@gmail.com", "teste3", 24999343233);

/*--- mostra a tabela no terminal---*/
// getCadastrados();

async function getCadastrados() {
  try {
    console.log("running...");
    await cliente.connect();
    console.log("Conected!");
    const resultado = await cliente.query("SELECT * FROM cadastrados");
    console.table(resultado.rows);
  } catch (error) {
    console.log("O erro está aqaui: " + error);
  } finally {
    await cliente.end();
    console.log("Client desconected.");
  }
}

async function insCadastrados(
  nome,
  data_de_nascimento,
  email,
  senha,
  telefone
) {
  try {
    console.log("running...");
    await cliente.connect();
    console.log("Conected!");
    await cliente.query(
      'insert into cadastrados("nome","data_de_nascimento","email","senha","telefone") values (' +
        "'" +
        nome +
        "','" +
        data_de_nascimento +
        "','" +
        email +
        "','" +
        senha +
        "','" +
        telefone +
        "');"
    );
    console.log("usuario inserido na tabela");

    const resultado = await cliente.query("select * from cadastrados");
    console.log(resultado.rows);
  } catch (error) {
    console.log("O erro está aqui: " + error);
  } finally {
    await cliente.end();
    console.log("Client desconected.");
  }
}

async function delCadastrados(senha) {
  try {
    console.log("running...");
    await cliente.connect();
    console.log("Conected!");
    await cliente.query(
      "delete from cadastrados where senha = '" + senha + "';"
    );
    console.log("usuario deletado da tabela");

    const resultado = await cliente.query("select * from cadastrados");
    console.log(resultado.rows);
  } catch (error) {
    console.log("O erro está aqui: " + error);
  } finally {
    await cliente.end();
    console.log("Client desconected.");
  }
}
