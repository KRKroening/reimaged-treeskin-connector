<?php
require("ent_constants.php");

$stream = file_get_contents("php://input");
$file = json_decode($stream,true);
var_dump($file);

if($file["subject"] != ""){
    echo insertNewEntry($file);
} else {
    errorNo();
}

function insertNewEntry($file)
{
    $file["date"] = (int)$file["Date"];
    return insertNewEntryToMongo($file);
}

function errorNo(){
    echo "INSERT REQUIRES A NAME, GENDER, AND AGE! ";
}

?>