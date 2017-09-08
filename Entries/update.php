<?php 
    require("ent_constants.php");

    $stream = file_get_contents("php://input");
    $file = json_decode($stream,true);

    if($name != ""){
        echo updateEntry($name, $type, $pPhone, $sPhone, $comp);
    }

    function updateEntry($name, $type, $pPhone, $sPhone, $comp){
        return updateEntryByMongo($file);
    }
?>