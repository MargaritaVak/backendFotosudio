const db = require("../config/database");exports.createClient = async (request, response) => {    const { firstname, lastname, patronymic, email, password } = request.body;    const { rows } = await db.query(        "INSERT INTO client (firstname, lastname, patronymic,email, password) VALUES ($1, $2, $3, $4, $5 )",        [firstname, lastname, patronymic, email, password]    );    response.status(201).send({        message: "Client added successfully!",        body: {            client: { firstname, lastname, patronymic, email,password }        },    });};exports.getUsers = async (request, response) => {    const res = await db.query('SELECT * FROM client ORDER BY id ASC');    response.status(200).json(res.rows);};exports.getUserById = async (request, response) => {    const id = parseInt(request.params.id);    const res = await db.query('SELECT * FROM client WHERE id = $1', [id]);    response.status(200).json(res.rows);};exports.updateUser = async (request, response) => {    const id = parseInt(request.params.id);    const { firstname, lastname, patronymic, email, password } = request.body;    await db.query( 'UPDATE client SET firstname = $1, lastname = $2, patronymic = $3, email = $4, password = $5 WHERE id = $6',        [firstname, lastname, patronymic, email,password, id]);    response.status(200).send({ message: "Client Updated Successfully!" });};exports.deleteUser = async (request, response) => {    const id = parseInt(request.params.id);    await  db.query('DELETE FROM client WHERE id = $1', [id]);    response.status(200).send({ message: 'Client deleted successfully!', id });};