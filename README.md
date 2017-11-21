#### Реализовать сервис для проверки наличия мобильного телефона в БД c использованием O-Auth2 авторизации.

##### Работающий бекенд на [https://easypay-test-backend.herokuapp.com](https://easypay-test-backend.herokuapp.com)

Для красивого json в консоли установить можно jq.
На ubuntu: ```apt-get install jq```
На archlinux: ```pacman -S jq```

##### Check phone:

```curl -s -X GET -H "Content-type: application/json" -H "Accept: application/json" https://easypay-test-backend.herokuapp.com/phones/check/911 | jq . ```

##### Login:

```curl -s -X POST -H "Content-type: application/x-www-form-urlencoded" -H "Accept: application/json" -d "username=admin&password=admin&grant_type=password&client_id=react&client_secret=null" https://easypay-test-backend.herokuapp.com/login | jq .```






