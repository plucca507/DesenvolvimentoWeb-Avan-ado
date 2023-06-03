const userModel = require('../models/userModel');

class UserController {
    async salvar(req, res) {
        try {
            let user = req.body;
            const max = await userModel.findOne({}).sort({ codigo: -1 });

            user.id = max == null ? 1 : max.id + 1;
            const resultado = await userModel.create(user);

            if (req.file) {
                const imagem = req.file.buffer.toString('base64');
                user.imagem = imagem
                await userModel.updateOne({ '_id': resultado._id }, { imagem }, { upsert: true }, function (error) {
                    console.error('Erro ao salvar imagem', error)
                })
            }

            res.status(201).json(resultado);
        } catch (error) {
            if (error.name === "ValidationError") {
                let errors = {};

                Object.keys(error.errors).forEach((key) => {
                    errors[key] = error.errors[key].message;
                });

                return res.status(400).send(errors);
            }
            res.status(500).send("Algo deu errado");
        }
    }

    async listar(req, res) {
        const resultado = await userModel.find({}).sort({ codigo: -1 });
        res.status(200).json(resultado);
    }

    // async buscarPorId(req, res) {
    //     const id = req.params.id;
    //     const resultado = await userModel.findOne({ 'id': id });
    //     res.status(200).json(resultado);
    // }

    async buscarPorCodigo(req, res) {
        const codigo = req.params.codigo;
        const resultado = await userModel.findOne({ codigo });
        res.status(200).json(resultado);
    }

    async buscarPorNome(req, res) {
        const nome = req.params.nome;
        const resultado = await userModel.find({ nome });
        res.status(200).json(resultado);
    }

    async buscarPorSobrenome(req, res) {
        const sobrenome = req.params.sobrenome;
        const resultado = await userModel.find({ sobrenome });
        res.status(200).json(resultado);
    }

    async buscarPorCidade(req, res) {
        const cidade = req.params.cidade;
        const resultado = await userModel.find({ cidade });
        res.status(200).json(resultado);
    }

    async buscarPorEstado(req, res) {
        const estado = req.params.estado;
        const resultado = await userModel.find({ estado });
        res.status(200).json(resultado);
    }

    async buscarPorStatus(req, res) {
        const status = req.params.status;
        const resultado = await userModel.find({ status });
        res.status(200).json(resultado);
    }

    async atualizar(req, res) {
        const codigo = req.params.codigo;
        const _id = String((await userModel.findOne({ codigo }))._id);
        await userModel.findByIdAndUpdate(String(_id), req.body);
        res.status(200).send();
    }

    async excluir(req, res) {
        const codigo = req.params.codigo;
        const _id = String((await userModel.findOne({ codigo }))._id);
        await userModel.findByIdAndRemove(String(_id));
        res.status(200).send();
    }
}

module.exports = new UserController();
