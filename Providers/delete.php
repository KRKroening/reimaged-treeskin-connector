<?php
    require('prov_constants.php');

    $provName = "";

    if(isset($_GET['name']))
    {
        $provName = $_GET['name'];
    }

    function deleteProv($provName){
        echo DeleteProviderByNameFromMongo($provName);
    }

    if($provName != ""){
        deleteProv($provName);
    }

    
?>