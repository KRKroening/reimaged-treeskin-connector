<?php

include('../api_constants.php');

$dbCol = "Treeskin_db.Providers";

function insertNewProviderToMongo($data){
    // echo $data;
    $dataJSON = json_decode($data);
    // var_dump($dataJSON);
    $result = ExecuteInsert("Treeskin_db.Providers",$data);
    return json_encode($result);
}

function GetProviderByNameFromMongo($subName){
    $result = ExecuteSelectFilter("Treeskin_db.Providers",$subName);
    return json_encode($result);
}

function GetAllProvidersFromMongo(){
    $result = ExecuteSelectAll("Treeskin_db.Providers");
    // var_dump($result);
    return json_encode($result);
}

function DeleteProviderByNameFromMongo($subName){
    $result = ExecuteDeleteFilter("Treeskin_db.Providers",$subName);
    return json_encode($result);
}

function updateProviderByMongo($name, $ins){
    $result = ExecuteUpdate("Treeskin_db.Providers",$name, $ins);
}
?>