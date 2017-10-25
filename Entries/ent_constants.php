<?php

include('../api_constants.php');

$dbCol = "Treeskin_db.Entries";

function insertNewEntryToMongo($data){
    // echo $data;
    $dataJSON = json_encode($data);
    // var_dump($dataJSON);
    $result = ExecuteInsert("Treeskin_db.Entries",$dataJSON);
    return json_encode($result);
}
function GetEntryByFilterFromMongo($query){
    $result = ExecuteSelectWithFilter("Treeskin_db.Entries",$query);
    return json_encode($result);
}

function GetEntryByDateFromMongo($subName){
    $result = ExecuteSelectFilter("Treeskin_db.Entries",$subName);
    return json_encode($result);
}

function GetEntryBySubjectFromMongo($subName){
    $result = ExecuteSelectFilter("Treeskin_db.Entries",$subName);
    return json_encode($result);
}

function GetEntryByTypeFromMongo($subName){
    $result = ExecuteSelectFilter("Treeskin_db.Entries",$subName);
    return json_encode($result);
}

function DeleteEntryByDateFromMongo($subName){
    $result = ExecuteDeleteFilter("Treeskin_db.Entries",$subName);
    return json_encode($result);
}

function updateEntryFromMongo($name,$date, $ins){
    $result = ExecuteUpdate("Treeskin_db.Entries",array( "subject" =>$name,"date"=>$date), $ins);
    return json_encode($result);
}
?>