<?php 
    require("prov_constants.php");

    $name = "";
    $type = "";
    $pPhone = "";
    $sPhone = "";
    $comp = "";

    if(isset($_GET["name"])){
        $name = $_GET["name"];
    }
    if(isset($_GET["type"])){
        $type = $_GET["type"];
    }
    if(isset($_GET["pPhone"])){
        $pPhone = $_GET["pPhone"];
    }
    if(isset($_GET["sPhone"])){
        $sPhone = $_GET["sPhone"];
    }
    if(isset($_GET["comp"])){
        $comp = $_GET["comp"];
    }

    if($name != ""){
        echo updateProvider($name, $type, $pPhone, $sPhone, $comp);
    }

    function updateProvider($name, $type, $pPhone, $sPhone, $comp){
        $toIns = '{"name" : "'.$name.'", "type":"'.$type.'","pPhone":"'.$pPhone.'","sPhone":"'.$sPhone.'","comp":"'.$comp.'"}';
        return updateProviderByMongo($name, $toIns);
    }



?>