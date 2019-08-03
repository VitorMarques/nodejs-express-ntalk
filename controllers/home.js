module.exports = function (app) {

    const Usuario = app.models.usuario;

    const HomeController = {

        index: function (request, response) {

            response.render('home/index')

        },

        login: function (request, response) {

            let query = {email: request.body.usuario.email};

            console.log(query);
            console.log(Usuario);
            console.log(app.models);

            Usuario.findOne(query)
                .select('nome email')
                .exec(function (erro, usuario) {

                    if(usuario) {
                        request.session.usuario = usuario;
                        response.redirect('/contatos');
                    } else {
                        Usuario.create(request.body.usuario, function (erro, usuario) {
                           if(erro) {
                               response.redirect('/');
                           } else {
                               request.session.usuario = usuario;
                               response.redirect('/contatos');
                           }
                        });
                    }

                });

        },

        logout: function (request, response) {
            request.session.destroy();
            response.redirect('/');
        }
    };

    return HomeController;

};