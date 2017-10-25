<?php 
    require("ent_constants.php");

    $stream = file_get_contents("php://input");
    // var_dump($stream);
    $file = json_decode($stream,true);

    $name = $file["subject"];
    $date = (int)$file["date"];

    if($name != ""){
        echo $date;
        echo updateEntry($name,$date, $file);
    }

    function updateEntry($name, $date, $file){
        return updateEntryFromMongo($name,$date,json_encode($file));
    }
?>