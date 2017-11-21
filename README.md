#### Реализовать сервис для проверки наличия мобильного телефона в БД c использованием O-Auth2 авторизации.

##### Работающий бекенд на [https://easypay-test-backend.herokuapp.com](https://easypay-test-backend.herokuapp.com)

Для красивого json в консоли установить можно jq.
На ubuntu: ```apt-get install jq```
На archlinux: ```pacman -S jq```

##### Check phone:

```curl -s -X GET -H "Content-type: application/json" -H "Accept: application/json" https://easypay-test-backend.herokuapp.com/phones/check/911 | jq . ```

##### Login:

```curl -s -X POST -H "Content-type: application/x-www-form-urlencoded" -H "Accept: application/json" -d "username=admin&password=admin&grant_type=password&client_id=react&client_secret=null" https://easypay-test-backend.herokuapp.com/login | jq .```

##### Logout:

```curl -s -X POST -H "Authorization: Bearer <token>" -H "Content-type: application/json" -d '{ "token": "<token>"}' -H "Accept: application/json" https://easypay-test-backend.herokuapp.com/logout | jq .```

##### Phones list:

Token брать из ответа на логин.

```curl -s -X GET -H "Authorization: Bearer <token>" -H "Content-type: application/json" -H "Accept: application/json" https://easypay-test-backend.herokuapp.com/phones\?offset\=10 | jq .```

##### Add phone:

```curl -s -X POST -H "Authorization: Bearer <token>" -H "Content-type: application/json" -H "Accept: application/json" -d '{ "phone": "XXX-XXX-XXXX"}' https://easypay-test-backend.herokuapp.com/phones | jq .```

##### Delete phone:

```curl -s -X DELETE -H "Authorization: Bearer de9795dcd0adb71b82cdbe0e65dde3cd57100036" -H "Content-type: application/json" -H "Accept: application/json" https://easypay-test-backend.herokuapp.com/phones/901-344-0103 | jq .```

### Установка на свой компьютер (линукс, мак):

```nvm install 8.9.1``` или можно свежую 9.2.0

```git clone https://github.com/vatic/easypay-test-backend.git```

```cd easypay-test-backend```

Поправить юзера и пароль в development и test для своего postgresql юзера в knexfile.

Создать базу:
```CREATE DATABASE phonebook_dev owner <your-user>```

Запусить миграции:
```npm run migrate:latest```

Заполнить таблицы:
```npm run seed:run```

Стартануть сервер:
```npm start```

#### Тесты

Создать базу:
```CREATE DATABASE phonebook_test owner <your-user>```

Запусить миграции:
```NODE_ENV=test npm run migrate:latest```

Заполнить таблицы:
```NODE_ENV=test npm run seed:run```

Остановить dev сервер.

Запусть сервер для e2e тестов:
```NODE_ENV=test npm start```

Запустить тесты:
```npm test```





