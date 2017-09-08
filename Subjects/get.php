<?php
include('sub_constants.php');


$subName = "";

if(isset($_GET['name']))
{
    $subName = $_GET['name'];
}

if($subName != ""){
    echo GetSubjectByName($subName);
} else {
    echo GetAllSubjects();
}

function GetSubjectByName($subName)
{
    return GetSubjectByNameFromMongo($subName);
}

function GetAllSubjects()
{
    return GetAllSubjectsFromMongo();
}

?>