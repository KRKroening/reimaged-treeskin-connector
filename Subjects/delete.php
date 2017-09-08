<?php
    require('sub_constants.php');

    $subName = "";

    if(isset($_GET['name']))
    {
        $subName = $_GET['name'];
    }

    function deleteSub($subName){
        echo DeleteSubjectByNameFromMongo($subName);
    }

    if($subName != ""){
        deleteSub($subName);
    }

    
?>