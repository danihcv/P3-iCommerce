# Heroku
$ pip freeze > requirements-dev.txt
**Criação de arquivos
**settings.py: ALLOWED_HOSTS = ['icommerce-api.herokuapp.com', 'localhost:8000', 'http://icommerce-cc.umbler.net/']
$ heroku apps:create icommerce-api
$ python .\manage.py runserver
$ git init
$ git add .
$ git commit -m "init"
$ remote add heroku https://git.heroku.com/icommerce-api.git (esse link foi dado pelo comando heroku apps:create ... acima)
$ heroku config:set DISABLE_COLLECTSTATIC=1
$ git push heroku master --force
