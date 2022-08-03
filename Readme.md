# Cadastro de carro

**RF**
Deve ser possível cadastrar um novo carro.


**RN**
Não deve ser possível cadastrar um carro com uma placa ja existente.
O carro deve ser cadastrado, por padrão, com disponibilidade por padrão.
*O usuário responsável pelo cadastro deve ser um usuário administrador.


# Listagem de carros
Deve ser possível listar todos os carros disponíveis.
Deve ser possível listar todos os carros disponíveis pelo nome da categoria.
Deve ser possível listar todos os carros disponíveis pelo nome da marca.
Deve ser possível listar todos os carros disponíveis pelo nome do carro.

**RN**
O usuário não precisa estar logado no sistema.


# Cadastro de Especificação no carro

**RF**
Deve ser possivel cadastrar uma especificação para o carro


**RN**
Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
Não deve ser possível cadastrar uma especificação ja existente para o mesmo carro.
O usuário responsável pelo cadastro deve ser um usuário administrador.


# Cadastro de imagens do carro

**RF**
Deve ser possível cadastrar a imagem do carro.

**RNF**
Utilizar o multer para upload de arquivos.

**RN**
O usuario deve poder cadastrar mais de uma imagem para o mesmo carro.
O usuário responsável pelo cadastro deve ser um usuário administrador.


# Aluguel de carro

**RF**
Deve ser possível cadastar um aluguel.
**RN**
O aluguel deve ter duração mínima de uma 24 horas.
Não deve ser possível cadastar um novo aluguel caso já exista um aberto para o mesmo usuário.
Não deve ser possível cadastar um novo aluguel caso já exista um aberto para o mesmo carro.
O usuario deve estar logado na aplicação.
Ao realizar um aluguel, o status do carro deverá ser alterado para indisponível

# Devolução de carro

**RF**
Deve ser possível realizar a devolução de um carro.

**RN**
Se o carro for devolvido com menos de 24 horas, deverá ser cobrado diária completa.
Ao realizar devolução, o carro deverá ser liberado para outro aluguel.
Ao realizar a devolução, o usuário deverá ser liberado para outro aluguel.
Ao realizar a devolução, deverá ser calculado o total do aluguel.
Caso o horário de devolução seja superior ao horario previsto de entrega, deverá ser cobrado multa proporcionado aos dias de atraso.
Caso haja multa, deverá ser somado ao total do aluguel.
O Usuario deve estar logado.

# Recuperar Senha

**RF**
- Deve ser possível o usuário recuperar a sneha informando o email
- O usuário deve receber um e-mail com o passo a passo para a recuperação de senha
- O usuário deve conseguir inserir uma nova senha

**RN**
- O usuário precisa informar uma nova senha
- O link enviado para a recuperação deve expirar em 3 horas