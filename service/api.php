<?php
    require_once 'Connection.php';

    class API {

        private $connection;

        public function __construct() {
            $this->connection = new Connection();
            $this->connection->conecta();
        }

        public function getLogs() {
            $query = "SELECT DATE_FORMAT(`date`, '%d/%m/%Y %H:%i') as date, country FROM tblog ORDER BY `ID` DESC LIMIT 1";

            $result = $this->connection->conecta()->prepare($query);
            $result->execute();

             // Obtém os resultados da consulta
            $logs = $result->fetchAll(PDO::FETCH_ASSOC);
    
            // Retorna os resultados
            return $logs;
        }
        
        public function insertLogs($country) {

            $query = "INSERT INTO `tblog`(`country`) VALUES ('{$country}')";
            $result = $this->connection->conecta()->prepare($query);
            $result->execute();
        }

    }

    $api = new API();

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $country = $_POST['country'];
        $api->insertLogs($country);
    }

    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $logs = $api->getLogs();
        header('Content-Type: application/json');
        echo json_encode($logs);
    }


?>
