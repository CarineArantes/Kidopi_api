# Kidopi - API Covid

# Banco de dados MySQL

Para configurar a estrutura do banco, execute o script SQL a seguir:


```txt

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Estrutura para tabela `tblog`
--

CREATE TABLE `tblog` (
  `id` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp(),
  `country` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE `tblog`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `tblog`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=0;
COMMIT;

```

# Variáveis de Ambiente

Crie um arquivo na raiz do projeto com o nome ".ENV", e nele adicione as seguintes variaveis de ambiente, de acordo com os dados de sua instalação local:

```env

[MySQL]
DB_HOST     = 
DB_DATABASE = 
DB_USER     = 
DB_PASS     = 
DB_PORT     = 

```

Exemplo:

```env

[MySQL]
DB_HOST     = "localhost"
DB_DATABASE = "bdconsultacovid"
DB_USER     = "root"
DB_PASS     = ""
DB_PORT     = "3306"

```