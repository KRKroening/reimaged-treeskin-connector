<?php
require("ent_constants.php");

$stream = file_get_contents("php://input");
$file = json_decode($stream,true);

if($file["name"] != ""){
    echo insertNewEntry($file);
} else {
    errorNo();
}

function insertNewEntry($file)
{
    return insertNewEntryToMongo($file);
}

function errorNo(){
    echo "INSERT REQUIRES A NAME, GENDER, AND AGE! ";
}

?>