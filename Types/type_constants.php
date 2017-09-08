<?php

include('../api_constants.php');

$dbCol = "Treeskin_db.Visit_Types";

function GetTypeByNameFromMongo($typeName){
    $query = ['name'=> $typeName];
    $result = ExecuteSelectFilter("Treeskin_db.Visit_Types",$typeName);
    return json_encode($result);
}

function GetAllTypesFromMongo(){
    $result = ExecuteSelectAll("Treeskin_db.Visit_Types");
    // var_dump($result);
    return json_encode($result);
}

?>