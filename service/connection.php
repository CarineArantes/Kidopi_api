
<?php
    class Connection {

        private static $conexao;
        private $host;
        private $bdMysql;
        private $usuarioMysql;
        private $senhaMysql;
        private $portaMysql;

        public function __construct(){
            
            $host         = null;
            $bdMysql      = null;
            $usuarioMysql = null;
            $senhaMysql   = null;
            $portaMysql   = null;

            $env = parse_ini_file("../".".ENV");

            $this->host          = $env['DB_HOST'];
            $this->bdMysql       = $env['DB_DATABASE'];
            $this->usuarioMysql  = $env['DB_USER'];
            $this->senhaMysql    = $env['DB_PASS'];
            $this->portaMysql    = $env['DB_PORT'];
        }
        
        public function conecta(){
            try {
                $dsn = "mysql:host={$this->host};dbname={$this->bdMysql};port={$this->portaMysql}";
                $connection = new PDO($dsn, $this->usuarioMysql, $this->senhaMysql);
                $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                return $connection;
            } catch (PDOException $e) {
                echo "Erro ao conectar ao banco de dados: " . $e->getMessage();
            }
        }
    }
?>