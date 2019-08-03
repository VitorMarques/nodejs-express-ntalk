module.exports = function (app) {

    var Usuario = app.models.usuario;

    const ContatoController = {
        index: function (request, response) {

            var _id = request.session.usuario._id;

            Usuario.findById(_id, function (erro, usuario) {
                const contatos = usuario.contatos;
                var resultado = { contatos : contatos };
                response.render('contatos/index', resultado);
            });

        },
        create: function (request, response) {

            var _id = request.session.usuario._id;

            Usuario.findById(_id, function (erro, usuario) {
                const contato = request.body.contato;
                const contatos = usuario.contatos;

                contatos.push(contato);

                usuario.save(function () {
                   response.redirect('/contatos');
                });

            });

        },
        show: function (request, response) {

            var _id = request.session.usuario._id;

            Usuario.findById(_id, function (erro, usuario) {
                const contatoID = request.params.id;
                const contato = usuario.contatos.id(contatoID);
                var resultado = { contato : contato };
                response.render('contatos/show', contato);
            });

        },
        edit: function (request, response) {

            var _id = request.session.usuario._id;

            Usuario.findById(_id, function (erro, usuario) {
                const contatoID = request.params.id;
                const contato = usuario.contatos.id(contatoID);
                var resultado = { contato : contato };
                response.render('contatos/edit', contato);
            });

        },
        update: function (request, response) {

            var _id = request.session.usuario._id;

            Usuario.findById(_id, function (erro, usuario) {
                const contatoID = request.params.id;
                const contato = usuario.contatos.id(contatoID);
                contato.nome = request.body.contato.nome;
                contato.email = request.body.contato.email;

                usuario.save(function () {
                    response.redirect('/contatos');
                })

            });

        },
        destroy: function (request, response) {

            var _id = request.session.usuario._id;

            Usuario.findById(_id, function (erro, usuario) {
                const contatoID = request.params.id;
                usuario.contatos.id(contatoID).remove();
                usuario.save(function () {
                    response.redirect('/contatos');
                })

            });
        }
    };

    return ContatoController;

};