<?php
$name =$_POST['name'];
$email =$_POST['email'];
$password =$_POST['password'];


//database connection

$conn = new mysqli('localhost','root','','prototype');
if($conn->connect_error){
    die('connection failed :'.$conn->connect_error);
}else{
    $stmt = $conn->prepare("insert into reg(name,email,password)
    values(?, ?, ?)");
    $stmt->bind_param("sss",$name,$email,$password);
    $stmt->execute();
    echo "registration successful...";
    $stmt->close();
    $conn->close();
}

?>