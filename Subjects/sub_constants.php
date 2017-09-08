<?php

include('../api_constants.php');

$dbCol = "Treeskin_db.Subjects";

function insertNewSubjectToMongo($data){
    // echo $data;
    $dataJSON = json_decode($data);
    // var_dump($dataJSON);
    $result = ExecuteInsert("Treeskin_db.Subjects",$data);
    return json_encode($result);
}

function GetSubjectByNameFromMongo($subName){
    $result = ExecuteSelectFilter("Treeskin_db.Subjects",$subName);
    return json_encode($result);
}

function GetAllSubjectsFromMongo(){
    $result = ExecuteSelectAll("Treeskin_db.Subjects");
    // var_dump($result);
    return json_encode($result);
}

function DeleteSubjectByNameFromMongo($subName){
    $result = ExecuteDeleteFilter("Treeskin_db.Subjects",$subName);
    return json_encode($result);
}

?>